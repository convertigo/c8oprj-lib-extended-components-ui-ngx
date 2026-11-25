


# lib_ExtendedComponents_ui_ngx

Set of shared components you can use in your projects :

- Grid : Display & Edit tabular data
- Chips : display / remove tags in input fields




For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [AGGRIDCRUD_DELETE](#aggridcrud_delete)
    - [AGGRIDCRUD_INSERT](#aggridcrud_insert)
    - [AGGRIDCRUD_LIST](#aggridcrud_list)
    - [AGGRIDCRUD_SELECT](#aggridcrud_select)
    - [AGGRIDCRUD_UPDATE](#aggridcrud_update)
    - [RichTextPaletteMerge](#richtextpalettemerge)
- [Mobile Library](#mobile-library)
    - [Shared Actions](#shared-actions)
        - [agGridCompleteRowCreation](#aggridcompleterowcreation)
        - [agGridUpdateRows](#aggridupdaterows)
        - [cardIO_sa](#cardio_sa)
        - [ZXing_sa](#zxing_sa)
    - [Shared Components](#shared-components)
        - [agGrid](#aggrid)
        - [agGrid_CRUD](#aggrid_crud)
        - [angularxQRCode](#angularxqrcode)
        - [cardIO_sc](#cardio_sc)
        - [cyGraph](#cygraph)
        - [DropZoneComponent](#dropzonecomponent)
        - [frappeGantt](#frappegantt)
        - [kanbanBoard](#kanbanboard)
        - [materialDatePicker](#materialdatepicker)
        - [materialSlider](#materialslider)
        - [ngSelect](#ngselect)
        - [ngxTagInput](#ngxtaginput)
        - [richTextPalette](#richtextpalette)
        - [richTextPaletteViewer](#richtextpaletteviewer)
        - [sortableJS](#sortablejs)
        - [tinyMce](#tinymce)
        - [tuiImageEditor](#tuiimageeditor)


## Installation

1. In your Convertigo Studio click on ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/icons/studio/project_import.gif?raw=true "Import a project in treeview") to import a project in the treeview
2. In the import wizard

   ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/tomcat/webapps/convertigo/templates/ftl/project_import_wzd.png?raw=true "Import Project")
   
   paste the text below into the `Project remote URL` field:
   <table>
     <tr><td>Usage</td><td>Click the copy button at the end of the line</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_ExtendedComponents_ui_ngx=https://github.com/convertigo/c8oprj-lib-extended-components-ui-ngx.git:branch=8.4.0.0
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_ExtendedComponents_ui_ngx=https://github.com/convertigo/c8oprj-lib-extended-components-ui-ngx/archive/8.4.0.0.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_ExtendedComponents_ui_ngx__ project


## Sequences

### AGGRIDCRUD_DELETE

Demo of agGrid_CRUD (page testAgGridCrud1): deletes a row of the AGGRIDCRUD table of the sample HSQLDB database of the library. Hidden, so it answers without authentication.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ID</td><td>ID</td>
</tr>
</table>


### AGGRIDCRUD_INSERT

Demo of agGrid_CRUD (page testAgGridCrud1): adds a row to the AGGRIDCRUD table of the sample HSQLDB database of the library. Hidden, so it answers without authentication.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>FIRST_NAME</td><td>FIRST_NAME</td>
</tr>
<tr>
<td>LAST_NAME</td><td>LAST_NAME</td>
</tr>
<tr>
<td>EMAIL</td><td>EMAIL</td>
</tr>
<tr>
<td>PHONE</td><td>PHONE</td>
</tr>
<tr>
<td>SCORE</td><td>SCORE</td>
</tr>
</table>


### AGGRIDCRUD_LIST

Demo of agGrid_CRUD (page testAgGridCrud1): lists the rows of the AGGRIDCRUD table of the sample HSQLDB database of the library. Hidden, so it answers without authentication.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>order_by</td><td>order_by</td>
</tr>
<tr>
<td>limit</td><td>limit</td>
</tr>
<tr>
<td>offset</td><td>offset</td>
</tr>
</table>


### AGGRIDCRUD_SELECT

Demo of agGrid_CRUD (page testAgGridCrud1): reads one row of the AGGRIDCRUD table of the sample HSQLDB database of the library. Hidden, so it answers without authentication.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ID</td><td>ID</td>
</tr>
</table>


### AGGRIDCRUD_UPDATE

Demo of agGrid_CRUD (page testAgGridCrud1): updates a row of the AGGRIDCRUD table of the sample HSQLDB database of the library. Hidden, so it answers without authentication.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>FIRST_NAME</td><td>FIRST_NAME</td>
</tr>
<tr>
<td>LAST_NAME</td><td>LAST_NAME</td>
</tr>
<tr>
<td>EMAIL</td><td>EMAIL</td>
</tr>
<tr>
<td>PHONE</td><td>PHONE</td>
</tr>
<tr>
<td>SCORE</td><td>SCORE</td>
</tr>
<tr>
<td>ID</td><td>ID</td>
</tr>
</table>


### RichTextPaletteMerge

Merges values into an HTML text written with richTextPalette, on the server (a mail or a PDF made by a sequence). Each {{ key }} placeholder of its text is replaced by the value of its key, written as text (escaped, its line breaks as `<br>`), as richTextPaletteViewer does in the application; a placeholder in a tag (an attribute) stays as written.

Private: call it as a sub-sequence, with a Call Sequence step on lib_ExtendedComponents_ui_ngx.RichTextPaletteMerge and its variables html and values. A JavaScript step can build values before, for example from a row read in a database: `values = JSON.stringify({"customer.name": row.name, "order.total": row.total + " EUR"})`.

Returns html, the merged HTML; variables, the keys of the placeholders of the text; missing, the keys without value, whose placeholders stay as written, or are removed with removeUnknown.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>html</td><td>The HTML text written with richTextPalette (its html, saved from onChange), its variables as {{ key }} placeholders</td>
</tr>
<tr>
<td>values</td><td>The values of the variables, as a JSON object { key: value }: a value is written as text, an array as its values joined by commas. Example: {"customer.name": "ACME Corporation", "order.total": "1250.50 EUR"}</td>
</tr>
<tr>
<td>removeUnknown</td><td>true to remove the placeholders without value; false (default) keeps them as written</td>
</tr>
</table>


## Mobile Library

Describes the mobile application global properties

### Shared Actions

#### agGridCompleteRowCreation

agGrid Complete Row Creation, must be called in a RowCreate Control once the backend call that creates the row is over

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>agGridEvent</td><td><p>map agGridEvent to the TS &#x27;event&#x27; parameter from the RowCreate Control</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>data</td><td><p>the created row as the backend returned it (with its id, computed fields...). Optional: the submitted row is used when empty</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>error</td><td><p>set it when the creation failed (message or error object): the draft row stays open and shows the message. Leave empty on success</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>

#### agGridUpdateRows

agGrid Update Rows, must be called in a GetRows Control

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>agGridEvent</td><td><p>map agGridEvent to the TS &#x27;event&#x27; parameter from the GetRows Control</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>data</td><td><p>data must receive a JSON with a RowData key and an optional ColDef key</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>

#### cardIO_sa

CardIO SharedAction

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ccard_topic</td><td><p>Publish Topic name to use with a Subscribe component. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>ccn</td><td><p>Input tag identifier to set Card Number value to. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>cexp</td><td><p>Input tag identifier to set Expiry date value (MM/YY) to. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>cvv</td><td><p>Input tag identifier to set cryptogram value (123) to. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>local_ccard_suffix</td><td><p>Suffix for local page variable in case of multiple CardIO plugin instances. Default: &#x27;&#x27;. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>options</td><td><p>CardIO plugin options. See https://github.com/card-io/card.io-Cordova-Plugin</p><p><b>Example:</b> 

```
{requireExpiry: true, requireCVV: true, suppressManual: true, scanExpiry: true, guideColor: 3702517, keepApplicationTheme: true, supressC...
```

</p></td>
</tr>
</table>

#### ZXing_sa

ZXing SharedAction

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>file</td><td><p>File object as Array (if not provided from an input type file).</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imgId</td><td><p>Img tag identifier to output image file. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>isOutputEvent</td><td><p>Publish scan result or not to the topic event. Default: true.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>isOutputGlobal</td><td><p>Insert or not the scan result in a global page variable. The variable is composed of &#x27;zxing:&#x27; + topic + ref variables. Default: true.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>ref</td><td><p>In case of multiple ZXing package instances, set the variable to different values to distinguish the Publish data event and/or the local page variable. Default: &#x27;&#x27;. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>resultId</td><td><p>Input tag identifier to set value to. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>topic</td><td><p>Publish Topic name to use with a Subscribe component. Optional</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>type</td><td><p>Scan from file or video. Default: &#x27;file&#x27;</p><p><b>Example:</b> 

```
&#x27;file&#x27;
```

</p></td>
</tr>
<tr>
<td>videoId</td><td><p>Video tag identifier to output video camera. Default: &#x27;video&#x27;. Optional</p><p><b>Example:</b> 

```
&#x27;video&#x27;
```

</p></td>
</tr>
</table>

### Shared Components

#### agGrid

This Shared component wraps the ag-grid component. Most of the properties and events are supported. Please see https://www.ag-grid.com/ for more details.

Display options (off by default): truncateText shows each cell on one line, cut with an ellipsis at the width of its column, the whole content in a tooltip on hover or keyboard focus; maxColumnCharacters keeps the columns no wider than a number of characters after each sizing pass, a column resized by the user keeps its width; stickyHeader keeps the header row on screen while the page scrolls the rows of the grid, at stickyHeaderTop. Fonts (off by default, the font of the theme): headerFontFamily and headerFontSize set the font of the header row, cellFontFamily and cellFontSize the font of the rows; a value that is not a font family list or a size is ignored.

External pagination (off by default): externalPagination shows, under a grid whose rows are paged by the application, a pager with the look and the texts of the pager of AG Grid; it says which rows the grid holds among all of them (externalPaginationPage, externalPaginationPageSize, externalPaginationRowCount) and asks the other pages with the PageRequest event, its buttons disabled while externalPaginationBusy is true.

Row creation (optional, off by default): set enableRowCreation to true to let users add a row without creating an empty record first. Add row opens a draft row pinned at the top of the grid (pagination, sorting and filtering never hide it), its cells are validated and normalized according to rowCreationColumns, Save is blocked while a cell is invalid and creates the row with one single call (rowCreationCallback, or the RowCreate event completed by the agGridCompleteRowCreation action), Cancel drops the draft and nothing is persisted. Grid events of the draft row (CellValueChanged, CellClicked, RowClicked, RowDoubleClicked) are not forwarded; existing rows behave as before.


**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>accessibility</td><td><p>boolean: true (default) or false</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>ariaLabel</td><td><p>Variable aria Label.</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>autoSizeColumns</td><td><p>Variable auto Size Columns.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>cacheBlockSize</td><td><p>Variable cache Block Size.</p><p><b>Example:</b> 

```
100
```

</p></td>
</tr>
<tr>
<td>cellFontFamily</td><td><p>string: null (default) or a list of font families, as the CSS property font-family (names, quoted or not, and generic families such as serif or monospace), or a var() of a variable of the page with such a list as fallback. The font family of the rows: their cells, the draft row of the row creation, the pinned and full width rows. While null, the rows keep the font of the theme; a value that is not a list of font families is ignored.</p><p><b>Example:</b> 

```
&#x27;ui-monospace, Menlo, monospace&#x27;
```

</p></td>
</tr>
<tr>
<td>cellFontSize</td><td><p>number or string: null (default), a number of pixels or a CSS length (px, pt, em, rem, %), or a var() of a variable of the page. The font size of the rows. While null, the rows keep the font size of the theme; a value that is not a size is ignored. Rows of an automatic height (autoHeight columns) follow the size; rows of a fixed height (rowHeight) keep it.</p><p><b>Example:</b> 

```
12
```

</p></td>
</tr>
<tr>
<td>class</td><td><p>One of the themes provided by AG Grid. See https://www.ag-grid.com/javascript-grid-themes-provided/ and import the matching theme stylesheet in the app theme.</p><p><b>Example:</b> 

```
&#x27;ag-theme-quartz&#x27;
```

</p></td>
</tr>
<tr>
<td>columnDefs</td><td><p>Array of columnDef {headerName: &#x27;headerName&#x27;, field: &#x27;fieldName&#x27;} objects</p><p><b>Example:</b> 

```
[]
```

</p></td>
</tr>
<tr>
<td>customLocaleText</td><td><p>Adds or overrides grid localization entries by language key.</p><p><b>Example:</b> 

```
{}
```

</p></td>
</tr>
<tr>
<td>datasource</td><td><p>Variable datasource.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>defaultColDef</td><td><p>default is {hide: false, editable: true, sortable: true, resizable: true, filter: true, checkboxSelection: false, singleClickEdit: false}</p><p><b>Example:</b> 

```
{hide: false, editable: true, sortable: true, resizable: true, filter: true, checkboxSelection: false, singleClickEdit: false}
```

</p></td>
</tr>
<tr>
<td>domLayout</td><td><p>boolean: true (default) or false</p><p><b>Example:</b> 

```
&#x27;autoHeight&#x27;
```

</p></td>
</tr>
<tr>
<td>enableRowCreation</td><td><p>boolean: false (default) or true. When true, the grid offers a transactional row creation: <b>Add row</b> opens a draft row pinned at the top of the grid (never hidden by pagination, sorting or filtering), its cells are validated against 

```
rowCreationColumns
```

, <b>Save</b> creates the row with one single call and <b>Cancel</b> drops the draft. Nothing reaches the backend before Save. While false, the grid behaves exactly as before.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>externalPagination</td><td><p>boolean: false (default) or true. When true, the rows of the grid are paged by the application (a server gives one page at a time): the grid holds the rows of the page shown, and a pager under it, with the look and the texts of the pager of AG Grid, says which rows they are ("21 to 40 of 250", "Page 2 of 13") and offers the first, previous, next and last pages. A button emits the <code>PageRequest</code> event; the application gives the grid the rows of that page and sets externalPaginationPage. The pagination of AG Grid is off meanwhile. While false, the grid behaves exactly as before.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>externalPaginationBusy</td><td><p>boolean: false (default) or true. While true (a page is loading), the buttons of the pager of externalPagination are disabled; they keep the focus of the keyboard.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>externalPaginationPage</td><td><p>number: the page shown when externalPagination is true, from 1 (default 1; never past the last page).</p><p><b>Example:</b> 

```
2
```

</p></td>
</tr>
<tr>
<td>externalPaginationPageSize</td><td><p>number: the number of rows of a page when externalPagination is true; null (default) takes paginationPageSize.</p><p><b>Example:</b> 

```
20
```

</p></td>
</tr>
<tr>
<td>externalPaginationRowCount</td><td><p>number: the number of rows of all the pages when externalPagination is true. null (default) while it is unknown: the pager says "of more", offers the next page while the page shown is full, and no last page.</p><p><b>Example:</b> 

```
250
```

</p></td>
</tr>
<tr>
<td>getLocaleText</td><td><p>Variable get Locale Text.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>headerFontFamily</td><td><p>string: null (default) or a list of font families, as the CSS property font-family (names, quoted or not, and generic families such as serif or monospace), or a var() of a variable of the page with such a list as fallback. The font family of the header row: the names of the columns, the group headers and the floating filters. While null, the header keeps the font of the theme; a value that is not a list of font families is ignored.</p><p><b>Example:</b> 

```
&#x27;Georgia, &quot;Times New Roman&quot;, serif&#x27;
```

</p></td>
</tr>
<tr>
<td>headerFontSize</td><td><p>number or string: null (default), a number of pixels or a CSS length (px, pt, em, rem, %), or a var() of a variable of the page. The font size of the header row. While null, the header keeps the font size of the theme; a value that is not a size is ignored. The header row keeps its height: a size much larger than the font of the theme may cut its texts.</p><p><b>Example:</b> 

```
13
```

</p></td>
</tr>
<tr>
<td>height</td><td><p>height is &#x27;auto&#x27; or value in % or px</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>icons</td><td><p>Replaces AG Grid's default legacy "menu" icon with a custom icon, for example a filter/funnel icon.</p><p><b>Example:</b> 

```
{
    menu: `<span class='ag-icon ag-icon-filter'></span>`
}
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>An Optional ID</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>localeText</td><td><p>Defines grid localization. You can pass a language code (for example fr or fr-FR) or a map of translation key/value pairs.</p><p><b>Example:</b> 

```
&#x27;en&#x27;
```

</p></td>
</tr>
<tr>
<td>maxBlocksInCache</td><td><p>How many blocks to keep in the store. Default is no limit, so every requested block is kept</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>maxColumnCharacters</td><td><p>number: null (default) or a number of characters. After each sizing pass of the grid (autoSizeColumns, or the fit of the columns to the width of the grid), a column wider than this number of characters (as many "0" in the font of the cells, plus their padding, never under the minWidth of the column) is brought back to it. A column the user resizes keeps its width until the next sizing pass (new rows, a new width of the grid). With truncateText, a longer text is cut at the width of the column.</p><p><b>Example:</b> 

```
40
```

</p></td>
</tr>
<tr>
<td>overlayLoadingTemplate</td><td><p>Variable overlay Loading Template.</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>overlayNoRowsTemplate</td><td><p>Variable overlay No Rows Template.</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>pagination</td><td><p>boolean: true (default) or false</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>paginationPageSize</td><td><p>integer: 10 by default</p><p><b>Example:</b> 

```
10
```

</p></td>
</tr>
<tr>
<td>paginationPageSizeSelector</td><td><p>array | boolean: [20,50,100] by default</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>rowCreationAfterSuccess</td><td><p>What the grid does once the row is created: 

```
&#x27;navigate&#x27;
```

 (default) adds the created row, goes to its page and flashes it, 

```
&#x27;append&#x27;
```

 adds it, 

```
&#x27;refresh&#x27;
```

 reloads an infinite grid (a client side grid is reloaded by the application from the 

```
RowCreated
```

 event), 

```
&#x27;none&#x27;
```

 does nothing. An infinite grid is always reloaded.</p><p><b>Example:</b> 

```
&#x27;navigate&#x27;
```

</p></td>
</tr>
<tr>
<td>rowCreationCallback</td><td><p>Optional function 

```
(row, context) =&gt; createdRow | Promise&lt;createdRow&gt;
```

 called once, with the validated and normalized row, to create it in the backend. A rejection keeps the draft open and shows the error. When it is not a function, the 

```
RowCreate
```

 event is fired instead.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>rowCreationColumns</td><td><p>Rules of the draft row, by column field: 

```
{field: {type, required, editable, defaultValue, options, min, max, integer, minLength, maxLength, pattern, validator, message, dateOutput}}
```

. 

```
type
```

: text, number, integer, date, boolean, select or multiselect; it selects the cell editor and the value is validated and normalized (number, boolean, YYYY-MM-DD string, option value, array of option values) before submit. 

```
editable
```

: true or false forces the draft cell, otherwise the column editable setting applies. 

```
options
```

: values or {value, label} objects for select and multiselect. 

```
pattern
```

: regular expression. 

```
validator
```

: function (value, row, field), returning true, false or an error message. 

```
dateOutput
```

: day (default), iso, timestamp or date. A field without rule is free text and optional.</p><p><b>Example:</b> 

```
{make: {type: &#x27;select&#x27;, required: true, options: [&#x27;Toyota&#x27;, &#x27;Ford&#x27;]}, price: {type: &#x27;number&#x27;, required: true, min: 0}}
```

</p></td>
</tr>
<tr>
<td>rowCreationDefaultValues</td><td><p>Initial values of the draft row: an object 

```
{field: value}
```

 or a function returning one.</p><p><b>Example:</b> 

```
{}
```

</p></td>
</tr>
<tr>
<td>rowCreationToolbar</td><td><p>boolean: true (default) shows the Add row / Save / Cancel buttons above the grid when enableRowCreation is true. Set false to drive the draft row from your own buttons with 

```
agGrid.context.rowCreation.start()
```

, 

```
submit()
```

 and 

```
cancel()
```

 (agGrid is 

```
event.object.agGrid
```

 of the GridReady event).</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>rowData</td><td><p>Array of row { fieldName1: &#x27;value1&#x27;, fieldName2: &#x27;value2&#x27;, fieldName3: true, ...} objects</p><p><b>Example:</b> 

```
[{ make: &#x27;Toyota&#x27;, model: &#x27;Celica&#x27;, price: 35000 },{ make: &#x27;Ford&#x27;, model: &#x27;Mondeo&#x27;, price: 32000 },{ make: &#x27;Porsche&#x27;, model: &#x27;Boxter&#x27;, pr...
```

</p></td>
</tr>
<tr>
<td>editType</td><td><p>'singleCell' or 'fullRow'</p></td>
</tr>
<tr>
<td>pinnedTopRowData</td><td><p>Data to be displayed as pinned top rows in the grid.</p></td>
</tr>
<tr>
<td>pinnedBottomRowData</td><td><p>Data to be displayed as pinned bottom rows in the grid.</p></td>
</tr>
<tr>
<td>rowDeselection</td><td><p>boolean: true (default) or false</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>rowHeight</td><td><p>Height of the row in pixels as a string</p><p><b>Example:</b> 

```
&#x27;25&#x27;
```

</p></td>
</tr>
<tr>
<td>rowModelType</td><td><p>Row model type</p><p><b>Example:</b> 

```
&#x27;clientSide&#x27;
```

</p></td>
</tr>
<tr>
<td>rowSelection</td><td><p>string: &#x27;single&#x27; (default) or &#x27;multiple&#x27;</p><p><b>Example:</b> 

```
&#x27;single&#x27;
```

</p></td>
</tr>
<tr>
<td>showCsvDownload</td><td><p>If true, displays a CSV download button/menu around the grid.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>showCsvDownloadAlignment</td><td><p>If showCsvDownload is true, defines CSV button alignment: start, center or end.</p><p><b>Example:</b> 

```
&#x27;end&#x27;
```

</p></td>
</tr>
<tr>
<td>showCsvDownloadPosition</td><td><p>If showCsvDownload is true, defines CSV button position relative to the grid: top, bottom, left, right, both_row or both_col.</p><p><b>Example:</b> 

```
&#x27;top&#x27;
```

</p></td>
</tr>
<tr>
<td>showXlsxDownload</td><td><p>If true, displays a XLSX download button/menu around the grid.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>showXlsxDownloadAlignment</td><td><p>If showXlsxDownload is true, defines CSV button alignment: start, center or end.</p><p><b>Example:</b> 

```
&#x27;end&#x27;
```

</p></td>
</tr>
<tr>
<td>showXlsxDownloadPosition</td><td><p>If showXlsxDownload is true, defines CSV button position relative to the grid: top, bottom, left, right, both_row or both_col.</p><p><b>Example:</b> 

```
&#x27;top&#x27;
```

</p></td>
</tr>
<tr>
<td>stickyHeader</td><td><p>boolean: false (default) or true. When true, the header row of a grid taller than the screen stays on screen while the page scrolls its rows, then leaves with the end of the grid, as a frozen row of a spreadsheet. It sticks in the nearest scrolling ancestor of the grid, at stickyHeaderTop: that ancestor must be the box that scrolls (a box with overflow hidden or auto that never scrolls keeps it from sticking). Needs overflow: clip (Safari 16 and later; before, the header scrolls with the rows).</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>stickyHeaderTop</td><td><p>CSS length: where the header row sticks when stickyHeader is true, from the top of the scrolling container, for example the height of a sticky toolbar above the grid; a var() of a variable the page sets works too.</p><p><b>Example:</b> 

```
'56px'
```

</p></td>
</tr>
<tr>
<td>suppressCellSelection</td><td><p>Variable suppress Cell Selection.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>suppressFieldDotNotation</td><td><p>boolean: true (default) or false</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>suppressMenuHide</td><td><p>Keeps the legacy column menu/filter button visible at all times instead of showing it only when hovering over the column header.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>suppressRowClickSelection</td><td><p>Variable suppress Row Click Selection.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>truncateText</td><td><p>boolean: false (default) or true. When true, each cell shows on one line, a longer content cut with an ellipsis at the width of its column: widening the column shows more of it. The whole content of a cut cell shows in a tooltip when the mouse rests on the cell (300 ms), or when the cell gets the focus from the keyboard (arrows of the grid) or a touch; Escape, leaving the cell or a scroll hides it, and a cell that shows all of its content shows none. A cell renderer can mark the element holding its line with the class <code>aggrid-cell-line</code> and give its whole content in a <code>data-aggrid-full-text</code> attribute. While false, the grid behaves exactly as before.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>width</td><td><p>width value in % or px</p><p><b>Example:</b> 

```
&#x27;100%&#x27;
```

</p></td>
</tr>
<tr>
<td>wrapperClass</td><td><p>Height of the row in pixels as a string</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>CellClicked</td><td>Fired when a cell is clicked. Data will be the agGrid event</td>
</tr>
<tr>
<td>CellValueChanged</td><td>Fired when A Cell is edited changed. Data will be the agGrid event</td>
</tr>
<tr>
<td>RowValueChanged</td><td>Fired when a row edited in full row mode (editType 'fullRow') is validated. Data will be the agGrid event</td>
</tr>
<tr>
<td>GetRows</td><td>Fire when the RowModelType is 'infinite'. Excepts fromatted data into a agGridUpdateRows action</td>
</tr>
<tr>
<td>GridReady</td><td>Fired when the Grid is ready. Data will be the agGrid event</td>
</tr>
<tr>
<td>PageRequest</td><td>Fired by a button of the pager of externalPagination. Data: {page: the page asked, from 1, previousPage, pageSize, rowCount, button: first, previous, next or last}. Give the grid the rows of that page, then set externalPaginationPage (and externalPaginationRowCount).</td>
</tr>
<tr>
<td>RowClicked</td><td>Fired when a row is clicked. Data will be the agGrid event</td>
</tr>
<tr>
<td>RowCreate</td><td>Fired when a valid draft row is submitted and rowCreationCallback is not a function. Data: {row, success, fail}. Create the row with ONE backend call, then call the agGridCompleteRowCreation action (or event.success(createdRow) / event.fail(error)).</td>
</tr>
<tr>
<td>RowCreateCancelled</td><td>Fired when the draft row is cancelled. Nothing was sent to the backend. Data: {row: the dropped draft}.</td>
</tr>
<tr>
<td>RowCreated</td><td>Fired once the row is created. Data: {row: the created row, submitted: the row that was submitted, rowIndex}.</td>
</tr>
<tr>
<td>RowCreateFailed</td><td>Fired when the row creation failed. The draft row stays open. Data: {row, error}.</td>
</tr>
<tr>
<td>RowDataChanged</td><td>Fired when Row data changed. Data will be the agGrid event</td>
</tr>
<tr>
<td>RowDoubleClicked</td><td>Fired when A Cell is edited changed. Data will be the agGrid event</td>
</tr>
<tr>
<td>RowSelected</td><td>Fired when a row is selected. Data will be the agGrid event</td>
</tr>
<tr>
<td>SelectionChanged</td><td>Fired when selectionChange. Data will be the agGrid event</td>
</tr>
<tr>
<td>SortChanged</td><td>Fired when a a column is sorted. Data will be the agGrid event</td>
</tr>
</table>

#### agGrid_CRUD

This Shared component wraps the ag-grid component. Most of the properties and events are supported. Please see https://www.ag-grid.com/ for more details.
Enhanced version that handle CRUD Sequences (*_INSERT, *_LIST, *_UPDATE, *_DELETE) to manage data.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>table</td><td>Prefix of callable CRUD Sequence (without _LIST). Can be from the current project with dot ".mydata" or another project "myback.mydata".</td>
</tr>
<tr>
<td>enableInsert</td><td>Allow to add entry in the table (need _INSERT).</td>
</tr>
<tr>
<td>enableUpdate</td><td>Allow to update entry in the table (need _UPDATE)</td>
</tr>
<tr>
<td>enableDelete</td><td>Allow to delete entry from the table (need _DELETE)</td>
</tr>
<tr>
<td>pagination</td><td>boolean: true (default) or false</td>
</tr>
<tr>
<td>paginationPageSize</td><td>integer: 20 by default</td>
</tr>
<tr>
<td>paginationPageSizeSelector</td><td>array | boolean: [20,50,100] by default. If 'paginationPageSize' has a value not in the default array, it is automatically added.</td>
</tr>
<tr>
<td>rowSelection</td><td>string: 'single' (default) or 'multiple'</td>
</tr>
<tr>
<td>rowDeselection</td><td>boolean: true (default) or false</td>
</tr>
<tr>
<td>customColDef</td><td>Object of columnDef {'fieldName': {headerName: 'headerName', ...} objects</td>
</tr>
<tr>
<td>defaultColDef</td><td>default is {hide: false, editable: true, sortable: true, resizable: true, filter: true, checkboxSelection: false, singleClickEdit: false}</td>
</tr>
<tr>
<td>width</td><td>width value in % or px</td>
</tr>
<tr>
<td>height</td><td>height is 'auto' or value in % or px</td>
</tr>
<tr>
<td>class</td><td>One of the themes provided here : https://www.ag-grid.com/javascript-grid-themes-provided/ Also be shure to add the theme in the Theme object as : @import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark/sass/ag-theme-balham-dark.scss"; </td>
</tr>
<tr>
<td>id</td><td>An Optional ID</td>
</tr>
<tr>
<td>suppressCellSelection</td><td></td>
</tr>
<tr>
<td>suppressRowClickSelection</td><td></td>
</tr>
<tr>
<td>overlayLoadingTemplate</td><td></td>
</tr>
<tr>
<td>overlayNoRowsTemplate</td><td></td>
</tr>
<tr>
<td>rowHeight</td><td>Height of the row in pixels as a string</td>
</tr>
<tr>
<td>wrapperClass</td><td>Height of the row in pixels as a string</td>
</tr>
<tr>
<td>rowModelType</td><td>Row model type</td>
</tr>
<tr>
<td>maxBlocksInCache</td><td>How many blocks to keep in the store. Default is no limit, so every requested block is kept</td>
</tr>
<tr>
<td>autoSizeColumns</td><td></td>
</tr>
<tr>
<td>accessibility</td><td>boolean: true (default) or false</td>
</tr>
<tr>
<td>ariaLabel</td><td></td>
</tr>
<tr>
<td>showCsvDownload</td><td>If set to true will display a side bar menu where user can click a download button to download the grid content as a CSV file.</td>
</tr>
<tr>
<td>showCsvDownloadPosition</td><td>If 'showCsvDownload' is set to true, you can define the CSV button position to 'top', 'bottom', 'left', 'right', 'both_row' or 'both_col' relative to the Grid.</td>
</tr>
<tr>
<td>showCsvDownloadAlignment</td><td>If 'showCsvDownload' is set to true, you can define the CSV button horizontal or vertical alignment to 'start', 'center' or 'end'.</td>
</tr>
<tr>
<td>localeText</td><td>Define the Grid localisation. You can provide: - { [key: string]: string } =&gt; A map of key-&gt;value pairs for localising text within the grid. - 'fr' or 'fr-FR' =&gt; A string representing the translation language (BCP47 Tag or Sub tag) The default language of the grid is American English.</td>
</tr>
<tr>
<td>customLocaleText</td><td>Add or surcharge Grid localisation. You have to provide: - { [key_lang: string]: { [key: string]: string } } =&gt; A map of key_lang-&gt;object pairs for adding or surcharging localising text within the grid. The default value is an empty object.</td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>CellClicked</td><td></td>
</tr>
<tr>
<td>RowClicked</td><td></td>
</tr>
<tr>
<td>RowSelected</td><td></td>
</tr>
<tr>
<td>SortChanged</td><td></td>
</tr>
<tr>
<td>RowDataChanged</td><td></td>
</tr>
<tr>
<td>RowValueChanged</td><td></td>
</tr>
<tr>
<td>RowDoubleClicked</td><td></td>
</tr>
<tr>
<td>SelectionChanged</td><td></td>
</tr>
<tr>
<td>GridReady</td><td></td>
</tr>
</table>


#### angularxQRCode

A QR Code Reader  using Full JS Algorithm

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>allowEmptyString</td><td><p>Allow qrdata to be an empty string</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>alt</td><td><p>HTML alt attribute (supported by img, url)</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>ariaLabel</td><td><p>HTML aria-label attribute (supported by canvas, img, url)</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>colordark</td><td><p>RGBA color, color of dark module (foreground)</p><p><b>Example:</b> 

```
&#x27;#000000&#x27;
```

</p></td>
</tr>
<tr>
<td>colorlight</td><td><p>RGBA color, color of light module (background)</p><p><b>Example:</b> 

```
&#x27;#FFFFFF&#x27;
```

</p></td>
</tr>
<tr>
<td>cssClass</td><td><p>CSS Class</p><p><b>Example:</b> 

```
&#x27;qrcode&#x27;
```

</p></td>
</tr>
<tr>
<td>elementType</td><td><p>&#x27;canvas&#x27;, &#x27;svg&#x27;, &#x27;img&#x27;, &#x27;url&#x27; (alias for &#x27;img&#x27;)</p><p><b>Example:</b> 

```
&#x27;canvas&#x27;
```

</p></td>
</tr>
<tr>
<td>errorCorrectionLevel</td><td><p>QR Correction level (&#x27;L&#x27;, &#x27;M&#x27;, &#x27;Q&#x27;, &#x27;H&#x27;)</p><p><b>Example:</b> 

```
&#x27;M&#x27;
```

</p></td>
</tr>
<tr>
<td>imageHeight</td><td><p>height of your image</p><p><b>Example:</b> 

```
256
```

</p></td>
</tr>
<tr>
<td>imageSrc</td><td><p>Link to your image</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>imageWidth</td><td><p>width of your image</p><p><b>Example:</b> 

```
256
```

</p></td>
</tr>
<tr>
<td>margin</td><td><p>Define how much wide the quiet zone should be.</p><p><b>Example:</b> 

```
4
```

</p></td>
</tr>
<tr>
<td>qrdata</td><td><p>String to encode</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>scale</td><td><p>Scale factor. A value of 1 means 1px per modules (black dots).</p><p><b>Example:</b> 

```
4
```

</p></td>
</tr>
<tr>
<td>title</td><td><p>HTML title attribute (supported by canvas, img, url)</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>version</td><td><p>1-40</p><p><b>Example:</b> 

```
&#x27;(auto)&#x27;
```

</p></td>
</tr>
<tr>
<td>width</td><td><p>Height/Width (any value)</p><p><b>Example:</b> 

```
10
```

</p></td>
</tr>
</table>

#### cardIO_sc

CardIO SharedComponent

#### cyGraph

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>autounselectify</td><td>Disables element selection when true</td>
</tr>
<tr>
<td>boxSelectionEnabled</td><td>Enables box selection mode</td>
</tr>
<tr>
<td>elements</td><td>Cytoscape elements array</td>
</tr>
<tr>
<td>height</td><td>Graph container height</td>
</tr>
<tr>
<td>id</td><td>Optional HTML id for the graph container</td>
</tr>
<tr>
<td>layout</td><td>Cytoscape layout object</td>
</tr>
<tr>
<td>maxZoom</td><td>Maximum zoom level</td>
</tr>
<tr>
<td>minZoom</td><td>Minimum zoom level</td>
</tr>
<tr>
<td>options</td><td>Additional Cytoscape options object</td>
</tr>
<tr>
<td>style</td><td>Cytoscape style array (leave empty to use theme-aware defaults)</td>
</tr>
<tr>
<td>userPanningEnabled</td><td>Allows user panning interactions</td>
</tr>
<tr>
<td>userZoomingEnabled</td><td>Allows user zoom interactions</td>
</tr>
<tr>
<td>wheelSensitivity</td><td>Mouse wheel zoom sensitivity</td>
</tr>
<tr>
<td>width</td><td>Graph container width</td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>BackgroundTap</td><td>Fired when graph background is tapped</td>
</tr>
<tr>
<td>CyReady</td><td>Fired when Cytoscape is initialized</td>
</tr>
<tr>
<td>EdgeTap</td><td>Fired when an edge is tapped</td>
</tr>
<tr>
<td>NodeTap</td><td>Fired when a node is tapped</td>
</tr>
</table>

#### DropZoneComponent

This component handles file trop an a Zone. It will fire a  FileDropped event with a Files object as data. The File dropped will be in the out[0]

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>Information</td><td><p>Information text displayed inside the drop zone</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>FilesDropped</td><td>Fired when file(s) are dropped on the drop zone. Data is the dropped files array.</td>
</tr>
</table>

#### frappeGantt

Shared component wrapping the Frappe Gantt chart library.
Pass tasks as an array or as a JSON string.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>dateFormat</td><td><p>Date format used by Frappe Gantt parser</p><p><b>Example:</b> 

```
&#x27;YYYY-MM-DD&#x27;
```

</p></td>
</tr>
<tr>
<td>height</td><td><p>Container height</p><p><b>Example:</b> 

```
&#x27;360px&#x27;
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>Optional HTML id for the gantt container</p><p><b>Example:</b> 

```
&#x27;my-gantt&#x27;
```

</p></td>
</tr>
<tr>
<td>options</td><td><p>Optional Frappe Gantt options object (object or JSON string)</p><p><b>Example:</b> 

```
{&quot;readonly&quot;:false,&quot;bar_height&quot;:24}
```

</p></td>
</tr>
<tr>
<td>tasks</td><td><p>Array of tasks accepted by Frappe Gantt (array or JSON string)</p><p><b>Example:</b> 

```
[{&quot;id&quot;:&quot;Task 1&quot;,&quot;name&quot;:&quot;Planning&quot;,&quot;start&quot;:&quot;2026-02-01&quot;,&quot;end&quot;:&quot;2026-02-04&quot;,&quot;progress&quot;:65}]
```

</p></td>
</tr>
<tr>
<td>viewMode</td><td><p>Default view mode for the chart</p><p><b>Example:</b> 

```
&#x27;Day&#x27;
```

</p></td>
</tr>
<tr>
<td>width</td><td><p>Container width</p><p><b>Example:</b> 

```
&#x27;100%&#x27;
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>DateChanged</td><td>Fired when a task date range changes.</td>
</tr>
<tr>
<td>ProgressChanged</td><td>Fired when a task progress changes.</td>
</tr>
<tr>
<td>TaskClicked</td><td>Fired when a task bar is clicked.</td>
</tr>
<tr>
<td>ViewChanged</td><td>Fired when the gantt view mode changes.</td>
</tr>
</table>

#### kanbanBoard

Shared component implementing a Kanban board powered by SortableJS.
Cards can be dragged across columns and columns can optionally be reordered.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>animation</td><td><p>Card drag animation duration in milliseconds.</p><p><b>Example:</b> 

```
180
```

</p></td>
</tr>
<tr>
<td>cardTitleKey</td><td><p>Property name used to display card labels when cards are objects.</p><p><b>Example:</b> 

```
&#x27;title&#x27;
```

</p></td>
</tr>
<tr>
<td>chosenClass</td><td><p>CSS class applied to the selected card.</p><p><b>Example:</b> 

```
&#x27;kanban-card-chosen&#x27;
```

</p></td>
</tr>
<tr>
<td>columnAnimation</td><td><p>Column drag animation duration in milliseconds.</p><p><b>Example:</b> 

```
180
```

</p></td>
</tr>
<tr>
<td>columnChosenClass</td><td><p>CSS class applied to the selected column.</p><p><b>Example:</b> 

```
&#x27;kanban-column-chosen&#x27;
```

</p></td>
</tr>
<tr>
<td>columnDragClass</td><td><p>CSS class applied while dragging a column.</p><p><b>Example:</b> 

```
&#x27;kanban-column-drag&#x27;
```

</p></td>
</tr>
<tr>
<td>columnGhostClass</td><td><p>CSS class applied to column ghost elements.</p><p><b>Example:</b> 

```
&#x27;kanban-column-ghost&#x27;
```

</p></td>
</tr>
<tr>
<td>columnHandle</td><td><p>CSS selector used as drag handle for columns.</p><p><b>Example:</b> 

```
&#x27;.kanban-column-header&#x27;
```

</p></td>
</tr>
<tr>
<td>columnOptions</td><td><p>Optional SortableJS options for column sorting (object or JSON string).</p><p><b>Example:</b> 

```
{&quot;delay&quot;:80}
```

</p></td>
</tr>
<tr>
<td>columns</td><td><p>Array of Kanban columns (array or JSON string).</p><p><b>Example:</b> 

```
[{&quot;id&quot;:&quot;todo&quot;,&quot;title&quot;:&quot;To Do&quot;,&quot;cards&quot;:[{&quot;id&quot;:&quot;c1&quot;,&quot;title&quot;:&quot;Prepare backlog&quot;}]}]
```

</p></td>
</tr>
<tr>
<td>columnSort</td><td><p>Allows column reordering when true.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>disabled</td><td><p>Disables drag and drop when true.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>dragClass</td><td><p>CSS class applied while dragging a card.</p><p><b>Example:</b> 

```
&#x27;kanban-card-drag&#x27;
```

</p></td>
</tr>
<tr>
<td>emptyColumnText</td><td><p>Placeholder text shown when a column has no cards.</p><p><b>Example:</b> 

```
&#x27;Drop cards here&#x27;
```

</p></td>
</tr>
<tr>
<td>ghostClass</td><td><p>CSS class applied to card ghost elements.</p><p><b>Example:</b> 

```
&#x27;kanban-card-ghost&#x27;
```

</p></td>
</tr>
<tr>
<td>groupName</td><td><p>SortableJS group name used between columns.</p><p><b>Example:</b> 

```
&#x27;kanban-board&#x27;
```

</p></td>
</tr>
<tr>
<td>handle</td><td><p>Optional CSS selector for dragging cards by handle.</p><p><b>Example:</b> 

```
&#x27;.card-handle&#x27;
```

</p></td>
</tr>
<tr>
<td>height</td><td><p>Container height.</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>Optional HTML id for the kanban host.</p><p><b>Example:</b> 

```
&#x27;my-kanban&#x27;
```

</p></td>
</tr>
<tr>
<td>options</td><td><p>Optional SortableJS options for cards (object or JSON string).</p><p><b>Example:</b> 

```
{&quot;swapThreshold&quot;:0.7}
```

</p></td>
</tr>
<tr>
<td>sort</td><td><p>Allows card sorting when true.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>width</td><td><p>Container width.</p><p><b>Example:</b> 

```
&#x27;100%&#x27;
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>BoardChanged</td><td>Fired when the board structure changes.</td>
</tr>
<tr>
<td>CardClicked</td><td>Fired when a card is clicked.</td>
</tr>
<tr>
<td>CardMoved</td><td>Fired when a card is moved between positions or columns.</td>
</tr>
<tr>
<td>ColumnClicked</td><td>Fired when a column header is clicked.</td>
</tr>
<tr>
<td>ColumnOrderChanged</td><td>Fired when columns are reordered.</td>
</tr>
</table>

#### materialDatePicker

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>buttonAriaLabel</td><td><p>Accessibility label applied to the datepicker toggle button</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>inputAriaLabel</td><td><p>Accessibility label applied to the date input</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>model</td><td><p>Date model bound to the input and emitted on change</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>

#### materialSlider

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ariaLabel</td><td><p>Accessibility label applied to the slider thumb input</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>Optional HTML id for the slider input</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>max</td><td><p>Maximum slider value</p><p><b>Example:</b> 

```
10
```

</p></td>
</tr>
<tr>
<td>min</td><td><p>Minimum slider value</p><p><b>Example:</b> 

```
0
```

</p></td>
</tr>
<tr>
<td>model</td><td><p>Current slider value bound to ngModel</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>showTickMarks</td><td><p>boolean: show or hide slider tick marks</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>showValue</td><td><p>boolean: display current value label near the thumb</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>step</td><td><p>Slider step increment</p><p><b>Example:</b> 

```
1
```

</p></td>
</tr>
<tr>
<td>tickLabelInterval</td><td><p>number: null (default) or an interval. When greater than 0, the values min, min + tickLabelInterval, min + 2 × tickLabelInterval... and max are written under the bar, each centered under its position, whatever the step. When the bar is too narrow for all of them, one value in 2, 3... is shown, the first and the last always. The values take the format of the value near the thumb (10000 and more in k). Empty, 0 or not a number: no values, the slider looks as before.</p><p><b>Example:</b> 

```
25
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ModelChange</td><td>Fired when the slider value changes. Data is the new numeric value.</td>
</tr>
</table>

#### ngSelect

Lightweight all in one UI Select, Multiselect and Autocomplete

Features :
- [x] Custom binding to property or object
- [x] Custom option, label, header and footer templates
- [x] Virtual Scroll support with large data sets (>5000 items).
- [x] Infinite scroll
- [x] Keyboard navigation
- [x] Multiselect
- [x] Flexible autocomplete with client/server filtering
- [x] Custom search
- [x] Custom tags
- [x] Append to
- [x] Group items
- [x] Output events
- [x] Accessibility
- [x] Good base functionality test coverage
- [x] Themes

For more informations see [documentation](https://www.npmjs.com/package/@ng-select/ng-select/v/12.0.7)

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>addTag</td><td><p>Allows to create custom options.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>addTagText</td><td><p>Set custom text when using tagging</p><p><b>Example:</b> 

```
&#x27;Add item&#x27;
```

</p></td>
</tr>
<tr>
<td>appearance</td><td><p>Allows to select dropdown appearance. Set to outline to add border instead of underline (applies only to Material theme)</p><p><b>Example:</b> 

```
&#x27;underline&#x27;
```

</p></td>
</tr>
<tr>
<td>appendTo</td><td><p>Append dropdown to body or any other element using css selector. For correct positioning body should have position:relative</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>bindLabel</td><td><p>Object property to use for label. Default label</p><p><b>Example:</b> 

```
&#x27;label&#x27;
```

</p></td>
</tr>
<tr>
<td>bindValue</td><td><p>Object property to use for selected model. By default binds to whole object.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>clearable</td><td><p>Allow to clear selected value. Default true</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>clearAllText</td><td><p>Set custom text for clear all icon title</p><p><b>Example:</b> 

```
&#x27;Clear all&#x27;
```

</p></td>
</tr>
<tr>
<td>clearOnBackspace</td><td><p>Clear selected values one by one when clicking backspace. Default true</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>clearSearchOnAdd</td><td><p>Clears search input when item is selected. Default true. Default false when closeOnSelect is false</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>closeOnSelect</td><td><p>Whether to close the menu when a value is selected</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>compareWith</td><td><p>A function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection(model). A boolean should be returned.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>deselectOnClick</td><td><p>Deselects a selected item when it is clicked in the dropdown. Default false. Default true when multiple is true</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>dropdownPosition</td><td><p>Set the dropdown position on open -- bottom | top | auto</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>editableSearchTerm</td><td><p>Allow to edit search query if option selected. Default false. Works only if multiple is false.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>groupBy</td><td><p>Allow to group items by key or function expression</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>groupValue</td><td><p>Function expression to provide group value</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>hideSelected</td><td><p>Allows to hide selected items.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>inputAttrs</td><td><p>Pass custom attributes to underlying input element</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>isOpen</td><td><p>Allows manual control of dropdown opening and closing. true - won&#x27;t close. false - won&#x27;t open.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>items</td><td><p>Items array</p><p><b>Example:</b> 

```
[]
```

</p></td>
</tr>
<tr>
<td>keyDownFn</td><td><p>Provide custom keyDown function. Executed before default handler. Return false to suppress execution of default key down handlers.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>labelForId</td><td><p>Id to associate control with label.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>loading</td><td><p>You can set the loading state from the outside (e.g. async items loading)</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>loadingText</td><td><p>Set custom text when for loading items</p><p><b>Example:</b> 

```
&#x27;Loading...&#x27;
```

</p></td>
</tr>
<tr>
<td>markFirst</td><td><p>Marks first item as focused when opening/filtering.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>maxSelectedItems</td><td><p>When multiple = true, allows to set a limit number of selection.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>minTermLength</td><td><p>Minimum term length to start a search. Should be used with typeahead</p><p><b>Example:</b> 

```
0
```

</p></td>
</tr>
<tr>
<td>model</td><td><p>Selected value(s) bound to ngModel (single value or array when multiple=true)</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>multiple</td><td><p>Allows to select multiple items.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>notFoundText</td><td><p>Set custom text when filter returns empty result</p><p><b>Example:</b> 

```
&#x27;No items found&#x27;
```

</p></td>
</tr>
<tr>
<td>openOnEnter</td><td><p>Open dropdown using enter. Default true</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>placeholder</td><td><p>Placeholder text.</p><p><b>Example:</b> 

```
&#x27;-&#x27;
```

</p></td>
</tr>
<tr>
<td>readonly</td><td><p>Set ng-select as readonly. Mostly used with reactive forms.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>searchable</td><td><p>Allow to search for value. Default true</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>searchFn</td><td><p>Allow to filter by custom search function</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>searchWhileComposing</td><td><p>Whether items should be filtered while composition started</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>selectableGroup</td><td><p>Allow to select group when groupBy is used</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>selectableGroupAsModel</td><td><p>Indicates whether to select all children or group itself</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>selectOnTab</td><td><p>Select marked dropdown item using tab. Default false</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>tabIndex</td><td><p>Set tabindex on ng-select</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>trackByFn</td><td><p>Provide custom trackBy function</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>typeahead</td><td><p>Custom autocomplete or advanced filter.</p><p><b>Example:</b> 

```
null
```

</p></td>
</tr>
<tr>
<td>typeToSearchText</td><td><p>Set custom text when using Typeahead</p><p><b>Example:</b> 

```
&#x27;Type to search&#x27;
```

</p></td>
</tr>
<tr>
<td>virtualScroll</td><td><p>Enable virtual scroll for better performance when rendering a lot of data</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>add</td><td>Fired when item is added while [multiple]="true". Outputs added item</td>
</tr>
<tr>
<td>blur</td><td>Fired on select blur</td>
</tr>
<tr>
<td>change</td><td>Fired on model change. Outputs whole model</td>
</tr>
<tr>
<td>clear</td><td>Fired on clear icon click</td>
</tr>
<tr>
<td>close</td><td>Fired on select dropdown close</td>
</tr>
<tr>
<td>focus</td><td>Fired on select focus</td>
</tr>
<tr>
<td>open</td><td>Fired on select dropdown open</td>
</tr>
<tr>
<td>remove</td><td>Fired when item is removed while [multiple]="true"</td>
</tr>
<tr>
<td>scroll</td><td>Fired when scrolled. Provides the start and end index of the currently available items. Can be used for loading more items in chunks before the user has scrolled all the way to the bottom of the list.</td>
</tr>
<tr>
<td>scrollToEnd</td><td>Fired when scrolled to the end of items. Can be used for loading more items in chunks.</td>
</tr>
<tr>
<td>search</td><td>Fired while typing search term. Outputs search term with filtered items</td>
</tr>
</table>

#### ngxTagInput

This component provides Chips management for your apps

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>addOnBlur</td><td></td>
</tr>
<tr>
<td>autocompleteItems</td><td></td>
</tr>
<tr>
<td>editableTag</td><td></td>
</tr>
<tr>
<td>formCtrl</td><td>Optional reactive form control (an Angular FormControl). When set, the tag input shows its value and writes each change to it (setValue and markAsDirty, markAsTouched when the input loses the focus) and is disabled when the control is, in place of the two-way binding on items.</td>
</tr>
<tr>
<td>inputtext</td><td></td>
</tr>
<tr>
<td>itemDisplayBy</td><td></td>
</tr>
<tr>
<td>itemIdentifyBy</td><td></td>
</tr>
<tr>
<td>items</td><td></td>
</tr>
<tr>
<td>maxItems</td><td></td>
</tr>
<tr>
<td>onlyFromAutocomplete</td><td></td>
</tr>
<tr>
<td>placeholder</td><td></td>
</tr>
<tr>
<td>removableTag</td><td></td>
</tr>
<tr>
<td>secondaryPlaceholder</td><td></td>
</tr>
<tr>
<td>showAutoCompleteDropdownIfEmpty</td><td></td>
</tr>
<tr>
<td>theme</td><td></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>Add</td><td></td>
</tr>
<tr>
<td>Blur</td><td></td>
</tr>
<tr>
<td>Focus</td><td></td>
</tr>
<tr>
<td>ModelChange</td><td></td>
</tr>
<tr>
<td>Paste</td><td></td>
</tr>
<tr>
<td>Remove</td><td></td>
</tr>
<tr>
<td>Select</td><td></td>
</tr>
<tr>
<td>TagEdited</td><td></td>
</tr>
<tr>
<td>TextChange</td><td></td>
</tr>
<tr>
<td>ValidationError</td><td></td>
</tr>
</table>

#### richTextPalette

A rich text editor (HugeRTE, through the tinyMce component) with a palette of variables, after the Description of C8Oforms: its menu bar and toolbar, and a palette like its data palette (a search field, groups that fold, with their icon and count, the variables with their icon, second line and type). A click on a variable, or a drag and drop into the text, writes it at that place. The variables are written in the HTML as {{ key }} placeholders, shown in the editor as chips. The variables input lists the variables of the application; default variables (date, signed-in user, language) are offered too. Light or dark as the page behind it (theme input). Typical use: bind html to a variable of the page and set that variable again from event.html in onChange; give the same html and variables to richTextPaletteViewer, which shows the text with the values of the variables (the editor never reads the values).

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>defaultVariables</td><td><p>boolean or array: the default variables of the palette. true (default): all of them (api.clock.today, api.clock.now, api.clock.time, api.clock.year, api.user.name, api.user.email, api.user.authenticatedUserID, api.user.groups, api.translate.currentLang). false: none. An array (or a comma-separated text) of keys: only these ones.</p><p><b>Example:</b> 

```
[&#x27;api.clock.today&#x27;, &#x27;api.user.name&#x27;, &#x27;api.user.email&#x27;]
```

</p></td>
</tr>
<tr>
<td>disabled</td><td><p>boolean: the editor is read only and the palette inserts nothing.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>groups</td><td><p>array or object: the icon of a group of the palette, and whether it starts folded. An array of { name, icon, open }, or an object { name: icon } or { name: { icon, open } }. name: the group of the variables. icon: as the icon of a variable. open: false folds the group at the start. A group without an icon gets a folder; the default groups keep theirs.</p><p><b>Example:</b> 

```
{&#x27;Customer&#x27;: &#x27;person-outline&#x27;, &#x27;Order&#x27;: {icon: &#x27;cart-outline&#x27;, open: false}}
```

</p></td>
</tr>
<tr>
<td>height</td><td><p>number or string: the height of the editor (pixels or a CSS length).</p><p><b>Example:</b> 

```
400
```

</p></td>
</tr>
<tr>
<td>html</td><td><p>string: the HTML of the text, its variables written as {{ key }} placeholders. Loaded into the editor at its start and each time the page gives another HTML than the one onChange last gave. A placeholder of a key the palette does not have stays as written.</p><p><b>Example:</b> 

```
&#x27;&lt;p&gt;Hello {{ customer.name }}&lt;/p&gt;&#x27;
```

</p></td>
</tr>
<tr>
<td>init</td><td><p>object: options of HugeRTE over the ones of the component, which are those of the Description of C8Oforms (menu bar, toolbar, plugins, quick toolbar on a selection), the oxide or oxide-dark skin and the default or dark content for the theme, the height and placeholder inputs and the language of the application. Read when the editor starts. Its content_style is added to the style of the text and the chips; its setup runs after the one of the component.</p><p><b>Example:</b> 

```
{menubar: false, toolbar: &#x27;undo redo | bold italic | bullist numlist&#x27;, plugins: &#x27;lists&#x27;}
```

</p></td>
</tr>
<tr>
<td>paletteHint</td><td><p>string: the help text at the foot of the palette, where the variable under the pointer is described; false hides the foot.</p><p><b>Example:</b> 

```
&#x27;Click a variable or drag it into the text.&#x27;
```

</p></td>
</tr>
<tr>
<td>palettePosition</td><td><p>string: where the palette stands: 'end' (default, after the editor, as in C8Oforms), 'start' (before it), 'top', 'bottom', or 'none' (no palette: the placeholders of the HTML are still shown as chips). Beside the editor, the palette is as high as the editor and about 28% of the window wide (320 to 520 pixels, at most half of the component); under 720 pixels of width, it goes above the editor.</p><p><b>Example:</b> 

```
&#x27;end&#x27;
```

</p></td>
</tr>
<tr>
<td>paletteSearch</td><td><p>boolean or string: the search field of the palette (it filters the variables by label, key and group): 'auto' (default, shown from 9 variables on), true or false.</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>paletteTexts</td><td><p>object: the other texts of the palette: empty (shown when the search finds no variable), foldAll and unfoldAll (the button beside the search field).</p><p><b>Example:</b> 

```
{empty: &#x27;Aucune variable trouvée.&#x27;, foldAll: &#x27;Tout replier&#x27;, unfoldAll: &#x27;Tout déplier&#x27;}
```

</p></td>
</tr>
<tr>
<td>paletteTitle</td><td><p>string: the title of the palette.</p><p><b>Example:</b> 

```
&#x27;Variables&#x27;
```

</p></td>
</tr>
<tr>
<td>placeholder</td><td><p>string: the text the editor shows while it is empty.</p><p><b>Example:</b> 

```
&#x27;Write your text here&#x27;
```

</p></td>
</tr>
<tr>
<td>searchPlaceholder</td><td><p>string: the placeholder of the search field of the palette.</p><p><b>Example:</b> 

```
&#x27;Search&#x27;
```

</p></td>
</tr>
<tr>
<td>theme</td><td><p>string: the theme of the editor and its palette: 'auto' (default: light or dark as the page behind the component, read again when the page changes its theme), 'light' or 'dark'. Dark, the colors come from the Ionic colors of the application (--ion-card-background, --ion-text-color, --ion-border-color, --ion-color-primary). A change of theme starts the editor again, with its text.</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>variables</td><td><p>array or object: the variables of the application, listed first in the palette. An array of { key, label, group, description, icon, type, value } (a string is a key), or an object { key: value }. key: the name written in the placeholder (letters, digits, dots, spaces; no brace, angle bracket, quote, backslash nor ampersand). label: the text of the palette and of the chip (default: the key). group: the title of its group in the palette. description: its second line in the palette. icon: the name of an Ionicons icon of the application ('person-outline'), the URL of an SVG file, or an icon of the palette ('lucide:calendar'); drawn in the color of the text. type: the badge on its right ('Text', 'Date'...). value: a value, or a function returning it, read by richTextPaletteViewer. A variable with the key of a default variable replaces its label, group, description, icon, type or value.</p><p><b>Example:</b> 

```
[{key: &#x27;customer.name&#x27;, label: &#x27;Customer name&#x27;, group: &#x27;Customer&#x27;, icon: &#x27;person-outline&#x27;, type: &#x27;Text&#x27;, value: this.local.customer?.name}, {key: &#x27;order.total&#x27;, label: &#x27;Order total&#x27;, group: &#x27;Order&#x27;, description: &#x27;Taxes included&#x27;, value: () =&gt; this.local.total + &#x27; EUR&#x27;}, {key: &#x27;api.user.name&#x27;, label: &#x27;Author&#x27;}]
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>onBlur</td><td>Fired when the editor loses the focus, after onChange when the text changed. Data: { html, variables }.</td>
</tr>
<tr>
<td>onChange</td><td>Fired when the text changes (250 ms after the last keystroke, at once for a variable inserted). Data: { html, variables }: the HTML with its {{ key }} placeholders, and the keys of the placeholders it holds. htmlChange gives the same HTML (two-way binding of html).</td>
</tr>
<tr>
<td>onReady</td><td>Fired when the editor has started and loaded its text, and again when a change of theme has started a new editor. Data: { editor }: the HugeRTE editor.</td>
</tr>
</table>

#### richTextPaletteViewer

Shows an HTML text written with richTextPalette: its {{ key }} placeholders replaced by the values of their variables (as text), then the HTML sanitized by DOMPurify (no script, event handler, javascript: URL, frame, form; the inline styles stay). Typical use: html and variables are the ones given to richTextPalette (the labels and groups are not needed here); userName and userEmail give the name and the e-mail of the signed-in user when the application knows them.

On the server (an e-mail or a PDF made by a sequence, with values read from a database), there is no viewer: call the sequence RichTextPaletteMerge of this library as a sub-sequence, with html and values (a JSON object { key: value }); it applies the rules below. Or replace the placeholders yourself with the regular expression of the viewer, for example in a JavaScript step:

```js
// html: the text saved from richTextPalette; customerName, orderTotal: read from the database by the steps before
function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var values = { "customer.name": customerName, "order.total": orderTotal };
var result = String(html).replace(/\{\{([^{}<>]*?)\}\}(?![^<]*>)/g, function (all, raw) {
  var key = raw.replace(/&nbsp;|&#160;|&#xa0;|\u00a0/gi, " ").replace(/\s+/g, " ").trim();
  var value = values[key];
  return value != null ? escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>") : all;
});
```

As in the viewer: the key is cleaned (an editor may write no-break spaces in it); the value is escaped, so a value holding HTML stays text, and its line breaks become `<br>`; a placeholder in a tag (an attribute) or with a key that has no value stays as written. The `event.variables` of onChange in richTextPalette lists the keys the text holds: save them with the html to read only these values. Give their values to the default variables the text may hold too (`api.clock.today`, `api.user.name`...). There is no DOMPurify on the server: sanitize the HTML there too when its authors are not trusted and it is shown in a browser.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>defaultVariables</td><td><p>boolean or array: the default variables, as for richTextPalette. true (default): all of them; false: none; an array of keys: only these ones.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>html</td><td><p>string: the HTML to show, its variables written as {{ key }} placeholders (the html of richTextPalette). A placeholder in a tag (an attribute), or of a key no variable has, stays as written.</p><p><b>Example:</b> 

```
this.local.text
```

</p></td>
</tr>
<tr>
<td>userEmail</td><td><p>string: the value of {{ api.user.email }}. While empty, the ID of the user signed in to the Convertigo session when it is an e-mail address, else empty.</p><p><b>Example:</b> 

```
this.local.user?.mail
```

</p></td>
</tr>
<tr>
<td>userName</td><td><p>string: the value of {{ api.user.name }}. While empty, the ID of the user signed in to the Convertigo session.</p><p><b>Example:</b> 

```
this.local.user?.displayName
```

</p></td>
</tr>
<tr>
<td>variables</td><td><p>array or object: the variables, as for richTextPalette. A value is a value or a function returning it, read at each change detection; it is written as text (escaped, its line breaks kept), a date in the language of the application, an array as its values joined by commas.</p><p><b>Example:</b> 

```
[{key: &#x27;customer.name&#x27;, value: this.local.customer?.name}, {key: &#x27;order.total&#x27;, value: () =&gt; this.local.total}]
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>onRender</td><td>Fired when the HTML shown changes. Data: { html }: the sanitized HTML with the values of its variables.</td>
</tr>
</table>

#### sortableJS

Shared component wrapping SortableJS for drag-and-drop list ordering.
Pass items as an array or as a JSON string.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>animation</td><td><p>Animation duration in milliseconds.</p><p><b>Example:</b> 

```
180
```

</p></td>
</tr>
<tr>
<td>chosenClass</td><td><p>CSS class applied to the chosen element.</p><p><b>Example:</b> 

```
&#x27;sortablejs-chosen&#x27;
```

</p></td>
</tr>
<tr>
<td>disabled</td><td><p>Disables drag and drop when true.</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>dragClass</td><td><p>CSS class applied while dragging.</p><p><b>Example:</b> 

```
&#x27;sortablejs-drag&#x27;
```

</p></td>
</tr>
<tr>
<td>emitItemsOnChange</td><td><p>Emits 

```
ItemsChanged
```

 after each drop event when true.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>emptyText</td><td><p>Placeholder text when the list is empty.</p><p><b>Example:</b> 

```
&#x27;Drop items here&#x27;
```

</p></td>
</tr>
<tr>
<td>ghostClass</td><td><p>CSS class applied to the ghost element.</p><p><b>Example:</b> 

```
&#x27;sortablejs-ghost&#x27;
```

</p></td>
</tr>
<tr>
<td>handle</td><td><p>Optional CSS selector for drag handles.</p><p><b>Example:</b> 

```
&#x27;.drag-handle&#x27;
```

</p></td>
</tr>
<tr>
<td>height</td><td><p>Container height.</p><p><b>Example:</b> 

```
&#x27;auto&#x27;
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>Optional HTML id for the sortable container.</p><p><b>Example:</b> 

```
&#x27;my-sortable&#x27;
```

</p></td>
</tr>
<tr>
<td>items</td><td><p>Array of draggable items (array or JSON string).</p><p><b>Example:</b> 

```
[{&quot;label&quot;:&quot;Backlog&quot;},{&quot;label&quot;:&quot;In Progress&quot;},{&quot;label&quot;:&quot;Done&quot;}]
```

</p></td>
</tr>
<tr>
<td>options</td><td><p>Optional SortableJS options object (object or JSON string).</p><p><b>Example:</b> 

```
{&quot;swapThreshold&quot;:0.65}
```

</p></td>
</tr>
<tr>
<td>sort</td><td><p>Allows sorting when true.</p><p><b>Example:</b> 

```
true
```

</p></td>
</tr>
<tr>
<td>width</td><td><p>Container width.</p><p><b>Example:</b> 

```
&#x27;100%&#x27;
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>DragEnded</td><td>Fired when a drag operation ends.</td>
</tr>
<tr>
<td>DragStarted</td><td>Fired when a drag operation starts.</td>
</tr>
<tr>
<td>ItemClicked</td><td>Fired when an item is clicked.</td>
</tr>
<tr>
<td>ItemsChanged</td><td>Fired with the reordered items array.</td>
</tr>
<tr>
<td>OrderChanged</td><td>Fired when the list order changes.</td>
</tr>
</table>

#### tinyMce

This is the HugeRTE WYSIWIG HTML editor you can use to provide rich text editing in your apps

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>apiKey</td><td><p>Tiny Cloud API key (optional when using local assets)</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>cloudChannel</td><td><p>Tiny Cloud channel version (used when loading cloud resources)</p><p><b>Example:</b> 

```
&#x27;5-dev&#x27;
```

</p></td>
</tr>
<tr>
<td>disabled</td><td><p>boolean: disable or enable editor interactions</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>id</td><td><p>Optional HTML id applied to the editor element</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>init</td><td><p>TinyMCE init configuration object</p><p><b>Example:</b> 

```
{}
```

</p></td>
</tr>
<tr>
<td>initialValue</td><td><p>Initial editor content when ngModel is null</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>inline</td><td><p>boolean: use TinyMCE inline mode</p><p><b>Example:</b> 

```
false
```

</p></td>
</tr>
<tr>
<td>model</td><td><p>HTML content bound to the editor ngModel</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>plugins</td><td><p>List of TinyMCE plugins to load</p><p><b>Example:</b> 

```
[&#x27;advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code hel...
```

</p></td>
</tr>
<tr>
<td>tagName</td><td><p>HTML tag name used as editor root element in inline mode</p><p><b>Example:</b> 

```
&#x27;div&#x27;
```

</p></td>
</tr>
<tr>
<td>toolbar</td><td><p>TinyMCE toolbar configuration string</p><p><b>Example:</b> 

```
&#x27;undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | rem...
```

</p></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>onBlur</td><td>Fired when the editor loses focus.</td>
</tr>
</table>

#### tuiImageEditor

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>cssMaxHeight</td><td><p>Maximum editor canvas height in pixels</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>cssMaxWidth</td><td><p>Maximum editor canvas width in pixels</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName3</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName4</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName5</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName6</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName7</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName8</td><td><p>Reserved variable not used by the current component implementation</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imageName</td><td><p>Source image display name shown in the editor UI</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
<tr>
<td>imagePath</td><td><p>Source image path or data URL loaded by the editor</p><p><b>Example:</b> 

```
n/a
```

</p></td>
</tr>
</table>



