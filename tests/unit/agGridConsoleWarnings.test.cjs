// Unit tests of the shared component agGrid: the warnings AG Grid 31 printed in the browser console at each load.
// - "You are mixing modules (i.e. @ag-grid-community/core) and packages (ag-grid-community)": the component registered
//   CsvExportModule of @ag-grid-community/csv-export, while the ag-grid-community package registers it itself;
// - "cacheBlockSize is not supported with the 'clientSide' row model": the input was always bound;
// - "setDomLayout is deprecated" (and setDatasource, setColumnDefs): the setters of the grid API, replaced by setGridOption;
// - "Cell data type is "object" but no value formatter has been provided": the component declares the object data type,
//   whose text is the value of an option or the items of a list.
// Needs typescript (NODE_PATH=<node_modules of a built NGX application>): node --test tests/unit/*.test.cjs
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const ROOT = path.join(__dirname, "..", "..");
const read = (relative) => fs.readFileSync(path.join(ROOT, "_c8oProject", relative), "utf8");
const agGrid = read("mobileSharedComponents/agGrid.yaml");

/** The TypeScript of the scriptContent of a shared component, as the YAML holds it. */
function scriptOf(yaml) {
	const lines = yaml.split("\n");
	let i = lines.indexOf("      →: |") + 1;
	const body = [];
	while (i < lines.length && lines[i].startsWith("        ")) {
		body.push(lines[i].substring(8));
		i++;
	}
	const text = body.join("\n");
	assert.ok(text.startsWith("'") && text.endsWith("'"), "quoted script");
	return text.substring(1, text.length - 1).replace(/''/g, "'");
}

/** A class member of the script, from its first line to the line that closes it at the same indentation. */
function member(code, start) {
	const lines = code.split("\n");
	const at = lines.findIndex((line) => line.startsWith(start));
	assert.notEqual(at, -1, start);
	const end = lines.findIndex((line, i) => i > at && /^\t[}]/.test(line));
	return lines.slice(at, end + 1).join("\n");
}

test("the CSV export module is not registered a second time from @ag-grid-community/csv-export", () => {
	assert.doesNotMatch(agGrid, /registerModules\(/);
	assert.doesNotMatch(agGrid, /CsvExportModule|'@ag-grid-community\/csv-export'/);
	// the locale texts are still loaded from their package
	assert.match(agGrid, /await import\("@ag-grid-community\/locale"\)/);
});

test("cacheBlockSize goes to the infinite and server side row models only", () => {
	assert.match(agGrid, /attrName: '\[cacheBlockSize\]'\n\s+attrValue: \n\s+- xmlizable: \n\s+- ↑classname: [\w.]+\n\s+- MobileSmartSourceType: 'script:this\.rowModelType == ''infinite'' \|\| this\.rowModelType == ''serverSide'' \? this\.cacheBlockSize : null'/);
});

test("no deprecated setter of the grid API in the shared components and actions", () => {
	for (const folder of ["mobileSharedComponents", "mobileSharedActions"]) {
		for (const name of fs.readdirSync(path.join(ROOT, "_c8oProject", folder))) {
			const yaml = read(path.join(folder, name));
			assert.doesNotMatch(yaml, /api\??\.(setDomLayout|setDatasource|setColumnDefs|setQuickFilter|setRowData)\(/, name);
		}
	}
	assert.match(agGrid, /grid\.api\.setGridOption\("domLayout", autoHeight \? "autoHeight":"normal"\);/);
});

test("the object data type of the grid has a value formatter: the text of an option, of a list, else the JSON", () => {
	assert.match(agGrid, /attrName: '\[dataTypeDefinitions\]'\n\s+attrValue: \n\s+- xmlizable: \n\s+- ↑classname: [\w.]+\n\s+- MobileSmartSourceType: script:this\.agGridDataTypeDefinitions/);
	const code = scriptOf(agGrid);
	const source = [
		"class Grid {",
		member(code, "\tpublic agGridDataTypeDefinitions"),
		member(code, "\tgetAgGridObjectText("),
		"}",
		"module.exports = Grid;"
	].join("\n");
	const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText;
	const mod = { exports: {} };
	new Function("module", "exports", js)(mod, mod.exports);
	const grid = new mod.exports();
	const object = grid.agGridDataTypeDefinitions.object;
	assert.equal(object.baseDataType, "object");
	assert.equal(object.extendsDataType, "object");
	assert.equal(object.valueParser({ newValue: "x" }), null);
	const text = (value) => object.valueFormatter({ value });
	assert.equal(text(null), "");
	assert.equal(text(undefined), "");
	// an option ({id, value, color}), an option in a cell ({value: {value}}), a list of links ({value: [{id, value}]})
	assert.equal(text({ id: 3, value: "Open", color: "blue" }), "Open");
	assert.equal(text({ value: { value: "Closed" } }), "Closed");
	assert.equal(text({ value: [{ id: 1, value: "Alice" }, { id: 2, value: "Bob" }, { id: 4, value: null }] }), "Alice, Bob");
	assert.equal(text({ label: "Label" }), "Label");
	assert.equal(text({ name: "file.pdf", size: 12 }), "file.pdf");
	assert.equal(text({ id: 7 }), "{\"id\":7}");
	assert.equal(text([1, "two"]), "1, two");
	assert.equal(text(0), "0");
	const cycle = { id: 1 };
	cycle.self = cycle;
	assert.equal(text(cycle), "");
});
