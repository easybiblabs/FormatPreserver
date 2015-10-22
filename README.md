# format-preserver

Given you want to strip HTML markup and styles from a string this small library will help you with that.
A common use case is to preserve styles like B, U, I when pasting into a texteditor but remove all other styles and markup.

#### Setup

* make install

#### CI

* make ci

#### Usage

```js

var FormatPreserver = require('format-preserver');

var preservedStyles = FormatPreserver.preserveFormat('<div><p style="font-weight: bold">Bold text</p></div>');
// returns #BOLD#Bold text#ENDBOLD#

var restoredStyles = FormatPreserver.restoreFormat(preservedStyles);
// returns <span style=font-weight: bold>Bold text</span>
