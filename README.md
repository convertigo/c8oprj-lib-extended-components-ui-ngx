


# lib_ExtendedComponents_ui_ngx

Set of shared components you can use in your projects :

- Grid : Display & Edit tabular data
- Chips : display / remove tags in input fields




For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Mobile Library](#mobile-library)
    - [Shared Actions](#shared-actions)
        - [agGridUpdateRows](#aggridupdaterows)
        - [cardIO_sa](#cardio_sa)
        - [ZXing_sa](#zxing_sa)
    - [Shared Components](#shared-components)
        - [agGrid](#aggrid)
        - [agGrid_CsvDownload](#aggrid_csvdownload)
        - [agGrid_CsvDownload_Row](#aggrid_csvdownload_row)
        - [angularxQRCode](#angularxqrcode)
        - [cardIO_sc](#cardio_sc)
        - [DropZoneComponent](#dropzonecomponent)
        - [materialDatePicker](#materialdatepicker)
        - [materialSlider](#materialslider)
        - [ngSelect](#ngselect)
        - [ngxTagInput](#ngxtaginput)
        - [tinyMce](#tinymce)


## Installation

1. In your Convertigo Studio click on ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/icons/studio/project_import.gif?raw=true "Import a project in treeview") to import a project in the treeview
2. In the import wizard

   ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/tomcat/webapps/convertigo/templates/ftl/project_import_wzd.png?raw=true "Import Project")
   
   paste the text below into the `Project remote URL` field:
   <table>
     <tr><td>Usage</td><td>Click the copy button at the end of the line</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_ExtendedComponents_ui_ngx=git@github.com:convertigo/c8oprj-lib-extended-components-ui-ngx.git:branch=8.3.0.0
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_ExtendedComponents_ui_ngx=git@github.com:convertigo/c8oprj-lib-extended-components-ui-ngx/archive/8.3.0.0.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_ExtendedComponents_ui_ngx__ project


## Mobile Library

Describes the mobile application global properties

### Shared Actions

#### agGridUpdateRows

agGrid Update Rows, must be called in a GetRows Control

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>agGridEvent</td><td>map agGridEvent to the TS 'event' parameter from the GetRows Control</td>
</tr>
<tr>
<td>data</td><td>data must receive a JSON with a RowData key and an optional ColDef key</td>
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
<td>ccard_topic</td><td>Publish Topic name to use with a Subscribe component. Optional</td>
</tr>
<tr>
<td>ccn</td><td>Input tag identifier to set Card Number value to. Optional</td>
</tr>
<tr>
<td>cexp</td><td>Input tag identifier to set Expiry date value (MM/YY) to. Optional</td>
</tr>
<tr>
<td>cvv</td><td>Input tag identifier to set cryptogram value (123) to. Optional</td>
</tr>
<tr>
<td>local_ccard_suffix</td><td>Suffix for local page variable in case of multiple CardIO plugin instances. Default: ''. Optional</td>
</tr>
<tr>
<td>options</td><td>CardIO plugin options. See https://github.com/card-io/card.io-Cordova-Plugin</td>
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
<td>file</td><td>File object as Array (if not provided from an input type file).</td>
</tr>
<tr>
<td>imgId</td><td>Img tag identifier to output image file. Optional</td>
</tr>
<tr>
<td>isOutputEvent</td><td>Publish scan result or not to the topic event. Default: true.</td>
</tr>
<tr>
<td>isOutputGlobal</td><td>Insert or not the scan result in a global page variable. The variable is composed of 'zxing:' + topic + ref variables. Default: true.</td>
</tr>
<tr>
<td>ref</td><td>In case of multiple ZXing package instances, set the variable to different values to distinguish the Publish data event and/or the local page variable. Default: ''. Optional</td>
</tr>
<tr>
<td>resultId</td><td>Input tag identifier to set value to. Optional</td>
</tr>
<tr>
<td>topic</td><td>Publish Topic name to use with a Subscribe component. Optional</td>
</tr>
<tr>
<td>type</td><td>Scan from file or video. Default: 'file'</td>
</tr>
<tr>
<td>videoId</td><td>Video tag identifier to output video camera. Default: 'video'. Optional</td>
</tr>
</table>

### Shared Components

#### agGrid

This Shared component wraps the ag-grid component. Most of the properties and events are supported. Please see https://www.ag-grid.com/ for more details.


**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>accessibility</td><td>boolean: true (default) or false</td>
</tr>
<tr>
<td>ariaLabel</td><td></td>
</tr>
<tr>
<td>autoSizeColumns</td><td></td>
</tr>
<tr>
<td>class</td><td>One of the themes provided here :

https://www.ag-grid.com/javascript-grid-themes-provided/

Also be shure to add the theme in the Theme object as :

@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark/sass/ag-theme-balham-dark.scss";



</td>
</tr>
<tr>
<td>columnDefs</td><td>Array of columnDef {headerName: 'headerName', field: 'fieldName'} objects</td>
</tr>
<tr>
<td>customLocaleText</td><td>Add or surcharge Grid localisation.
You have to provide:

 - { [key_lang: string]: { [key: string]: string } } => A map of key_lang->object pairs for adding or surcharging localising text within the grid.

The default value is an empty object.</td>
</tr>
<tr>
<td>defaultColDef</td><td>default is {hide: false, editable: true, sortable: true, resizable: true, filter: true, checkboxSelection: false, singleClickEdit: false}</td>
</tr>
<tr>
<td>height</td><td>height is 'auto' or value in % or px</td>
</tr>
<tr>
<td>id</td><td>An Optional ID</td>
</tr>
<tr>
<td>localeText</td><td>Define the Grid localisation.
You can provide:

 - { [key: string]: string } => A map of key->value pairs for localising text within the grid.
 - 'fr' or 'fr-FR' => A string representing the translation language (BCP47 Tag or Sub tag)

The default language of the grid is American English.</td>
</tr>
<tr>
<td>maxBlocksInCache</td><td>How many blocks to keep in the store. Default is no limit, so every requested block is kept</td>
</tr>
<tr>
<td>overlayLoadingTemplate</td><td></td>
</tr>
<tr>
<td>overlayNoRowsTemplate</td><td></td>
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
<td>rowData</td><td>Array of row { fieldName1: 'value1', fieldName2: 'value2', fieldName3: true, ...} objects</td>
</tr>
<tr>
<td>rowDeselection</td><td>boolean: true (default) or false</td>
</tr>
<tr>
<td>rowHeight</td><td>Height of the row in pixels as a string</td>
</tr>
<tr>
<td>rowModelType</td><td>Row model type</td>
</tr>
<tr>
<td>rowSelection</td><td>string: 'single' (default) or 'multiple'</td>
</tr>
<tr>
<td>showCsvDownload</td><td>If set to true will display a side bar menu where user can click a download button to download the grid content as a CSV file.
</td>
</tr>
<tr>
<td>showCsvDownloadAlignment</td><td>If 'showCsvDownload' is set to true, you can define the CSV button horizontal or vertical alignment to 'start', 'center' or 'end'.
</td>
</tr>
<tr>
<td>showCsvDownloadPosition</td><td>If 'showCsvDownload' is set to true, you can define the CSV button position to 'top', 'bottom', 'left', 'right', 'both_row' or 'both_col' relative to the Grid. 
</td>
</tr>
<tr>
<td>suppressCellSelection</td><td></td>
</tr>
<tr>
<td>suppressRowClickSelection</td><td></td>
</tr>
<tr>
<td>width</td><td>width value in % or px</td>
</tr>
<tr>
<td>wrapperClass</td><td>Height of the row in pixels as a string</td>
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
<td>GetRows</td><td>Fire when the RowModelType is 'infinite'. Excepts fromatted data into a agGridUpdateRows action</td>
</tr>
<tr>
<td>GridReady</td><td>Fired when the Grid is ready. Data will be the agGrid event</td>
</tr>
<tr>
<td>RowClicked</td><td>Fired when a row is clicked. Data will be the agGrid event</td>
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

#### agGrid_CsvDownload

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ag_grid</td><td></td>
</tr>
</table>

#### agGrid_CsvDownload_Row

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ag_grid</td><td></td>
</tr>
<tr>
<td>alignment</td><td></td>
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
<td>allowEmptyString</td><td>Allow qrdata to be an empty string</td>
</tr>
<tr>
<td>alt</td><td>HTML alt attribute (supported by img, url)</td>
</tr>
<tr>
<td>ariaLabel</td><td>HTML aria-label attribute (supported by canvas, img, url)</td>
</tr>
<tr>
<td>colordark</td><td>RGBA color, color of dark module (foreground)</td>
</tr>
<tr>
<td>colorlight</td><td>RGBA color, color of light module (background)</td>
</tr>
<tr>
<td>cssClass</td><td>CSS Class</td>
</tr>
<tr>
<td>elementType</td><td>'canvas', 'svg', 'img', 'url' (alias for 'img')</td>
</tr>
<tr>
<td>errorCorrectionLevel</td><td>QR Correction level ('L', 'M', 'Q', 'H')</td>
</tr>
<tr>
<td>imageHeight</td><td>height of your image</td>
</tr>
<tr>
<td>imageSrc</td><td>Link to your image</td>
</tr>
<tr>
<td>imageWidth</td><td>width of your image</td>
</tr>
<tr>
<td>margin</td><td>Define how much wide the quiet zone should be.</td>
</tr>
<tr>
<td>qrdata</td><td>String to encode</td>
</tr>
<tr>
<td>scale</td><td>Scale factor. A value of 1 means 1px per modules (black dots).</td>
</tr>
<tr>
<td>title</td><td>HTML title attribute (supported by canvas, img, url)</td>
</tr>
<tr>
<td>version</td><td>1-40</td>
</tr>
<tr>
<td>width</td><td>Height/Width (any value)</td>
</tr>
</table>

#### cardIO_sc

CardIO SharedComponent

#### DropZoneComponent

This component handles file trop an a Zone. It will fire a  FileDropped event with a Files object as data. The File dropped will be in the out[0]

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>Information</td><td></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>FilesDropped</td><td></td>
</tr>
</table>

#### materialDatePicker

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>buttonAriaLabel</td><td></td>
</tr>
<tr>
<td>inputAriaLabel</td><td></td>
</tr>
<tr>
<td>model</td><td></td>
</tr>
</table>

#### materialSlider

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>ariaLabel</td><td></td>
</tr>
<tr>
<td>id</td><td></td>
</tr>
<tr>
<td>max</td><td></td>
</tr>
<tr>
<td>min</td><td></td>
</tr>
<tr>
<td>model</td><td></td>
</tr>
<tr>
<td>step</td><td></td>
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
<td>addTag</td><td>Allows to create custom options.</td>
</tr>
<tr>
<td>addTagText</td><td>Set custom text when using tagging</td>
</tr>
<tr>
<td>appearance</td><td>Allows to select dropdown appearance. Set to outline to add border instead of underline (applies only to Material theme)</td>
</tr>
<tr>
<td>appendTo</td><td>Append dropdown to body or any other element using css selector. For correct positioning body should have position:relative</td>
</tr>
<tr>
<td>bindLabel</td><td>Object property to use for label. Default label</td>
</tr>
<tr>
<td>bindValue</td><td>Object property to use for selected model. By default binds to whole object.</td>
</tr>
<tr>
<td>clearable</td><td>Allow to clear selected value. Default true</td>
</tr>
<tr>
<td>clearAllText</td><td>Set custom text for clear all icon title</td>
</tr>
<tr>
<td>clearOnBackspace</td><td>Clear selected values one by one when clicking backspace. Default true</td>
</tr>
<tr>
<td>clearSearchOnAdd</td><td>Clears search input when item is selected. Default true. Default false when closeOnSelect is false</td>
</tr>
<tr>
<td>closeOnSelect</td><td>Whether to close the menu when a value is selected</td>
</tr>
<tr>
<td>compareWith</td><td>A function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection(model). A boolean should be returned.</td>
</tr>
<tr>
<td>deselectOnClick</td><td>Deselects a selected item when it is clicked in the dropdown. Default false. Default true when multiple is true</td>
</tr>
<tr>
<td>dropdownPosition</td><td>Set the dropdown position on open -- bottom | top | auto</td>
</tr>
<tr>
<td>editableSearchTerm</td><td>Allow to edit search query if option selected. Default false. Works only if multiple is false.</td>
</tr>
<tr>
<td>groupBy</td><td>Allow to group items by key or function expression</td>
</tr>
<tr>
<td>groupValue</td><td>Function expression to provide group value</td>
</tr>
<tr>
<td>hideSelected</td><td>Allows to hide selected items.</td>
</tr>
<tr>
<td>inputAttrs</td><td>Pass custom attributes to underlying input element</td>
</tr>
<tr>
<td>isOpen</td><td>Allows manual control of dropdown opening and closing. true - won't close. false - won't open.</td>
</tr>
<tr>
<td>items</td><td>Items array</td>
</tr>
<tr>
<td>keyDownFn</td><td>Provide custom keyDown function. Executed before default handler. Return false to suppress execution of default key down handlers.</td>
</tr>
<tr>
<td>labelForId</td><td>Id to associate control with label.</td>
</tr>
<tr>
<td>loading</td><td>You can set the loading state from the outside (e.g. async items loading)</td>
</tr>
<tr>
<td>loadingText</td><td>Set custom text when for loading items</td>
</tr>
<tr>
<td>markFirst</td><td>Marks first item as focused when opening/filtering.</td>
</tr>
<tr>
<td>maxSelectedItems</td><td>When multiple = true, allows to set a limit number of selection.</td>
</tr>
<tr>
<td>minTermLength</td><td>Minimum term length to start a search. Should be used with typeahead</td>
</tr>
<tr>
<td>multiple</td><td>Allows to select multiple items.</td>
</tr>
<tr>
<td>notFoundText</td><td>Set custom text when filter returns empty result</td>
</tr>
<tr>
<td>openOnEnter</td><td>Open dropdown using enter. Default true</td>
</tr>
<tr>
<td>placeholder</td><td>Placeholder text.</td>
</tr>
<tr>
<td>readonly</td><td>Set ng-select as readonly. Mostly used with reactive forms.</td>
</tr>
<tr>
<td>searchable</td><td>Allow to search for value. Default true</td>
</tr>
<tr>
<td>searchFn</td><td>Allow to filter by custom search function</td>
</tr>
<tr>
<td>searchWhileComposing</td><td>Whether items should be filtered while composition started</td>
</tr>
<tr>
<td>selectableGroup</td><td>Allow to select group when groupBy is used</td>
</tr>
<tr>
<td>selectableGroupAsModel</td><td>Indicates whether to select all children or group itself</td>
</tr>
<tr>
<td>selectOnTab</td><td>Select marked dropdown item using tab. Default false</td>
</tr>
<tr>
<td>tabIndex</td><td>Set tabindex on ng-select</td>
</tr>
<tr>
<td>trackByFn</td><td>Provide custom trackBy function</td>
</tr>
<tr>
<td>typeahead</td><td>Custom autocomplete or advanced filter.</td>
</tr>
<tr>
<td>typeToSearchText</td><td>Set custom text when using Typeahead</td>
</tr>
<tr>
<td>virtualScroll</td><td>Enable virtual scroll for better performance when rendering a lot of data</td>
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

#### tinyMce

This is the TinyMCE WYSIWIG HTML editor you can use to provide rich text editing in your apps

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>apiKey</td><td></td>
</tr>
<tr>
<td>cloudChannel</td><td></td>
</tr>
<tr>
<td>disabled</td><td></td>
</tr>
<tr>
<td>id</td><td></td>
</tr>
<tr>
<td>init</td><td></td>
</tr>
<tr>
<td>initialValue</td><td></td>
</tr>
<tr>
<td>inline</td><td></td>
</tr>
<tr>
<td>model</td><td></td>
</tr>
<tr>
<td>plugins</td><td></td>
</tr>
<tr>
<td>tagName</td><td></td>
</tr>
<tr>
<td>toolbar</td><td></td>
</tr>
</table>

**events**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>onBlur</td><td></td>
</tr>
</table>



