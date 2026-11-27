// Unit tests of the agGrid inputs rowId and columnStyles, both off by default: the methods of the YAML (scriptContent)
// transpiled and run in Node, and the template, the inputs and the style read in the YAML. Needs typescript, given by
// NODE_PATH: NODE_PATH=<node_modules> node --test tests/unit/*.test.cjs
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
const METHODS = ["getAgGridRowIdFunction", "getAgGridRowId", "readAgGridRowId", "indexAgGridRowIds", "getAgGridStyledColumnDefs", "getAgGridColumnStyleClasses"];
const Grid = eval("(" + ts.transpileModule("class Grid {\n" + METHODS.map(method).join("\n") + "\n}",
	{ compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText.replace(/;\s*$/, "") + ")");
function grid(inputs = {}) {
	const g = new Grid();
	Object.assign(g, { agGridRowIdFunction: null, agGridRowIds: new WeakMap(), agGridRowIdNext: 0, agGridStyledColumnDefs: null,
		agGridStyledColumnDefsSource: null, agGridStyledColumnDefsSignature: "" }, inputs);
	return g;
}

test("rowId: off while it is no function when the grid is created, AG Grid then gets no getRowId", () => {
	for (const off of [null, undefined, "id", 12]) {
		const g = grid({ rowId: off });
		assert.equal(g.getAgGridRowIdFunction(), undefined, String(off));
		g.rowId = (data) => data.id;
		assert.equal(g.getAgGridRowIdFunction(), undefined, "read once: getRowId of AG Grid is an initial option");
		g.indexAgGridRowIds([{ id: 1 }]);
	}
});

test("rowId: the identity of each row of a list, one of its own for a row without identity or with one already taken", () => {
	const g = grid({ rowId: (data) => (data.id && typeof data.id == "object" ? data.id.value : data.id) });
	const getRowId = g.getAgGridRowIdFunction();
	assert.equal(typeof getRowId, "function");
	assert.equal(g.getAgGridRowIdFunction(), getRowId, "the same function at each change detection");
	const a = { id: { value: 24 } }, b = { id: "x7" }, none = { name: "local" }, twin = { id: 24 }, bad = { id: { value: {} } };
	g.indexAgGridRowIds([a, b, none, twin, bad]);
	assert.equal(getRowId({ data: a }), "id:24");
	assert.equal(getRowId({ data: b }), "id:x7");
	assert.match(getRowId({ data: none }), /^row:\d+$/);
	assert.match(getRowId({ data: twin }), /^row:\d+$/, "a second row with the identity 24 gets one of its own");
	assert.match(getRowId({ data: bad }), /^row:\d+$/);
	assert.equal(new Set([a, b, none, twin, bad].map((data) => getRowId({ data }))).size, 5);
	// the next list: a new object of the same row keeps the identity, the row is updated in place
	const again = { id: { value: 24 } };
	g.indexAgGridRowIds([again, b]);
	assert.equal(getRowId({ data: again }), "id:24");
	// a row AG Grid reads without its list indexed (a transaction), a function that throws
	assert.equal(getRowId({ data: { id: 99 } }), "id:99");
	g.rowId = () => { throw new Error("no id"); };
	assert.match(getRowId({ data: { id: 5 } }), /^row:\d+$/);
});

test("rowId: indexed when a new list arrives, given to ag-grid-angular before its rows", () => {
	const changes = code.substring(code.indexOf("/*Begin_c8o_CompChanges*/"), code.indexOf("/*End_c8o_CompChanges*/"));
	assert.match(changes, /if \(changes\?\.rowData != null\) \{\n\s+this\.indexAgGridRowIds\(this\.rowData\);/);
	assert.match(YAML, /attrName: '\[getRowId\]'\n(?:.*\n){3}.*MobileSmartSourceType: script:this\.getAgGridRowIdFunction\(\)\n(?:.*\n)\s+↓Attr4 \[ngx\.components\.UIAttribute-1710934919004\]: \n\s+attrName: '\[rowData\]'/);
});

test("columnStyles: off while null, the classes of the look of a column on its cells and its header", () => {
	const columns = [{ field: "Name" }, { field: "Rate", cellClass: "mine", headerClass: ["head"] }, { headerName: "Group", children: [{ field: "Budget", cellClass: () => "fn" }] }];
	for (const off of [null, undefined, "x", ["a"]]) {
		assert.equal(grid({ columnStyles: off }).getAgGridStyledColumnDefs(columns), columns, String(off));
	}
	const g = grid({ columnStyles: { Rate: { align: "center", paddingLeft: 4, paddingRight: "24px" }, Budget: { align: "right", paddingRight: 99 }, Name: { align: "middle", paddingLeft: -2 } } });
	const styled = g.getAgGridStyledColumnDefs(columns);
	assert.notEqual(styled, columns);
	assert.equal(styled[0], columns[0], "a column without a valid style is kept as it is");
	assert.deepEqual(styled[1].cellClass, ["mine", "aggrid-col-align-center", "aggrid-col-pl-4", "aggrid-col-pr-24"]);
	assert.deepEqual(styled[1].headerClass, ["head", "aggrid-col-align-center", "aggrid-col-pl-4", "aggrid-col-pr-24"]);
	assert.deepEqual(styled[2].children[0].cellClass({}), ["fn", "aggrid-col-align-right", "aggrid-col-pr-60"], "a padding is at most 60 pixels");
	assert.deepEqual(columns[1].cellClass, "mine", "the definitions of the application are not changed");
	assert.equal(g.getAgGridStyledColumnDefs(columns), styled, "the same copies while the columns and the styles do not change");
	g.columnStyles = { Rate: { align: "left" } };
	assert.notEqual(g.getAgGridStyledColumnDefs(columns), styled);
	assert.deepEqual(g.getAgGridColumnStyleClasses("constructor"), [], "only the own fields of the styles");
	assert.match(code, /const columnDefs = this\.getAgGridValuesFilterColumnDefs\(this\.columnDefs\);\n\s+return this\.getAgGridStyledColumnDefs\(this\.isAgGridRowCreationEnabled\(\) \? this\.getAgGridRowCreationColumnDefs\(columnDefs\) : columnDefs\);/);
});

test("columnStyles: the style aligns the cells, the block of a cell renderer and the header, pads 0 to 60 pixels", () => {
	const start = YAML.indexOf("// columnStyles: the alignment of the cells");
	const block = YAML.substring(start, YAML.indexOf("// filterOnMenuButton: a filtered column", start));
	assert.match(block, /@each \$align, \$justify in \(left: flex-start, center: center, right: flex-end\)/);
	assert.match(block, /\.ag-cell\.aggrid-col-align-#\{\$align\} \.ag-cell-value div,/, "every block of the value: a number is a flex div in a div");
	assert.match(block, /\.ag-cell\.aggrid-col-align-#\{\$align\} \.ag-cell-wrapper > \.ag-cell-value \{\n\s+flex: 1 1 auto;/);
	assert.match(block, /\.ag-header-cell\.aggrid-col-align-#\{\$align\} \.ag-header-cell-label \{\n\s+justify-content: \$justify !important;/);
	assert.match(block, /@for \$px from 0 through 60 \{/);
	assert.match(block, /padding-right: #\{\$px\}px !important;/);
});

test("the two inputs are declared off by default and documented", () => {
	assert.match(YAML, /↓rowId \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>function: null \(default\)[^\n]*\n  value: null\n/);
	assert.match(YAML, /↓columnStyles \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>object: null \(default\)[^\n]*\n  value: null\n/);
	assert.doesNotMatch(YAML, /\n\n/);
});
