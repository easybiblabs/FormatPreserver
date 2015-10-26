# format-preserver

Given you want to strip HTML markup and styles from a string this small library will help you with that.
A common use case is to preserve styles like B, U, I when pasting into a texteditor but remove all other styles and markup.

#### Install

* `npm install imagineeasy-format-preserver --save`

#### Dev Setup

* make install

#### CI

* make ci

#### Usage

```js

var FormatPreserver = require('format-preserver');

FormatPreserver.sanitize('<i><p style="font-weight: bold">Bold text</p></i>');
// returns  <span style="font-style: italic"><span style=font-weight: bold>Italic Bold text</span></span>
