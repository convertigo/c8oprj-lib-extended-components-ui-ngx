// Unit tests of the sequence RichTextPaletteMerge: the JavaScript of its Merge step, as the YAML holds it, run in Node
// with the variables of the sequence (html, values, removeUnknown) as the engine gives them to the step.
// node --test tests/unit/*.test.cjs
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..", "..");

/** The expression of the Merge step of the sequence, as the YAML holds it. */
function mergeExpression() {
	const lines = fs.readFileSync(path.join(ROOT, "_c8oProject", "sequences", "RichTextPaletteMerge.yaml"), "utf8").split("\n");
	let i = lines.findIndex((line) => line.startsWith("↓Merge [steps.SimpleStep-"));
	assert.ok(i >= 0, "a Merge step");
	while (lines[i] !== "  expression: |") {
		i++;
	}
	i++;
	const body = [];
	while (i < lines.length && lines[i].startsWith("    ")) {
		body.push(lines[i].substring(4));
		i++;
	}
	const text = body.join("\n");
	assert.ok(text.startsWith("'") && text.endsWith("'"), "quoted expression");
	return text.substring(1, text.length - 1).replace(/''/g, "'");
}

const EXPRESSION = mergeExpression();

/** The sequence run as the engine does: its variables in the scope of the step, its output read from the scope. */
function merge(html, values, removeUnknown) {
	const run = new Function("html", "values", "removeUnknown", EXPRESSION + "\nreturn { html: rtpMerged, variables: rtpKeys, missing: rtpMissing };");
	return run(html, values === undefined ? null : values, removeUnknown === undefined ? "false" : removeUnknown);
}

test("merge: values as text, escaped, their line breaks as <br>, an array joined by commas", () => {
	const out = merge("<p>Hello {{ customer.name }}: {{ notes }} ({{ tags }}), {{ total }}</p>",
		JSON.stringify({ "customer.name": "ACME <b>&</b> O'Neil", notes: "Line 1\nLine 2\r\nLine 3", tags: ["a", null, "b"], total: 1250.5 }));
	assert.equal(out.html, "<p>Hello ACME &lt;b&gt;&amp;&lt;/b&gt; O&#39;Neil: Line 1<br>Line 2<br>Line 3 (a, b), 1250.5</p>");
	assert.deepEqual(out.variables, ["customer.name", "notes", "tags", "total"]);
	assert.deepEqual(out.missing, []);
});

test("merge: keys as richTextPalette writes them, a placeholder in a tag or with an unsafe key unchanged", () => {
	const out = merge('<p title="{{ a }}">{{&nbsp;a }} {{a}} {{ \u00a0a\u00a0 }} {{ a<b }} {{ x"y }}</p>', JSON.stringify({ a: "1" }));
	assert.equal(out.html, '<p title="{{ a }}">1 1 1 {{ a<b }} {{ x"y }}</p>');
	assert.deepEqual(out.variables, ["a"]);
});

test("merge: a key without value kept, or removed with removeUnknown; listed once in missing", () => {
	const html = "<p>{{ a }} {{ b }} {{ b }} {{ c }}</p>";
	const values = JSON.stringify({ a: "x", c: null });
	assert.deepEqual(merge(html, values), { html: "<p>x {{ b }} {{ b }} {{ c }}</p>", variables: ["a", "b", "c"], missing: ["b", "c"] });
	assert.equal(merge(html, values, "true").html, "<p>x   </p>");
	assert.equal(merge(html, values, true).html, "<p>x   </p>");
});

test("merge: no values, empty values, no html", () => {
	assert.deepEqual(merge("<p>{{ a }}</p>"), { html: "<p>{{ a }}</p>", variables: ["a"], missing: ["a"] });
	assert.deepEqual(merge("<p>{{ a }}</p>", "  "), { html: "<p>{{ a }}</p>", variables: ["a"], missing: ["a"] });
	assert.deepEqual(merge(null, "{}"), { html: "", variables: [], missing: [] });
});

test("merge: values that are not a JSON object are refused with a clear message", () => {
	assert.throws(() => merge("<p>{{ a }}</p>", "{a: 1}"), /values must be a JSON object/);
	assert.throws(() => merge("<p>{{ a }}</p>", "[1, 2]"), /values must be a JSON object/);
	assert.throws(() => merge("<p>{{ a }}</p>", "\"text\""), /values must be a JSON object/);
});

test("merge: the same placeholder pattern and the same key rule as richTextPaletteViewer", () => {
	const viewer = fs.readFileSync(path.join(ROOT, "_c8oProject", "mobileSharedComponents", "richTextPaletteViewer.yaml"), "utf8");
	const pattern = "/\\{\\{([^{}<>]*?)\\}\\}(?![^<]*>)/g";
	assert.ok(viewer.includes("return " + pattern + ";"), "the pattern of the viewer");
	assert.ok(EXPRESSION.includes(".replace(" + pattern + ", function (all, raw) {"), "the pattern of the sequence");
	assert.ok(viewer.includes("/[{}<>\"''`\\\\&]/.test(key)"), "the key rule of the viewer");
	assert.ok(EXPRESSION.includes("/[{}<>\"'`\\\\&]/.test(key)"), "the key rule of the sequence");
});
