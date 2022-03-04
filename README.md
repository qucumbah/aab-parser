# aab-parser

[![Build and Publish](https://github.com/qucumbah/aab-parser/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/qucumbah/aab-parser/actions/workflows/npm-publish.yml)
![npm version](https://img.shields.io/npm/v/aab-parser)
![npm downloads](https://img.shields.io/npm/dw/aab-parser)

A lightweight Android app bundle parser written in Typescript with asynchronous interface. Works on pure Node JS, doesn't require additional installation of JDK.

## API

### `Manifest` type

This interface represents a subset of AAB attributes.
Only these fields are represented:
| Attribute | Description | Type |
| --- | --- | --- |
| versionCode | A positive integer used as an internal version number | number |
| versionName | A string used as the version number shown to users | string |
| packageName | A unique application ID, such as com.example.myapp | string |
| compiledSdkVersion | Which Android SDK version was used to compile the app | number |
| compiledSdkVersionCodename | Target Android version | number |

### `parseAabManifest` function

This function accepts either a path to the aab, or a buffer with app bundle content.

Asynchronously parses the app bundle manifest and returns it as an instance of `Manifest`.

### `parseAabManifestJSON` function

This function accepts either a path to the aab, or a buffer with app bundle content.

Asynchronously parses the app bundle manifest and returns it a plain JSON object. This object contains more fields compared to an instance of `Manifest`, but it's not typed.

## Usage example

```ts
const aabParser = require('aab-parser');

const manifest: aabParser.Manifest = await aabParser.parseAabManifest('./bundle.aab');

console.log(manifest);
```

Result:
```
{
  versionCode: 3830,
  versionName: '1.0.0',
  packageName: 'com.abtt.testandroidapp',
  compiledSdkVersion: 29,
  compiledSdkVersionCodename: 10
}
```
