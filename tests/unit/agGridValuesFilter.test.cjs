// Unit tests of the agGrid input valuesFilter (off by default) and of valuesFilterProvider, valuesFilterTexts: the methods of
// the YAML (scriptContent) transpiled and run in Node with a stub of the grid api (no DOM: the popup is checked in a browser
// with the demo page testAgGrid4), and the inputs, the imports and the style read in the YAML. Needs typescript, given by
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
const NAMES = Array.from(new Set((code.match(/\n\t([a-zA-Z]*ValuesFilter[a-zA-Z]*)\(/g) || []).map((m) => m.trim().replace("(", ""))));
NAMES.push("getAgGridObjectText", "getAgGridPagerText");
const source = ts.transpileModule("class Grid {\n" + NAMES.map(method).join("\n") + "\n}", { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;

// stubs of the classes of AG Grid the filter uses: a bean, and a condition filter keeping its model
class AgGridBeanStub {
	createBean(bean) {
		return bean;
	}
	destroyBean(bean) {
		bean.destroyed = true;
	}
	destroy() {
		this.beanDestroyed = true;
	}
}
class Condition {
	init(params) {
		this.params = params;
		this.model = null;
	}
	getGui() {
		return null;
	}
	isFilterActive() {
		return this.model != null;
	}
	getModel() {
		return this.model;
	}
	setModel(model) {
		this.model = model;
		return { then: (fn) => fn() };
	}
	doesFilterPass(params) {
		const value = this.params.getValue(params.node);
		return this.model.type == "contains" ? String(value).indexOf(this.model.filter) >= 0 : (this.model.type == "greaterThan" ? value > this.model.filter : true);
	}
	getModelAsString(model) {
		return model.type + " " + model.filter;
	}
}
class AgGridTextFilter extends Condition {}
class AgGridNumberFilter extends Condition {}
class AgGridDateFilter extends Condition {}
const Grid = eval("(" + source.replace(/;\s*$/, "") + ")");

function grid(inputs = {}) {
	const g = new Grid();
	Object.assign(g, {
		valuesFilter: true, valuesFilterProvider: null, valuesFilterTexts: null, defaultColDef: { filter: true }, localeText: "en", getLocaleText: null,
		local: { agGridLang: null }, translate: { currentLang: "en" }, logs: [], agGridValuesFilterClass: null, agGridValuesFilterColumnDefs: null,
		agGridValuesFilterColumnDefsSource: null, agGridValuesFilterColumnDefsSignature: "", agGridValuesFilterFormats: null
	}, inputs);
	g.c8o = { log: { debug: (...args) => g.logs.push(args) } };
	// no DOM here: the popup is not built
	g.buildAgGridValuesFilterGui = () => null;
	return g;
}

/** A filter of a column on rows: params as AG Grid gives them (filterParams merged), the filter changes counted. */
function filter(g, rows, field, params = {}, filterInstance = {}) {
	const nodes = rows.map((data, i) => ({ id: String(i), data: data }));
	const listeners = {};
	const api = {
		forEachLeafNode: (fn) => nodes.forEach(fn),
		addEventListener: (name, fn) => (listeners[name] = listeners[name] || []).push(fn),
		removeEventListener: (name, fn) => (listeners[name] = (listeners[name] || []).filter((other) => other !== fn)),
		isDestroyed: () => false
	};
	const changes = [];
	const getter = params.getter;
	delete params.getter;
	const f = filterInstance;
	g.initAgGridValuesFilter(f, Object.assign({
		api: api, column: { getColId: () => field }, colDef: { field: field, headerName: field },
		getValue: (node) => getter ? getter(node.data) : node.data[field],
		filterChangedCallback: (attributes) => changes.push(attributes), filterModifiedCallback: () => undefined,
		doesRowPassOtherFilter: () => true, aggridValuesFilterCondition: "auto"
	}, params));
	return { f, nodes, api, changes, listeners, pass: () => nodes.filter((node) => g.doesAgGridValuesFilterPass(f, { node: node, data: node.data })).map((node) => node.data) };
}
const labels = (f) => (f.state.items || []).map((item) => item.label);
const keys = (f) => (f.state.items || []).map((item) => item.key);
function open(g, f) {
	g.showAgGridValuesFilter(f, {});
}
function toggle(g, f, label) {
	const index = f.state.rows.findIndex((row) => (row.kind == "all" ? "(all)" : row.item.label) === label);
	assert.notEqual(index, -1, label);
	g.toggleAgGridValuesFilterRow(f, index);
}

test("the inputs are declared off by default and documented, the component imports the filters of AG Grid", () => {
	assert.match(YAML, /↓valuesFilter \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>boolean: false \(default\)[^\n]*\n  value: false\n/);
	assert.match(YAML, /↓valuesFilterProvider \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>function: null \(default\)[^\n]*\n  value: null\n/);
	assert.match(YAML, /↓valuesFilterTexts \[ngx\.components\.UICompVariable-\d+\]: \n  comment: '<p>object: null \(default\)[^\n]*\n  value: null\n/);
	assert.match(code, /\/\*Begin_c8o_CompImport\*\/\nimport \{ BeanStub as AgGridBeanStub, TextFilter as AgGridTextFilter, NumberFilter as AgGridNumberFilter, DateFilter as AgGridDateFilter \} from "ag-grid-community";\n\/\*End_c8o_CompImport\*\//);
	assert.match(code, /const columnDefs = this\.getAgGridValuesFilterColumnDefs\(this\.columnDefs\);/);
	assert.match(YAML, /\n  Filter by values \(off by default\): valuesFilter gives every column/);
	assert.doesNotMatch(YAML, /\n\n/);
});

test("the style of the popup: the theme of the grid, a fixed list, the box of the grid open while the popup is", () => {
	const start = YAML.indexOf("↓ValuesFilterStyle [ngx.components.UIStyle-");
	assert.notEqual(start, -1);
	const style = YAML.substring(start, YAML.indexOf("    ↓Grid [ngx.components.UIDynamicElement-1714061566717]: ", start));
	assert.match(style, /\.ag-root-wrapper:has\(> \.ag-popup \.aggrid-values-filter\) \{\n\s+overflow: visible !important;/);
	assert.match(style, /\.ag-popup-child:has\(\.aggrid-values-filter\) \{\n\s+max-height: none !important;/);
	assert.match(style, /\.aggrid-values-filter-list \{[^}]*height: calc\(28px \* 8\.5\);/);
	assert.match(style, /\.aggrid-values-filter-item \{[^}]*height: 28px;/);
	for (const variable of ["--ag-foreground-color", "--ag-border-color", "--ag-row-hover-color", "--ag-secondary-foreground-color", "--ag-active-color"]) {
		assert.ok(style.indexOf("var(" + variable) >= 0, variable);
	}
	assert.doesNotMatch(style, /#[0-9a-f]{6};/i, "colors of the theme only (a fallback inside var() aside)");
});

test("column definitions: off while valuesFilter is not true; on, every AG Grid filter gets the filter by values", () => {
	const columns = [
		{ field: "a" }, { field: "b", filter: "agNumberColumnFilter", filterParams: { debounceMs: 800 } }, { field: "c", filter: "agDateColumnFilter" },
		{ field: "d", filter: false }, { field: "e", filter: "agTextColumnFilter", filterParams: { valuesFilter: false } }, { field: "f", filter: class Own {} },
		{ headerName: "Group", children: [{ field: "g", filter: "agSetColumnFilter" }, { field: "h", filter: "myRegisteredFilter" }] }
	];
	for (const off of [false, "false", null, undefined]) {
		assert.equal(grid({ valuesFilter: off }).getAgGridValuesFilterColumnDefs(columns), columns, String(off));
	}
	const g = grid({ valuesFilter: "true" });
	const defs = g.getAgGridValuesFilterColumnDefs(columns);
	const FilterClass = g.getAgGridValuesFilterClass();
	assert.equal(typeof FilterClass, "function");
	assert.equal(defs[0].filter, FilterClass);
	assert.deepEqual(defs[0].filterParams, { aggridValuesFilterCondition: "auto" }, "filter true from defaultColDef: the type of its cells");
	assert.deepEqual(defs[1].filterParams, { debounceMs: 800, aggridValuesFilterCondition: "number" }, "its filterParams kept");
	assert.equal(defs[2].filterParams.aggridValuesFilterCondition, "date");
	assert.equal(defs[3], columns[3], "filter false: no filter");
	assert.equal(defs[4], columns[4], "filterParams.valuesFilter false: its filter kept");
	assert.equal(defs[5], columns[5], "a filter component of its own kept");
	assert.equal(defs[6].children[0].filterParams.aggridValuesFilterCondition, "none", "a filter of AG Grid Enterprise: the values only");
	assert.equal(defs[6].children[1], columns[6].children[1]);
	assert.equal(columns[1].filter, "agNumberColumnFilter", "the definitions of the application are not changed");
	assert.equal(g.getAgGridValuesFilterColumnDefs(columns), defs, "the same copies at each change detection");
	assert.equal(g.getAgGridValuesFilterClass(), FilterClass, "one class per grid: AG Grid keeps the filters of the columns");
	g.defaultColDef = { filter: false };
	const again = g.getAgGridValuesFilterColumnDefs(columns);
	assert.notEqual(again, defs, "a new filter in defaultColDef");
	assert.equal(again[0], columns[0], "no filter by default: the column keeps none");
	const params = (p) => ({ ...p, from: "function" });
	const fn = grid().getAgGridValuesFilterColumnDefs([{ field: "x", filterParams: params }])[0].filterParams;
	assert.deepEqual(fn({ a: 1 }), { a: 1, from: "function", aggridValuesFilterCondition: "auto" });
});

test("the filter class: an AG Grid bean whose methods are those of the grid", () => {
	const g = grid();
	const FilterClass = g.getAgGridValuesFilterClass();
	const f = new FilterClass();
	assert.ok(f instanceof AgGridBeanStub);
	f.init({ api: null, colDef: { field: "x" }, getValue: () => "v", aggridValuesFilterCondition: "text" });
	assert.ok(f.state.condition instanceof AgGridTextFilter, "the condition filter of the column, created with the beans of AG Grid");
	assert.equal(f.state.condition.params.buttons, undefined);
	assert.equal(f.isFilterActive(), false);
	assert.equal(f.getModel(), null);
	f.destroy();
	assert.equal(f.beanDestroyed, true);
	assert.equal(f.state.destroyed, true);
});

test("the condition filter and the type of the values, from the filter, filterParams or the cells", () => {
	const g = grid();
	const kind = (condition, cellDataType) => g.getAgGridValuesFilterConditionKind({ aggridValuesFilterCondition: condition, colDef: { cellDataType } });
	assert.equal(kind("number"), "number");
	assert.equal(kind("auto", "number"), "number");
	assert.equal(kind("auto", "dateString"), "date");
	assert.equal(kind("auto", "boolean"), null, "a boolean column has its values only");
	assert.equal(kind("auto", "object"), "text");
	assert.equal(kind("auto", false), "text");
	assert.equal(kind("none"), null);
	const type = (params, rows) => filter(g, rows || [], "x", params).f && g.getAgGridValuesFilterType(filter(g, rows || [], "x", params).f);
	assert.equal(type({ aggridValuesFilterCondition: "date" }), "date");
	assert.equal(type({ aggridValuesFilterCondition: "text", valuesFilterType: "number" }), "number", "valuesFilterType first");
	assert.equal(type({ colDef: { field: "x", cellDataType: "boolean" } }), "boolean");
	assert.equal(type({}, [{ x: 3 }, { x: null }, { x: 5 }]), "number", "the values of the rows");
	assert.equal(type({}, [{ x: new Date() }]), "date");
	assert.equal(type({}, [{ x: 1 }, { x: "a" }]), "text", "mixed values");
	const empty = filter(g, [], "x", {});
	assert.equal(g.getAgGridValuesFilterType(empty.f), "text");
	assert.equal(empty.f.state.type, null, "no row yet: decided with the first rows");
});

test("the values of the cells: numbers, days, booleans, texts, options, lists; blanks are null", () => {
	const g = grid();
	const key = (value, type) => g.getAgGridValuesFilterKey(value, type);
	assert.equal(key(12, "number"), 12);
	assert.equal(key(" 12.5 ", "number"), 12.5);
	assert.equal(key("n/a", "number"), "n/a");
	for (const blank of [null, undefined, "", "  ", NaN]) {
		assert.equal(key(blank, "number"), null, String(blank));
		assert.equal(key(blank, "text"), null, String(blank));
	}
	assert.equal(key(new Date(2026, 10, 27, 23, 30), "date"), "2026-11-27", "the local day");
	assert.equal(key(new Date(2026, 0, 2).getTime(), "date"), "2026-01-02");
	assert.equal(key("2026-11-27", "date"), "2026-11-27");
	assert.equal(key("2026-11-27 08:00:00", "date"), "2026-11-27");
	assert.equal(key(new Date(NaN), "date"), null);
	assert.equal(key("soon", "date"), "soon");
	assert.equal(key(true, "boolean"), true);
	assert.equal(key("FALSE", "boolean"), false);
	assert.equal(key(1, "boolean"), true);
	assert.equal(key({ value: "Open", color: "red" }, "text"), "Open");
	assert.equal(key({ label: "Paris" }, "text"), "Paris");
	assert.equal(key(42, "text"), "42");
	assert.deepEqual(g.getAgGridValuesFilterKeys(["a", "b", "a"], "text"), ["a", "b"], "each value of a list apart");
	assert.deepEqual(g.getAgGridValuesFilterKeys([], "text"), [null], "an empty list is a blank cell");
	assert.deepEqual(g.getAgGridValuesFilterKeys([{ value: 1 }, { value: 2 }], "number"), [1, 2]);
});

test("the list: distinct values sorted by type, blanks first, the text of the column", () => {
	const g = grid();
	const text = filter(g, [{ x: "Item 10" }, { x: "item 2" }, { x: "Évry" }, { x: "evian" }, { x: null }, { x: "" }, { x: "Item 10" }], "x", { aggridValuesFilterCondition: "text" });
	open(g, text.f);
	assert.deepEqual(labels(text.f), ["(Blanks)", "evian", "Évry", "item 2", "Item 10"], "natural order, accents and case ignored");
	const numbers = filter(g, [{ x: 100 }, { x: 2 }, { x: 10 }, { x: 1.5 }, { x: null }], "x", { aggridValuesFilterCondition: "number" });
	open(g, numbers.f);
	assert.deepEqual(keys(numbers.f), [null, 1.5, 2, 10, 100]);
	assert.deepEqual(labels(numbers.f), ["(Blanks)", "1.5", "2", "10", "100"]);
	g.localeText = "fr";
	g.agGridValuesFilterFormats = null;
	const days = filter(g, [{ x: "2026-11-27" }, { x: new Date(2025, 11, 31, 9) }, { x: "2026-02-03T10:00:00" }], "x", { aggridValuesFilterCondition: "date" });
	open(g, days.f);
	assert.deepEqual(keys(days.f), ["2025-12-31", "2026-02-03", "2026-11-27"]);
	assert.deepEqual(labels(days.f), ["31/12/2025", "03/02/2026", "27/11/2026"], "the language of the grid");
	const booleans = filter(g, [{ x: true }, { x: false }, { x: null }], "x", { colDef: { field: "x", cellDataType: "boolean", valueFormatter: (p) => String(p.value) } });
	g.local.agGridLang = { true: "Vrai", false: "Faux", blanks: "(Vides)" };
	open(g, booleans.f);
	assert.deepEqual(labels(booleans.f), ["(Vides)", "Faux", "Vrai"], "True and False of the locale, not the formatter of the cells");
	assert.equal(booleans.f.state.condition, null, "no condition filter for booleans");
});

test("the text of a value: filterParams.valueFormatter, else the formatter of the column, never on a filter value getter", () => {
	const g = grid();
	const seen = [];
	const own = filter(g, [{ x: 1, label: "one" }, { x: 2, label: "two" }], "x", {
		aggridValuesFilterCondition: "number", valueFormatter: (p) => {
			seen.push(p.data);
			return p.data.label;
		}
	});
	open(g, own.f);
	assert.deepEqual(labels(own.f), ["one", "two"]);
	assert.deepEqual(seen, [{ x: 1, label: "one" }, { x: 2, label: "two" }], "the first row of each value");
	const column = filter(g, [{ x: 1200 }], "x", { aggridValuesFilterCondition: "number", colDef: { field: "x", valueFormatter: (p) => p.value + " €" } });
	open(g, column.f);
	assert.deepEqual(labels(column.f), ["1200 €"], "the text of the cells");
	const getter = filter(g, [{ x: { value: 5 } }], "x", { aggridValuesFilterCondition: "number", getter: (d) => d.x.value, colDef: { field: "x", filterValueGetter: () => 0, valueFormatter: (p) => p.value.value + " pcs" } });
	open(g, getter.f);
	assert.deepEqual(labels(getter.f), ["5"], "the formatter of the cells reads the cell, not the value filtered");
	const broken = filter(g, [{ x: "a" }], "x", { valueFormatter: () => { throw new Error("no"); } });
	open(g, broken.f);
	assert.deepEqual(labels(broken.f), ["a"]);
});

test("the list follows the filters of the other columns (Excel) and the rows: new rows, edited cells", async () => {
	const g = grid();
	const rows = [{ x: "a", y: 1 }, { x: "b", y: 2 }, { x: "c", y: 3 }];
	const t = filter(g, rows, "x", { doesRowPassOtherFilter: (node) => node.data.y != 2 });
	open(g, t.f);
	assert.deepEqual(labels(t.f), ["a", "c"]);
	rows.push({ x: "d", y: 4 });
	t.nodes.push({ id: "3", data: rows[3] });
	t.f.onNewRowsLoaded ? t.f.onNewRowsLoaded() : g.markAgGridValuesFilterDirty(t.f);
	await new Promise((resolve) => setTimeout(resolve, 80));
	assert.deepEqual(labels(t.f), ["a", "c", "d"], "read again while the popup is open");
	g.hideAgGridValuesFilter(t.f);
	t.nodes[0].data = { x: "z", y: 1 };
	t.listeners.cellValueChanged.forEach((fn) => fn());
	assert.equal(t.f.state.dirty, true, "an edited cell: read again at the next opening");
	open(g, t.f);
	assert.deepEqual(labels(t.f), ["c", "d", "z"]);
	g.destroyAgGridValuesFilter(t.f);
	assert.equal(t.listeners.cellValueChanged.length, 0, "its listener removed");
});

test("filtering: the values kept, blanks, lists, per type; every value checked is no filter", () => {
	const g = grid();
	const rows = [{ x: "Paris" }, { x: "Lyon" }, { x: null }, { x: "Paris" }];
	const t = filter(g, rows, "x", { aggridValuesFilterCondition: "text" });
	open(g, t.f);
	toggle(g, t.f, "Paris");
	assert.deepEqual(t.pass(), [{ x: "Lyon" }, { x: null }]);
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f), { filterType: "values", values: [null, "Lyon"] });
	assert.equal(t.changes.length, 1, "the grid told once");
	assert.equal(g.isAgGridValuesFilterActive(t.f), true);
	toggle(g, t.f, "(Blanks)");
	assert.deepEqual(t.pass(), [{ x: "Lyon" }]);
	toggle(g, t.f, "Paris");
	toggle(g, t.f, "(Blanks)");
	assert.equal(g.getAgGridValuesFilterModel(t.f), null, "every value checked: no filter by values");
	assert.equal(g.isAgGridValuesFilterActive(t.f), false);
	toggle(g, t.f, "(all)");
	assert.deepEqual(t.pass(), [], "nothing checked: no row");
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, []);
	toggle(g, t.f, "(all)");
	assert.equal(g.getAgGridValuesFilterModel(t.f), null);
	// per type
	const number = filter(g, [{ x: 10 }, { x: "10" }, { x: 2 }], "x", { aggridValuesFilterCondition: "number" });
	g.setAgGridValuesFilterModel(number.f, { filterType: "values", values: [10] });
	assert.deepEqual(number.pass(), [{ x: 10 }, { x: "10" }], "a number written as a text is the number");
	const date = filter(g, [{ x: new Date(2026, 10, 27, 18) }, { x: "2026-11-27" }, { x: "2026-11-28" }], "x", { aggridValuesFilterCondition: "date" });
	g.setAgGridValuesFilterModel(date.f, { filterType: "values", values: ["2026-11-27"] });
	assert.equal(date.pass().length, 2, "the day of a date");
	const bool = filter(g, [{ x: true }, { x: false }, { x: null }], "x", { colDef: { field: "x", cellDataType: "boolean" } });
	g.setAgGridValuesFilterModel(bool.f, { filterType: "values", values: [false, null] });
	assert.deepEqual(bool.pass(), [{ x: false }, { x: null }]);
	const list = filter(g, [{ x: ["a", "b"] }, { x: ["c"] }, { x: [] }], "x", { aggridValuesFilterCondition: "text" });
	g.setAgGridValuesFilterModel(list.f, { filterType: "values", values: ["b", null] });
	assert.deepEqual(list.pass(), [{ x: ["a", "b"] }, { x: [] }], "a row with one value kept passes");
});

test("the model: round trip, the model of the condition filter alone, null clears", () => {
	const g = grid();
	const t = filter(g, [{ x: "abc" }, { x: "xyz" }, { x: "abd" }], "x", { aggridValuesFilterCondition: "text" }, Object.assign(new AgGridBeanStub(), {}));
	assert.ok(t.f.state.condition instanceof AgGridTextFilter);
	const model = { filterType: "values", values: ["abc", "xyz"], condition: { filterType: "text", type: "contains", filter: "ab" } };
	g.setAgGridValuesFilterModel(t.f, model);
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f), model);
	assert.deepEqual(t.pass(), [{ x: "abc" }], "the values kept AND the condition");
	assert.equal(g.getAgGridValuesFilterModelText(t.f, model), "abc, xyz; contains ab");
	g.setAgGridValuesFilterModel(t.f, { filterType: "text", type: "contains", filter: "x" });
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f), { filterType: "values", values: null, condition: { filterType: "text", type: "contains", filter: "x" } }, "the model of the filter the column had");
	assert.deepEqual(t.pass(), [{ x: "xyz" }]);
	g.setAgGridValuesFilterModel(t.f, null);
	assert.equal(g.getAgGridValuesFilterModel(t.f), null);
	assert.equal(t.pass().length, 3);
	assert.equal(JSON.stringify(g.getAgGridValuesFilterModelText(t.f, { values: ["a", "b", "c", "d", null] })), JSON.stringify("a, b, c (+2)"));
});

test("the condition: its changes reach the grid, Clear clears the values and the condition in one change", () => {
	const g = grid();
	const t = filter(g, [{ x: "a" }, { x: "b" }], "x", { aggridValuesFilterCondition: "text" }, new AgGridBeanStub());
	const condition = t.f.state.condition;
	assert.equal(condition.params.closeOnApply, false);
	condition.model = { filterType: "text", type: "contains", filter: "a" };
	condition.params.filterChangedCallback({ source: "columnFilter" });
	assert.deepEqual(t.changes, [{ source: "columnFilter" }]);
	open(g, t.f);
	toggle(g, t.f, "b");
	assert.equal(t.changes.length, 2);
	g.onAgGridValuesFilterButton(t.f, "clear", {});
	assert.equal(t.changes.length, 3, "one change for both");
	assert.equal(g.getAgGridValuesFilterModel(t.f), null);
});

test("Apply button: the values and the condition wait for it; Cancel puts back the values kept", () => {
	const g = grid();
	const t = filter(g, [{ x: "a" }, { x: "b" }], "x", { aggridValuesFilterCondition: "text", buttons: ["apply", "cancel"], closeOnApply: true }, new AgGridBeanStub());
	assert.deepEqual(t.f.state.condition.params.buttons, ["apply"], "the condition waits for Apply too");
	assert.deepEqual(g.getAgGridValuesFilterButtons(t.f.params), ["apply", "cancel"]);
	let closed = 0;
	g.showAgGridValuesFilter(t.f, { hidePopup: () => closed++ });
	toggle(g, t.f, "a");
	assert.equal(t.changes.length, 0);
	assert.equal(g.getAgGridValuesFilterModel(t.f), null);
	g.onAgGridValuesFilterButton(t.f, "apply", {});
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, ["b"]);
	assert.equal(t.changes.length, 1);
	assert.equal(closed, 1, "closeOnApply");
	g.showAgGridValuesFilter(t.f, {});
	toggle(g, t.f, "b");
	g.onAgGridValuesFilterButton(t.f, "cancel", {});
	assert.deepEqual([...t.f.state.selected], ["b"], "the values kept again");
	assert.deepEqual(grid().getAgGridValuesFilterButtons({}), ["clear"], "Clear by default");
});

test("debounceMs: the values apply after it, at once when the popup closes", async () => {
	const g = grid();
	const t = filter(g, [{ x: "a" }, { x: "b" }], "x", { debounceMs: 40 });
	open(g, t.f);
	toggle(g, t.f, "a");
	assert.equal(t.changes.length, 0);
	await new Promise((resolve) => setTimeout(resolve, 60));
	assert.equal(t.changes.length, 1);
	toggle(g, t.f, "b");
	g.hideAgGridValuesFilter(t.f);
	assert.equal(t.changes.length, 2, "applied when the popup closes");
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, []);
});

test("search: without case nor accents; (Select All) checks the values found; Enter keeps them, applies and closes", async () => {
	const g = grid();
	const t = filter(g, [{ x: "Évry" }, { x: "evian" }, { x: "Lyon" }, { x: "Paris" }], "x");
	let closed = 0;
	g.showAgGridValuesFilter(t.f, { hidePopup: () => closed++ });
	t.f.state.search = "EV";
	g.refreshAgGridValuesFilterRows(t.f);
	assert.deepEqual(t.f.state.rows.map((row) => row.kind == "all" ? "(all)" : row.item.label), ["(all)", "evian", "Évry"]);
	toggle(g, t.f, "(all)");
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, ["Lyon", "Paris"], "the values found unchecked, the others kept");
	toggle(g, t.f, "(all)");
	assert.equal(g.getAgGridValuesFilterModel(t.f), null);
	t.f.state.ui = { search: { value: "ly" } };
	g.onAgGridValuesFilterSearchKey(t.f, { key: "Enter", preventDefault() {}, stopPropagation() {} });
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, ["Lyon"]);
	assert.equal(closed, 1);
	t.f.state.search = "zzz";
	g.refreshAgGridValuesFilterRows(t.f);
	assert.deepEqual(t.f.state.rows, [], "no match: no row, not even (Select All)");
});

test("provider: values of a server with their text, the rows not filtered in the browser, a search asks again", async () => {
	const calls = [];
	const g = grid({
		valuesFilterProvider: (column, search) => {
			calls.push([column.colId, column.field, column.type, search]);
			if (column.colId == "local") {
				return null;
			}
			if (search == "fail") {
				return Promise.reject(new Error("down"));
			}
			return Promise.resolve(search == "" ? { values: [{ value: 2, label: "Closed" }, { value: 1, label: "Open" }, { value: null, label: "" }, { value: 1, label: "dup" }], complete: false } : [{ value: 3, label: "In progress" }]);
		}
	});
	const t = filter(g, [{ status: "Open" }, { status: "Closed" }], "status", { aggridValuesFilterCondition: "text" });
	open(g, t.f);
	assert.equal(t.f.state.loading, true);
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.deepEqual(calls, [["status", "status", "text", ""]]);
	assert.deepEqual(keys(t.f), [null, 2, 1], "a value given twice listed once, its key kept as given");
	assert.deepEqual(labels(t.f), ["(Blanks)", "Closed", "Open"]);
	assert.equal(t.f.state.truncated, true, "complete false: the first values only");
	toggle(g, t.f, "Closed");
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, [null, 1]);
	assert.equal(t.pass().length, 2, "the server filters the rows, the browser does not");
	t.f.state.ui = { search: { value: "prog" } };
	g.onAgGridValuesFilterSearch(t.f);
	await new Promise((resolve) => setTimeout(resolve, 350));
	assert.deepEqual(calls[1], ["status", "status", "text", "prog"], "an incomplete list: the search asks the provider");
	assert.deepEqual(labels(t.f), ["In progress"]);
	// an answer after a newer request is dropped; an error is shown
	t.f.state.search = "fail";
	g.loadAgGridValuesFilterItems(t.f);
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.equal(t.f.state.error, true);
	// a column of the rows of the grid: valuesFilterProvider false, or null from the provider
	const local = filter(g, [{ local: "x" }, { local: "y" }], "local", { valuesFilterProvider: false });
	open(g, local.f);
	assert.deepEqual(labels(local.f), ["x", "y"]);
	g.setAgGridValuesFilterModel(local.f, { filterType: "values", values: ["x"] });
	assert.deepEqual(local.pass(), [{ local: "x" }], "filtered in the browser");
	const answeredNull = filter(g, [{ local: "z" }], "local", {});
	open(g, answeredNull.f);
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.deepEqual(labels(answeredNull.f), ["z"]);
	const own = filter(grid(), [{ a: 1 }], "a", { valuesFilterProvider: () => [5, 6] });
	open(grid(), own.f);
	assert.equal(typeof grid().getAgGridValuesFilterProvider(own.f), "function", "a provider of the column");
});

test("a stale answer of the provider is dropped", async () => {
	const resolvers = [];
	const g = grid({ valuesFilterProvider: () => new Promise((resolve) => resolvers.push(resolve)) });
	const t = filter(g, [], "x", {});
	open(g, t.f);
	g.loadAgGridValuesFilterItems(t.f);
	resolvers[1](["new"]);
	await new Promise((resolve) => setTimeout(resolve, 0));
	resolvers[0](["old"]);
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.deepEqual(labels(t.f), ["new"]);
	g.destroyAgGridValuesFilter(t.f);
});

test("10,000 distinct values: listed, sorted, searched and filtered fast", () => {
	const g = grid();
	const rows = [];
	for (let i = 0; i < 10000; i++) {
		rows.push({ code: "Code " + (10000 - i), n: i });
	}
	const t = filter(g, rows, "code", { aggridValuesFilterCondition: "text" });
	let start = Date.now();
	open(g, t.f);
	const listed = Date.now() - start;
	assert.equal(t.f.state.items.length, 10000);
	assert.deepEqual(labels(t.f).slice(0, 3), ["Code 1", "Code 2", "Code 3"], "natural order");
	assert.equal(labels(t.f)[9999], "Code 10000");
	assert.equal(t.f.state.rows.length, 10001);
	assert.ok(listed < 1500, "listed in " + listed + " ms");
	start = Date.now();
	t.f.state.search = "999";
	g.refreshAgGridValuesFilterRows(t.f);
	assert.deepEqual(t.f.state.rows.slice(1).map((row) => row.item.label), ["Code 999", "Code 1999", "Code 2999", "Code 3999", "Code 4999", "Code 5999", "Code 6999", "Code 7999", "Code 8999", "Code 9990", "Code 9991", "Code 9992", "Code 9993", "Code 9994", "Code 9995", "Code 9996", "Code 9997", "Code 9998", "Code 9999"]);
	const searched = Date.now() - start;
	assert.ok(searched < 500, "searched in " + searched + " ms");
	t.f.state.search = "";
	g.refreshAgGridValuesFilterRows(t.f);
	toggle(g, t.f, "Code 5000");
	assert.equal(g.getAgGridValuesFilterModel(t.f).values.length, 9999);
	start = Date.now();
	assert.equal(t.pass().length, 9999);
	const filtered = Date.now() - start;
	assert.ok(filtered < 1000, "10,000 rows filtered in " + filtered + " ms");
});

test("refresh: new column definitions keep the filter and its model, another condition filter makes a new one", () => {
	const g = grid();
	const t = filter(g, [{ x: "a" }, { x: "b" }], "x", { aggridValuesFilterCondition: "text" });
	g.setAgGridValuesFilterModel(t.f, { filterType: "values", values: ["a"] });
	assert.equal(g.refreshAgGridValuesFilter(t.f, Object.assign({}, t.f.params, { debounceMs: 5 })), true);
	assert.deepEqual(g.getAgGridValuesFilterModel(t.f).values, ["a"]);
	assert.equal(t.f.params.debounceMs, 5);
	assert.equal(g.refreshAgGridValuesFilter(t.f, Object.assign({}, t.f.params, { aggridValuesFilterCondition: "number" })), false);
});

test("texts: valuesFilterTexts, else getLocaleText, else the locale of the grid, else English", () => {
	const g = grid();
	assert.equal(g.getAgGridValuesFilterText("selectAll", "(Select All)"), "(Select All)");
	g.local.agGridLang = { selectAll: "(Sélectionner tout)", blanks: "(Vides)" };
	assert.equal(g.getAgGridValuesFilterText("selectAll", "(Select All)"), "(Sélectionner tout)");
	g.getLocaleText = (params) => params.key == "blanks" ? "(Rien)" : null;
	assert.equal(g.getAgGridValuesFilterText("blanks", "(Blanks)"), "(Rien)");
	g.valuesFilterTexts = { selectAll: "(Tout sélectionner)", valuesTruncated: "{{count}} premières valeurs" };
	assert.equal(g.getAgGridValuesFilterText("selectAll", "(Select All)"), "(Tout sélectionner)");
	assert.equal(g.getAgGridValuesFilterText("valuesTruncated", "x", { count: 25 }), "25 premières valeurs");
	assert.equal(g.getAgGridValuesFilterText("condition", "Filter by condition"), "Filter by condition");
});

test("the popup takes the colors the grid has of its own: AG Grid gives it the class of the theme again", () => {
	const g = grid();
	const element = (vars) => ({ vars: vars, set: {}, style: { setProperty(name, value) { this.owner.set[name] = value; } } });
	const root = element({ "--ag-background-color": "#1f2937", "--ag-foreground-color": "#f3f4f6", "--ag-active-color": "#2196f3", "--ag-font-size": "14px" });
	const popup = element({ "--ag-background-color": "#fff", "--ag-foreground-color": "#181d1f", "--ag-active-color": "#2196f3", "--ag-font-size": "14px" });
	popup.style.owner = popup;
	const previous = global.getComputedStyle;
	global.getComputedStyle = (el) => ({ getPropertyValue: (name) => el.vars[name] ?? "" });
	try {
		const f = { state: { root: root, ui: { gui: { closest: (selector) => selector == ".ag-popup" ? popup : null } } } };
		g.applyAgGridValuesFilterColors(f);
		assert.deepEqual(popup.set, { "--ag-background-color": "#1f2937", "--ag-foreground-color": "#f3f4f6" }, "only the colors that differ");
		const light = element({ "--ag-background-color": "#fff" });
		light.style.owner = light;
		g.applyAgGridValuesFilterColors({ state: { root: element({ "--ag-background-color": "#fff" }), ui: { gui: { closest: () => light } } } });
		assert.deepEqual(light.set, {}, "a grid in the colors of its theme: nothing set");
		g.applyAgGridValuesFilterColors({ state: { root: null, ui: { gui: { closest: () => light } } } });
	} finally {
		global.getComputedStyle = previous;
	}
	assert.match(code, /state\.root\?\.classList\?\.add\("aggrid-values-filter-open"\);\n\s+this\.applyAgGridValuesFilterColors\(f\);/);
});
