


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
<td>getLocaleText</td><td><p>Variable get Locale Text.</p><p><b>Example:</b> 

```
null
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
<td>rowData</td><td><p>Array of row { fieldName1: &#x27;value1&#x27;, fieldName2: &#x27;value2&#x27;, fieldName3: true, ...} objects</p><p><b>Example:</b> 

```
[{ make: &#x27;Toyota&#x27;, model: &#x27;Celica&#x27;, price: 35000 },{ make: &#x27;Ford&#x27;, model: &#x27;Mondeo&#x27;, price: 32000 },{ make: &#x27;Porsche&#x27;, model: &#x27;Boxter&#x27;, pr...
```

</p></td>
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
<td>suppressRowClickSelection</td><td><p>Variable suppress Row Click Selection.</p><p><b>Example:</b> 

```
false
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



