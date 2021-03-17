# lib_ExtendedComponents_ui_ngx

Set of shared components you can use in your projects:
    
* [agGrid](#aggrid) : Display & Edit tabular data
* [ngxTagInput](#ngxtaginput) : Display / remove Chips tags in input fields
* [angularxQRCode](angularxqrcode) : QR Code component/module library to generate QR Codes (Quick Response)
* [CardIO](#cardio) : Cordova plugin to scan Credit Card
* [ZXing](#zxing) : Library to scan barcodes
* [tinyMCE](#tinymce) : Rich text editor

SharedComponent can be dropped (CTRL + mouse drag) in Mobile Builder page components to make use of it.

## agGrid

The **agGrid** SharedComponent is based on **ag-grid-community** and **ag-grid-angular** NPM packages.\
Visit [Angular Grid](https://www.ag-grid.com/angular-grid/) for documentation and usage.\
See it in action in **testAgGrid1** and **testAgGrid2** Mobile Builder pages.

![agGrid screenshot 1](./doc/images/ConvertigoStudio_agGrid.png)

## ngxTagInput

The **ngxTagInput** SharedComponent is based on **ngx-chips** NPM package.\
Visit [Tag Input Component](https://github.com/Gbuomprisco/ngx-chips/#readme) for documentation and usage.\
See it in action in **testNgxInput** and **testNgxInput1** Mobile Builder pages.

![ngxTagInput screenshot 1](./doc/images/ConvertigoStudio_ngxTagInput.png)

## angularxQRCode

**angularxQRCode** shared component is base on **angularx-qrcode** package version 2.3.5\
**angularx-qrcode** is a Ionic 5 and Angular9+ QR Code component/module library to generate QR Codes (Quick Response) in your Ionic and Angular 9+ app with support for AOT. It is a drop-in replacement for the no-longer-maintained angular2 component ng2-qrcode and based on qrcodejs.

### Parameters

| Attribute        | Type           | Default | Description  |
| ------------- |-------------| -----|------------|
| allowEmptyString      | Boolean | false     | Allow empty string |
| colorlight      | String | '#ffffff'     | Dark color |
| colordark      | String | '#000000'     | Light Color |
| level | String | 'M'    | QR Correction level ('L', 'M', 'Q', 'H') |
| qrdata      | String | '' | String to encode |
| size      | Number | 256     | Height / Width (any value) |
| usesvg      | Boolean | false     | SVG Output |

## CardIO

This Cordova plug-in exposes card&#46;io credit card scanning.

The Mobile Builder **CardIO** page demonstrates the use of the plugin.

**cardIO_sc**: SharedComponent component for sample UI.

**cardIO_sa**: SharedAction component to launch credit card recognition process.

 - **Variables**
   - **ccn**: Input tag identifier to set Card Number value to. Optional
   - **cvv**: Input tag identifier to set cryptogram value (123) to. Optional
   - **cexp**: Input tag identifier to set Expiry date value (MM/YY) to. Optional
   - **options**: CardIO plugin options. See https://github.com/card-io/card.io-Cordova-Plugin
   - **local_ccard_suffix**: Suffix for local page variable in case of multiple CardIO plugin instances. Default: ''. Optional
   - **ccard_topic**: Publish Topic name to use with a Subscribe component. Optional

 - **Outputs**

      Result of the scan are of the following:
    - `parent.out` directly under the **invoke cardIO_sa**
    - **PublishEvent** to a topic if one was provided and a Subscribe component added.
    - `ccard_result` local page variable eventually suffixed by **local_ccard_suffix**

## ZXing

ZXing ("zebra crossing") is an open-source, multi-format 1D/2D barcode image processing library implemented in Java, with ports to other languages.

The Mobile Builder **ZXing** page demonstrates the use of this library.

**ZXing_sa**: SharedAction component to launch barcode recognition process.

 - **Variables**
   - **type**: Scan from 'file' or 'video'. Default: 'file'
   - **file**: File object as Array (if not provided from an input type file).
   - **imgId**: Img tag identifier to output image file. Optional
   - **videoId**: Video tag identifier to output video camera. Default: 'video'. Optional
   - **resultId**: Input tag identifier (@ViewChild) or String id attribute to set value to. Optional
   - **topic**: Publish Topic name to use with a Subscribe component. Optional
   - **isOuputEvent**: Publish scan result or not to the topic event. Default: true.
   - **isOuputGlobal**: Insert or not the scan result in a global page variable. The variable is composed of 'zxing:' + topic + ref variables. Default: true.
   - **ref**: In case of multiple ZXing package instances, set the variable to different values to distinguish the Publish data event and/or the local page variable. Default: ''. Optional

 - **Outputs**

      Result of the scan are of the following:
    - `parent.out` directly under the **invoke ZXing_sa**
    - **PublishEvent** to a topic if one was provided and if **isOuputEvent** is set to *true*.
    - `page.global["zxing:<topic><ref>"]` global page variable if **isOuputGlobal** is set to *true*.

## tinyMCE

The **tinyMCE** SharedComponent is based on **tinymce-angular** package version 4.2.0 for Angular 9+.\
Visit [TinyMCE Angular Component](https://github.com/tinymce/tinymce-angular) and [TinyMCE](https://github.com/tinymce/tinymce) for documentation and usage.\
See it in action in **testTinyMCE** Mobile Builder pages.

