// Unit tests of the agGrid inputs filterModel and filterOnMenuButton, both off by default: the methods of the YAML
// (scriptContent) transpiled and run in Node with a stub of the grid api, and the template, the inputs and the style read in
// the YAML. Needs typescript, given by NODE_PATH: NODE_PATH=<node_modules> node --test tests/unit/*.test.cjs
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const YAML = fs.readFileSync(path.join(__dirname, "..", "..", "_c8oProject", "mobileSharedComponents", "agGrid.yaml"), "utf8");
const code = (() => {
	const lines = YAML.split("\n");
	let i = lines.indexOf("      →: |") + 1;
	const body = [];
	while (i < lines.length && lines[i].startsWith("        ")) {
		body.push(lines[i].substring(8));
		i++;
	}
	const text = body.join("\n");
	return text.substring(1, text.length - 1).replace(/''/g, "'");
})();

/** A method of the component, alone in a class. */
function method(name) {
	const start = code.indexOf("\t" + name + "(");
	assert.notEqual(start, -1, name);
	let index = code.indexOf("{", start) + 1;
	for (let depth = 1; depth > 0; index++) {
		if (code[index] == "{") depth++;
		else if (code[index] == "}") depth--;
	}
	return code.substring(start, index);
}
const Grid = eval("(" + ts.transpileModule("class Grid {\n" + method("applyAgGridFilterModel") + "\n" + method("isAgGridFilterOnMenuButton") + "\n}",
	{ compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText.replace(/;\s*$/, "") + ")");

function gridApi(model = {}) {
	const api = { model, sets: [], getFilterModel: () => api.model, setFilterModel: (next) => { api.sets.push(next); api.model = next; } };
	return api;
}
function grid(filterModel) {
	const g = new Grid();
	g.filterModel = filterModel;
	g.agGridDestroyed = false;
	g.logs = [];
	g.c8o = { log: { debug: (...args) => g.logs.push(args) } };
	return g;
}

test("filterModel: off while null, applied when it differs from the filters in force", () => {
	const status = { Group: { filterType: "text", type: "contains", filter: "Status" } };
	for (const off of [null, undefined, "x", 12, ["a"]]) {
		const api = gridApi(status);
		grid(off).applyAgGridFilterModel(api);
		assert.deepEqual(api.sets, [], String(off));
	}
	const api = gridApi({});
	const g = grid(status);
	g.applyAgGridFilterModel(api);
	assert.deepEqual(api.sets, [status], "a grid built again gets its filters back");
	g.applyAgGridFilterModel(api);
	assert.equal(api.sets.length, 1, "the model in force is not set again (setFilterModel fires filterChanged)");
	g.filterModel = {};
	g.applyAgGridFilterModel(api);
	assert.deepEqual(api.sets[1], {}, "an empty object clears the filters");
	// a destroyed grid, no api, an api that throws: nothing set, nothing thrown
	g.filterModel = status;
	g.agGridDestroyed = true;
	g.applyAgGridFilterModel(api);
	assert.equal(api.sets.length, 2);
	g.agGridDestroyed = false;
	g.applyAgGridFilterModel(null);
	g.applyAgGridFilterModel({ getFilterModel: () => ({}), setFilterModel: () => { throw new Error("column not found"); } });
	assert.equal(g.logs.length, 1);
});

test("filterModel is applied at gridReady and on each change of the input after the first one", () => {
	assert.match(YAML, /page\.onAgGridRowCreationReady\(grid\);\n\s+\/\/ filterModel: the filters the columns had before the grid was built again\n\s+page\.applyAgGridFilterModel\(grid\.api\);/);
	const changes = code.substring(code.indexOf("/*Begin_c8o_CompChanges*/"), code.indexOf("/*End_c8o_CompChanges*/"));
	assert.match(changes, /if \(changes\?\.filterModel != null && changes\.filterModel\.firstChange !== true\) \{\n\s+this\.applyAgGridFilterModel\(this\.api\);/);
});

test("filterOnMenuButton: off by default, a class of the wrapper whose style keeps one icon per header", () => {
	const g = new Grid();
	for (const [value, on] of [[undefined, false], [false, false], ["false", false], [true, true], ["true", true]]) {
		g.filterOnMenuButton = value;
		assert.equal(g.isAgGridFilterOnMenuButton(), on, String(value));
	}
	assert.match(YAML, /attrName: '\[class\.aggrid-filter-on-menu\]'\n(?:.*\n){3}.*MobileSmartSourceType: script:this\.isAgGridFilterOnMenuButton\(\)/);
	const style = YAML.substring(YAML.indexOf("&.aggrid-filter-on-menu ::ng-deep {"));
	const block = style.substring(0, style.indexOf("\n              }\n"));
	assert.match(block, /\.ag-header-cell-filtered \.ag-header-label-icon\.ag-filter-icon \{\n\s+display: none !important;/);
	assert.match(block, /\.ag-header-cell-filtered \.ag-header-cell-menu-button \{[^}]*color: var\(--ag-active-color, #2196f3\);/);
	assert.match(block, /\.ag-header-cell-filtered \.ag-header-cell-menu-button::after \{[^}]*border-radius: 50%;/);
});

test("the two inputs are declared off by default and documented", () => {
	assert.match(YAML, /↓filterModel \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>object: null \(default\)[^\n]*\n  value: null\n/);
	assert.match(YAML, /↓filterOnMenuButton \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>boolean: false \(default\)[^\n]*\n  value: false\n/);
	assert.doesNotMatch(YAML, /\n\n/);
});
