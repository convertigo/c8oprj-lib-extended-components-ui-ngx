// Unit tests of the shared components richTextPalette and richTextPaletteViewer: the code of their YAML (scriptContent),
// transpiled and run in Node, the Angular and HugeRTE parts replaced by stubs, the HTML parsed and sanitized by jsdom and
// DOMPurify. Needs typescript, jsdom and dompurify, given by NODE_PATH (the node_modules of a built NGX application that
// has them) or installed beside: NODE_PATH=<node_modules> node --test tests/unit/*.test.cjs
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
const createDOMPurify = require("dompurify");

const ROOT = path.join(__dirname, "..", "..");

/** The TypeScript of the scriptContent of a shared component, as the YAML holds it. */
function scriptOf(name) {
	const lines = fs.readFileSync(path.join(ROOT, "_c8oProject", "mobileSharedComponents", name + ".yaml"), "utf8").split("\n");
	let i = lines.indexOf("      →: |") + 1;
	const body = [];
	while (i < lines.length && lines[i].startsWith("        ")) {
		body.push(lines[i].substring(8));
		i++;
	}
	const text = body.join("\n");
	assert.ok(text.startsWith("'") && text.endsWith("'"), name + ": quoted script");
	return text.substring(1, text.length - 1).replace(/''/g, "'");
}

function section(code, name) {
	const match = new RegExp("/\\*Begin_c8o_" + name + "\\*/\\n([\\s\\S]*?)/\\*End_c8o_" + name + "\\*/").exec(code);
	return match ? match[1] : "";
}

class Emitter {
	constructor() {
		this.out = [];
	}
	emit(data) {
		this.out.push(data);
	}
}

/** The class of a component as the NGX builder writes it (inputs, outputs, lifecycle), its code from the YAML. */
function componentClass(name, inputs, events) {
	const code = scriptOf(name);
	const imports = section(code, "CompImport");
	assert.doesNotMatch(imports.replace(/^import .*$/gm, ""), /\S/, name + ": imports only");
	const source = [
		"class Component {",
		"  constructor(translate) {",
		"    this.translate = translate;",
		...inputs.map((input) => "    this." + input + " = undefined; this." + input + "Change = new Emitter();"),
		...events.map((event) => "    this." + event + " = new Emitter();"),
		"  }",
		"  getInstance(token) { return null; }",
		section(code, "CompDeclaration"),
		"  ngOnInit() {\n" + section(code, "CompInitialization") + "\n  }",
		"  ngOnDestroy() {\n" + section(code, "CompFinalization") + "\n  }",
		"  ngOnChanges(changes) {\n" + section(code, "CompChanges") + "\n  }",
		"  ngDoCheck() {\n" + section(code, "CompDoCheck") + "\n  }",
		"  ngAfterViewInit() {\n" + section(code, "CompAfterViewInit") + "\n  }",
		section(code, "CompFunction"),
		"}",
		"return Component;"
	].join("\n");
	const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
	const stubs = {
		Emitter: Emitter,
		NgZone: { isInAngularZone: () => true },
		rtpDefineIonIcon: () => { },
		DOMPurify: createDOMPurify,
		SecurityContext: { HTML: 1 },
		RtpDomSanitizer: { token: "DomSanitizer" }
	};
	return new Function(...Object.keys(stubs), js)(...Object.values(stubs));
}

const Editor = componentClass("richTextPalette",
	["html", "variables", "defaultVariables", "palettePosition", "paletteTitle", "paletteHint", "paletteSearch", "searchPlaceholder", "placeholder", "height", "disabled", "init", "theme", "groups", "paletteTexts"],
	["onChange", "onBlur", "onReady"]);
const Viewer = componentClass("richTextPaletteViewer", ["html", "variables", "defaultVariables", "userName", "userEmail"], ["onRender"]);

const translate = { currentLang: "fr", defaultLang: "en" };
const sanitizer = { bypassSecurityTrustHtml: (html) => ({ trusted: html }), sanitize: () => "" };

function newViewer() {
	const viewer = new Viewer(translate);
	viewer.getInstance = () => sanitizer;
	return viewer;
}

/** A HugeRTE editor reduced to what richTextPalette uses: its events, its content through BeforeSetContent and GetContent. */
class FakeEditor {
	constructor() {
		this.handlers = {};
		this.body = "";
		this.sets = 0;
		this.undoManager = { clear() { }, add() { } };
	}
	on(names, handler) {
		for (const name of names.split(" ")) {
			(this.handlers[name] = this.handlers[name] || []).push(handler);
		}
	}
	fire(name, event = {}) {
		for (const handler of this.handlers[name] || []) {
			handler(event);
		}
		return event;
	}
	setContent(html) {
		this.sets++;
		this.body = this.fire("BeforeSetContent", { content: html, format: "html" }).content;
		this.fire("SetContent", {});
	}
	getContent() {
		return this.fire("GetContent", { content: this.body, format: "html" }).content;
	}
	insertContent(html) {
		this.body += this.fire("BeforeSetContent", { content: html, format: "html", selection: true }).content;
		this.fire("SetContent", {});
	}
	focus() { }
	getDoc() {
		return this.doc || (this.doc = new JSDOM("<!doctype html><html><head></head><body></body></html>").window.document);
	}
}

test("keys: trimmed, spaces collapsed, unsafe characters refused", () => {
	const editor = new Editor(translate);
	assert.equal(editor.rtpCleanKey("  customer.name&nbsp;"), "customer.name");
	assert.equal(editor.rtpCleanKey("order   total"), "order total");
	for (const bad of ["", " ", "a{b", "a<b", "a\"b", "a'b", "a`b", "a\\b", "a&b", null, {}, () => 1, "x".repeat(201)]) {
		assert.equal(editor.rtpCleanKey(bad), null, String(bad));
	}
});

test("variables: array, object, JSON text, the defaults after them, a default redefined in place", () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "customer.name", label: "Customer name", group: "Customer", value: "ACME" }, "order.ref", { key: "api.clock.year", label: "Current year" }, { key: "bad}", label: "x" }, { key: "customer.name", label: "Duplicate" }];
	let variables = editor.rtpVariables();
	assert.deepEqual(variables.slice(0, 2).map((v) => [v.key, v.label, v.group]), [["customer.name", "Customer name", "Customer"], ["order.ref", "order.ref", ""]]);
	assert.deepEqual(variables.slice(2).map((v) => v.key), ["api.clock.today", "api.clock.now", "api.clock.time", "api.clock.year", "api.user.name", "api.user.email",
		"api.user.authenticatedUserID", "api.user.groups", "api.translate.currentLang"]);
	const year = variables.find((v) => v.key == "api.clock.year");
	assert.equal(year.label, "Current year");
	assert.equal(typeof year.value, "function", "a label alone keeps the value of the default");
	editor.variables = { "customer.name": "ACME", "order": { label: "Order", value: 3 } };
	assert.deepEqual(editor.rtpVariables().slice(0, 2).map((v) => [v.key, v.label, v.value]), [["customer.name", "customer.name", "ACME"], ["order", "Order", 3]]);
	editor.variables = "[{\"key\": \"json.key\", \"label\": \"From JSON\"}]";
	assert.equal(editor.rtpVariables()[0].label, "From JSON");
	editor.defaultVariables = false;
	assert.deepEqual(editor.rtpVariables().map((v) => v.key), ["json.key"]);
	editor.defaultVariables = ["api.user.name", "api.clock.today"];
	assert.deepEqual(editor.rtpVariables().map((v) => v.key), ["json.key", "api.clock.today", "api.user.name"]);
	editor.defaultVariables = "api.user.email, api.clock.year";
	assert.deepEqual(editor.rtpVariables().map((v) => v.key), ["json.key", "api.clock.year", "api.user.email"]);
});

test("editor: placeholders as chips and back, a placeholder in a tag or of no variable unchanged", () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "customer.name", label: "Customer <name>" }];
	editor.ngOnInit();
	editor.ngDoCheck();
	const html = "<p>Hello {{ customer.name }}, {{&nbsp;api.user.name&nbsp;}} on {{ api.clock.today }}. {{ foo.bar }} <a title=\"{{ customer.name }}\">x</a></p>";
	const chips = editor.rtpPlaceholdersToChips(html);
	assert.match(chips, /<span class="rtp-variable mceNonEditable" contenteditable="false" data-rtp-variable="customer.name" title="\{\{ customer.name \}\}">Customer &lt;name&gt;<\/span>/);
	assert.match(chips, /data-rtp-variable="api.user.name"/);
	assert.match(chips, /\{\{ foo.bar \}\}/);
	assert.match(chips, /<a title="\{\{ customer.name \}\}">x<\/a>/);
	// as HugeRTE gives it back: the contenteditable it set is removed
	const back = editor.rtpChipsToPlaceholders(chips.replace(/ contenteditable="false"/g, ""));
	assert.equal(back, "<p>Hello {{ customer.name }}, {{ api.user.name }} on {{ api.clock.today }}. {{ foo.bar }} <a title=\"{{ customer.name }}\">x</a></p>");
	assert.deepEqual(editor.rtpUsedKeys(back), ["customer.name", "api.user.name", "api.clock.today", "foo.bar"]);
	assert.equal(editor.rtpPlaceholdersToChips(chips), chips, "a chip is not converted twice");
});

test("editor: palette groups, search without case nor accents, same array while nothing changes", () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "a", label: "Année", group: "Dates" }, { key: "b", label: "Client", group: "Customer" }];
	editor.ngDoCheck();
	const groups = editor.rtpGetGroups();
	assert.deepEqual(groups.map((g) => g.title), ["Dates", "Customer", "Date and time", "Signed-in user", "Application"]);
	assert.equal(editor.rtpGetGroups(), groups);
	editor.rtpSearch = "ANNEE";
	assert.deepEqual(editor.rtpGetGroups().map((g) => g.items.map((i) => i.key)), [["a"]]);
	editor.rtpSearch = "signed";
	assert.equal(editor.rtpGetGroups()[0].items.length, 4);
	assert.equal(editor.rtpShowSearch(), true, "auto: from 9 variables on");
	editor.paletteSearch = false;
	assert.equal(editor.rtpShowSearch(), false);
	assert.equal(editor.rtpPosition(), "end", "after the editor, as in C8Oforms");
	editor.palettePosition = "Bottom";
	assert.equal(editor.rtpLayoutClass(), "rtp--bottom rtp--light");
	editor.palettePosition = "left";
	assert.equal(editor.rtpPosition(), "end");
	assert.equal(editor.rtpHint(), "Click a variable or drag it into the text.");
	editor.paletteHint = false;
	assert.equal(editor.rtpHint(), "");
});

test("editor: init of HugeRTE, the init input over the defaults, both setups run", () => {
	const editor = new Editor(translate);
	let consumer = 0;
	editor.placeholder = "Write";
	editor.init = { toolbar: "bold", content_style: "p{margin:0}", setup: () => consumer++ };
	const init = editor.rtpGetInit();
	assert.equal(init.toolbar, "bold");
	assert.equal(init.height, 400);
	assert.equal(init.placeholder, "Write");
	assert.equal(init.language, "fr");
	assert.match(init.content_style, /^:root\{color-scheme:light\}[\s\S]*\.rtp-variable\{[\s\S]*\np\{margin:0\}$/);
	assert.equal(init.skin, "oxide");
	assert.equal(init.content_css, "default");
	assert.equal(init.menubar, "file edit view insert format tools table help", "the menu bar of the Description of C8Oforms");
	assert.equal(editor.rtpGetInit(), init, "computed once");
	const fake = new FakeEditor();
	init.setup(fake);
	assert.equal(consumer, 1);
	assert.equal(editor.rtpEditor, fake);
	assert.equal(new Editor({ currentLang: "de" }).rtpEditorLanguage(), null);
	assert.equal(new Editor({ currentLang: "zh_CN" }).rtpEditorLanguage(), "zh-CN");
});

test("editor: the defaults of HugeRTE are the menu bar, toolbar and plugins of the Description of C8Oforms", () => {
	const init = new Editor(translate).rtpGetInit();
	assert.equal(init.toolbar, "undo redo | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | help");
	assert.equal(init.toolbar_mode, "sliding");
	for (const plugin of ["lists", "link", "image", "table", "quickbars", "wordcount", "help", "code", "fullscreen", "emoticons"]) {
		assert.ok(init.plugins.split(" ").includes(plugin), plugin);
	}
	for (const plugin of ["autosave", "save", "template"]) {
		assert.ok(!init.plugins.split(" ").includes(plugin), "no " + plugin + " (it needs a server or a configuration of the application)");
	}
	assert.match(init.menu.format.items, /bold italic underline/);
	assert.equal(init.quickbars_selection_toolbar, "bold italic | quicklink h2 h3 blockquote quickimage quicktable");
});

test("palette: icons, second lines and types of the variables, as in the palette of C8Oforms", () => {
	const editor = new Editor(translate);
	editor.variables = [
		{ key: "customer.name", label: "Customer", group: "Customer", icon: "person-outline", type: "Text" },
		{ key: "logo", label: "Logo", group: "Customer", icon: "assets/icons/logo.svg", description: "The logo" },
		{ key: "plain", label: "Plain" },
		{ key: "api.user.name", label: "Author", icon: "create-outline" }
	];
	editor.ngDoCheck();
	const groups = editor.rtpGetGroups();
	assert.deepEqual(groups.map((g) => g.title), ["Customer", "", "Date and time", "Signed-in user", "Application"]);
	const [name, logo] = groups[0].items;
	assert.deepEqual(name.icon, { mask: null, name: "person-outline" }, "an Ionicons name: an ion-icon");
	assert.equal(name.type, "Text");
	assert.equal(name.placeholder, "{{ customer.name }}");
	assert.deepEqual(logo.icon, { mask: "url(\"assets/icons/logo.svg\")", name: null }, "a URL: a mask");
	assert.equal(logo.sub, "The logo");
	assert.match(groups[1].items[0].icon.mask, /^url\("data:image\/svg\+xml;utf8,%3Csvg/, "no icon: the variable icon of the palette");
	assert.match(groups[0].icon.mask, /^url\("data:image\/svg\+xml/, "a group without icon: the folder of the palette");
	const today = groups[2].items[0];
	assert.equal(today.key, "api.clock.today");
	assert.equal(today.type, "Date");
	assert.match(today.sub, /^e\.g\. \d{4}-\d{2}-\d{2}$/);
	assert.equal(today.icon.mask, editor.rtpIcon("calendar"));
	assert.equal(groups[2].icon.mask, editor.rtpIcon("clock"), "the default groups keep their icon");
	const author = groups[3].items.find((item) => item.key == "api.user.name");
	assert.equal(author.label, "Author");
	assert.equal(author.icon.name, "create-outline", "a default variable redefined keeps its place, with its new icon");
	assert.equal(author.type, "Text");
	assert.equal(editor.rtpIconRef("lucide:hash", "folder").mask, editor.rtpIcon("hash"));
	assert.equal(editor.rtpIconRef("lucide:nothing", "folder").mask, editor.rtpIcon("folder"));
	assert.equal(editor.rtpIconRef("a\"b/c.svg", "folder").mask, "url(\"a%22b/c.svg\")", "a quote cannot end the url()");
	editor.rtpSearch = "date";
	assert.deepEqual(editor.rtpGetGroups().map((g) => g.title), ["Date and time"], "the type is searched too");
});

test("palette: groups that fold, their icons from the groups input, the foot that describes a variable", () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "a", label: "A", group: "Customer" }, { key: "b", label: "B", group: "Order", description: "The order" }];
	editor.groups = { "Customer": "people-outline", "Order": { icon: "assets/cart.svg", open: false }, "Signed-in user": { open: false } };
	editor.ngDoCheck();
	let groups = editor.rtpGetGroups();
	assert.equal(groups[0].icon.name, "people-outline");
	assert.equal(groups[1].icon.mask, "url(\"assets/cart.svg\")");
	assert.deepEqual(groups.map((g) => g.open), [true, false, true, false, true], "open: false folds a group at the start");
	editor.rtpToggleGroup(groups[1]);
	editor.rtpToggleGroup(groups[0]);
	groups = editor.rtpGetGroups();
	assert.deepEqual(groups.map((g) => g.open), [false, true, true, false, true]);
	assert.equal(editor.rtpAllFolded(), false);
	editor.rtpFoldAll();
	assert.equal(editor.rtpAllFolded(), true);
	editor.rtpFoldAll();
	assert.deepEqual(editor.rtpGetGroups().map((g) => g.open), [true, true, true, true, true]);
	editor.rtpFoldAll();
	editor.rtpSearch = "order";
	assert.deepEqual(editor.rtpGetGroups().map((g) => [g.title, g.open]), [["Order", true]], "a search opens the groups it finds");
	editor.rtpSearch = "";
	editor.groups = "[{\"name\": \"Customer\", \"icon\": \"lucide:user\"}]";
	assert.equal(editor.rtpGetGroups()[0].icon.mask, editor.rtpIcon("user"), "groups as JSON");
	// the foot
	assert.equal(editor.rtpHoverItem(), null);
	editor.rtpFolded = {};
	editor.rtpGetGroups();
	editor.rtpHover = "b";
	assert.deepEqual([editor.rtpHoverItem().label, editor.rtpHoverItem().description, editor.rtpHoverItem().placeholder], ["B", "The order", "{{ b }}"]);
	assert.equal(editor.rtpHint(), "Click a variable or drag it into the text.");
	assert.equal(editor.rtpPaletteText("empty", "No variable found."), "No variable found.");
	editor.paletteTexts = { empty: "Aucune variable." };
	assert.equal(editor.rtpPaletteText("empty", "No variable found."), "Aucune variable.");
	assert.equal(editor.rtpPaletteText("foldAll", "Fold all groups"), "Fold all groups");
});

test("theme: light or dark as the background behind the component, the theme input, the skin of HugeRTE", () => {
	assert.deepEqual(new Editor(translate).rtpParseColor("rgba(15, 23, 42, 0.5)"), [15, 23, 42, 0.5]);
	assert.deepEqual(new Editor(translate).rtpParseColor("#0f172a"), [15, 23, 42, 1]);
	assert.deepEqual(new Editor(translate).rtpParseColor("#fff"), [255, 255, 255, 1]);
	assert.equal(new Editor(translate).rtpParseColor("var(--x)"), null);
	assert.equal(new Editor(translate).rtpCssValue("red;}body{display:none", "black"), "black");
	assert.equal(new Editor(translate).rtpCssValue("\"IBM Plex Sans\", sans-serif", "x"), "\"IBM Plex Sans\", sans-serif");
	const card = document.createElement("div");
	const transparent = document.createElement("div");
	const host = document.createElement("div");
	card.style.backgroundColor = "rgb(15, 23, 42)";
	host.style.color = "rgb(226, 232, 240)";
	host.style.fontFamily = "\"IBM Plex Sans\", sans-serif";
	transparent.appendChild(host);
	card.appendChild(transparent);
	document.body.appendChild(card);
	const editor = new Editor(translate);
	editor.elementRef = { nativeElement: host };
	let look = editor.rtpDetectLook();
	assert.equal(look.theme, "dark", "the first opaque background behind the component is dark");
	assert.equal(look.text, "rgb(226, 232, 240)");
	assert.equal(look.font, "\"IBM Plex Sans\", sans-serif");
	assert.equal(look.primary, "#60a5fa", "without --ion-color-primary, a primary color for the dark theme");
	editor.ngOnInit();
	assert.match(editor.rtpLayoutClass(), /rtp--dark/);
	const init = editor.rtpGetInit();
	assert.equal(init.skin, "oxide-dark");
	assert.equal(init.content_css, "dark");
	assert.match(init.content_style, /^:root\{color-scheme:dark\}html,body\{background:transparent\}body\{color:rgb\(226, 232, 240\)/);
	editor.theme = "light";
	look = editor.rtpDetectLook();
	assert.equal(look.theme, "light", "the theme input wins");
	assert.equal(look.text, "#111827", "a light text does not fit a light theme");
	editor.theme = "auto";
	card.style.backgroundColor = "#ffffff";
	host.style.color = "rgb(17, 24, 39)";
	assert.equal(editor.rtpDetectLook().theme, "light");
	editor.ngOnDestroy();
	card.remove();
});

test("theme: a change of theme starts a new editor, which loads the text of the former one", async () => {
	const card = document.createElement("div");
	const host = document.createElement("div");
	card.style.backgroundColor = "#ffffff";
	card.appendChild(host);
	document.body.appendChild(card);
	const editor = new Editor(translate);
	let marks = 0;
	editor.ref = { markForCheck: () => marks++ };
	editor.elementRef = { nativeElement: host };
	editor.html = "<p>Start</p>";
	editor.init = { content_style: "p{margin:0}" };
	editor.ngOnInit();
	editor.ngDoCheck();
	const looks = editor.rtpLooks;
	assert.equal(looks.length, 1);
	marks = 0;
	const first = new FakeEditor();
	editor.rtpGetInit().setup(first);
	first.fire("init");
	first.body += "<p>typed</p>";
	first.fire("input");
	editor.rtpRefreshLook();
	assert.equal(editor.rtpLooks, looks, "the same look: the same editor");
	assert.equal(first.getDoc().getElementById("rtp-look"), null);
	// another color of text or another font, in the same theme: given to the text at once, the same editor
	host.style.color = "rgb(51, 65, 85)";
	editor.rtpRefreshLook();
	assert.equal(editor.rtpLooks, looks);
	assert.equal(editor.rtpEditor, first);
	assert.match(first.getDoc().getElementById("rtp-look").textContent, /body\{color:rgb\(51, 65, 85\);[\s\S]*\np\{margin:0\}$/, "the content_style of the init input stays after it");
	assert.equal(marks, 0);
	// the page turns dark
	card.style.backgroundColor = "#020617";
	editor.rtpRefreshLook();
	assert.deepEqual([looks[0], editor.rtpLooks[0]], ["light", "dark"]);
	assert.equal(editor.rtpEditor, null);
	assert.equal(marks, 1, "the view is told it changed: the application may run without zone.js");
	assert.equal(editor.onChange.out.length, 1, "the text typed is given before the editor goes away");
	const second = new FakeEditor();
	const init = editor.rtpGetInit();
	assert.equal(init.skin, "oxide-dark");
	init.setup(second);
	second.fire("init");
	assert.equal(second.getContent(), "<p>Start</p><p>typed</p>", "the text of the former editor, not the html input");
	first.fire("blur");
	first.body = "<p>old editor</p>";
	first.fire("input");
	await new Promise((resolve) => setTimeout(resolve, 300));
	assert.equal(editor.onBlur.out.length, 0, "the former editor is left alone");
	assert.equal(editor.onChange.out.length, 1, "no onChange for the text loaded, none from the former editor");
	assert.equal(editor.onReady.out.length, 2);
	editor.ngOnDestroy();
	card.remove();
});

test("editor: html loaded at start, an echo not loaded again, another html loaded, onChange once per change", async () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "customer.name", label: "Customer" }];
	editor.html = "<p>Hello {{ customer.name }}</p>";
	editor.ngOnInit();
	editor.ngDoCheck();
	const fake = new FakeEditor();
	editor.rtpGetInit().setup(fake);
	fake.fire("init");
	assert.equal(editor.rtpReady, true);
	assert.match(fake.body, /data-rtp-variable="customer.name"/);
	assert.equal(fake.getContent(), "<p>Hello {{ customer.name }}</p>");
	assert.equal(editor.onReady.out.length, 1);
	await new Promise((resolve) => setTimeout(resolve, 20));
	assert.equal(editor.onChange.out.length, 0, "no onChange for the html loaded");
	// a variable of the palette: onChange at once, with the keys of the text
	editor.rtpInsert({ key: "api.user.name" });
	assert.equal(editor.onChange.out.length, 1);
	assert.deepEqual(editor.onChange.out[0], { html: "<p>Hello {{ customer.name }}</p>{{ api.user.name }}", variables: ["customer.name", "api.user.name"] });
	assert.equal(editor.htmlChange.out[0], "<p>Hello {{ customer.name }}</p>{{ api.user.name }}");
	await new Promise((resolve) => setTimeout(resolve, 300));
	assert.equal(editor.onChange.out.length, 1, "not given twice");
	// the page gives back the html of onChange: not loaded again
	const sets = fake.sets;
	editor.html = editor.onChange.out[0].html;
	editor.ngOnChanges({ html: {} });
	assert.equal(fake.sets, sets);
	// another html: loaded, without onChange
	editor.html = "<p>Other</p>";
	editor.ngOnChanges({ html: {} });
	assert.equal(fake.sets, sets + 1);
	assert.equal(fake.getContent(), "<p>Other</p>");
	await new Promise((resolve) => setTimeout(resolve, 20));
	assert.equal(editor.onChange.out.length, 1);
	// disabled: the palette inserts nothing
	editor.disabled = "true";
	editor.rtpInsert({ key: "customer.name" });
	assert.equal(fake.getContent(), "<p>Other</p>");
	// blur: onChange of the text typed, then onBlur
	editor.disabled = false;
	fake.body += "<p>typed</p>";
	fake.fire("input");
	fake.fire("blur");
	assert.equal(editor.onChange.out.length, 2);
	assert.deepEqual(editor.onBlur.out[0], { html: "<p>Other</p><p>typed</p>", variables: [] });
});

test("editor: a variable dragged from the palette carries its key, its placeholder and its chip", () => {
	const editor = new Editor(translate);
	editor.variables = [{ key: "customer.name", label: "Customer" }];
	editor.ngDoCheck();
	const data = {};
	const event = { dataTransfer: { setData: (type, value) => data[type] = value } };
	editor.rtpDragStart(event, { key: "customer.name" });
	assert.equal(event.dataTransfer.effectAllowed, "copy");
	assert.equal(data[editor.rtpDragType], "customer.name");
	assert.equal(data["text/plain"], "{{ customer.name }}");
	assert.match(data["text/html"], /data-rtp-variable="customer.name"/);
	assert.equal(editor.rtpIsVariableDrag({ dataTransfer: { types: ["text/plain", editor.rtpDragType] } }), true);
	assert.equal(editor.rtpIsVariableDrag({ dataTransfer: { types: ["text/plain"] } }), false);
});

test("viewer: values as text, functions, dates, arrays, line breaks; a placeholder of no variable kept", () => {
	const viewer = newViewer();
	viewer.c8o = { session: { user: { authenticated: true, name: "jane.doe@example.com", groups: ["admins", { name: "sales" }] } } };
	viewer.variables = { "customer.name": "ACME <b>&</b>", "order.total": () => 1250.5, "notes": "line 1\nline 2", "tags": ["a", "b", null], "broken": () => { throw new Error("x"); } };
	viewer.html = "<p>{{ customer.name }} | {{ order.total }} | {{ notes }} | {{ tags }} | {{ broken }} | {{ missing }} | {{ api.user.name }} | {{ api.user.email }} | {{ api.user.groups }} | {{ api.clock.year }}</p>";
	const html = viewer.rtpRendered().trusted;
	assert.equal(html, "<p>ACME &lt;b&gt;&amp;&lt;/b&gt; | 1250.5 | line 1<br>line 2 | a, b |  | {{ missing }} | jane.doe@example.com | jane.doe@example.com | admins, sales | " + new Date().getFullYear() + "</p>");
	viewer.userName = "Jane Doe";
	viewer.userEmail = "jane@example.org";
	assert.match(viewer.rtpRendered().trusted, /\| Jane Doe \| jane@example.org \|/);
	viewer.c8o = { session: { user: { authenticated: false, name: "anonymous@example.com" } } };
	viewer.userName = "";
	viewer.userEmail = null;
	assert.match(viewer.rtpRendered().trusted, /\{\{ missing \}\} \|  \|  \|  \|/, "no user while not signed in");
	const warnings = [];
	const warn = console.warn;
	console.warn = (...args) => warnings.push(args.join(" "));
	viewer.rtpRendered();
	viewer.variables = { ...viewer.variables, other: "x" };
	viewer.rtpRendered();
	console.warn = warn;
	assert.equal(warnings.length, 0, "a failing value is told once");
	assert.match(viewer.rtpClock("today"), /^\d{4}-\d{2}-\d{2}$/);
	assert.match(viewer.rtpClock("time"), /^\d{2}:\d{2}$/);
	assert.match(viewer.rtpClock("now"), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
});

test("viewer: the HTML sanitized, its inline styles and safe links kept", () => {
	const viewer = newViewer();
	viewer.variables = { name: "<img src=x onerror=alert(1)>" };
	viewer.html = "<p style=\"color: red\">{{ name }}</p><img src=\"x\" onerror=\"alert(1)\"><a href=\"javascript:alert(2)\">js</a>"
		+ "<a href=\"https://example.com\" target=\"_blank\">ok</a><a href=\"https://example.org\" target=\"evil\">t</a><script>alert(3)</script>"
		+ "<iframe src=\"https://example.com\"></iframe><form><input value=\"x\"></form><style>body{display:none}</style><img src=\"file:///C:/x.png\">"
		+ "<p contenteditable=\"true\">e</p><img src=\"data:image/png;base64,iVBORw0KGgo=\">";
	const html = viewer.rtpRendered().trusted;
	assert.match(html, /<p style="color: red">&lt;img src=x onerror=alert\(1\)&gt;<\/p>/);
	assert.doesNotMatch(html, /onerror="|javascript:|<script|<iframe|<form|<input|<style|file:|contenteditable/i);
	assert.match(html, /<a href="https:\/\/example.com" target="_blank" rel="noopener noreferrer">ok<\/a>/);
	assert.match(html, /<a href="https:\/\/example.org">t<\/a>/);
	assert.match(html, /<img src="data:image\/png;base64,iVBORw0KGgo=">/);
	// the DOMPurify of the viewers is its own: the one of the application gets no hook
	const appPurify = createDOMPurify(window);
	assert.match(appPurify.sanitize("<a href=\"https://e.com\" target=\"_blank\">x</a>"), /^<a href="https:\/\/e.com">x<\/a>$/);
});

test("viewer: the same SafeHtml while nothing changes, onRender when the HTML shown changes", async () => {
	const viewer = newViewer();
	viewer.variables = [{ key: "n", value: "1" }];
	viewer.html = "<p>{{ n }}</p>";
	const first = viewer.rtpRendered();
	assert.equal(viewer.rtpRendered(), first);
	viewer.variables = [{ key: "n", value: "2" }];
	const second = viewer.rtpRendered();
	assert.notEqual(second, first);
	assert.equal(second.trusted, "<p>2</p>");
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.deepEqual(viewer.onRender.out.map((event) => event.html), ["<p>1</p>", "<p>2</p>"]);
	viewer.html = null;
	assert.equal(viewer.rtpRendered().trusted, "");
});
