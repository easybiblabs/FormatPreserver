describe('Format Preserver', function() {
  'use strict';

  var FormatPreserver = require('./format-preserver');

  describe('element without children', function() {
    describe('using inline styles', function() {
      it('should strip html and styles but preserve bold, italics, underline as inline style', function() {
        var pasteContent = [
          '<div style="font-weight: bold">inner</div>',
          '<p style="text-decoration: underline">inner</p>',
          '<span style="font-style: italic">inner</span>'
        ].join('');
        var expected = [
          '<span style="font-weight: bold">inner</span>',
          '<span style="text-decoration: underline">inner</span>',
          '<span style="font-style: italic">inner</span>'
        ].join('');

        expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
      });

      it('should strip html and styles but preserve bold, italics, underline as inline style when all apply on the same element', function() {
        var pasteContent = [
          '<div style="font-weight: bold; text-decoration: underline; font-style: italic">inner</div>'
        ].join('');
        var expected = [
          '<span style="font-style: italic">',
          '<span style="text-decoration: underline">',
          '<span style="font-weight: bold">',
          'inner</span></span></span>'
        ].join('');

        expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
      });
    });

    describe('using tags BUI', function() {
      it('should strip html and styles but preserve bold, italics, underline as inline style', function() {
        var pasteContent = [
          '<b>bold</b>',
          '<u>underline</u>',
          '<i>italic</i>'
        ].join('');
        var expected = [
          '<span style="font-weight: bold">bold</span>',
          '<span style="text-decoration: underline">underline</span>',
          '<span style="font-style: italic">italic</span>'
        ].join('');

        expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
      });

      it('should strip html and styles but preserve bold, italics, underline as inline style when nested', function() {
        var pasteContent = [
          '<u><b><i>inner</i></b></u>'
        ].join('');
        var expected = [
          '<span style="text-decoration: underline">',
          '<span style="font-weight: bold">',
          '<span style="font-style: italic">',
          'inner</span></span></span>'
        ].join('');

        expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
      });
    });
  });

  describe('element with children', function() {
    describe('using inline styles', function() {
      it('should strip html and styles but preserve bold, italics, underline', function() {
        var pasteContent = [
          '<div>',
          '<span style="font-weight: bold">inner</span>',
          '<span style="text-decoration: underline">inner</span>',
          '<span style="font-style: italic">inner</span>',
          '</div>'
        ].join('');
        var expected = [
          '<span style="font-weight: bold">inner</span>',
          '<span style="text-decoration: underline">inner</span>',
          '<span style="font-style: italic">inner</span>'
        ].join('');

        expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
      });

      describe('using tags BUI', function() {
        it('should strip html and styles but preserve bold, italics, underline as inline style', function() {
          var pasteContent = [
            '<div>',
            '<b>Note:</b><b>Otherwise </b>',
            '<b>bold</b>',
            '<u>underline</u>',
            '<i>italic</i>',
            '</div>'
          ].join('');
          var expected = [
            '<span style="font-weight: bold">Note:</span><span style="font-weight: bold">Otherwise </span>',
            '<span style="font-weight: bold">bold</span>',
            '<span style="text-decoration: underline">underline</span>',
            '<span style="font-style: italic">italic</span>'
          ].join('');

          expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
        });

        it('should strip html and styles but preserve bold, italics, underline as inline style when nested', function() {
          var pasteContent = [
            '<div><u><b><i>inner</i></b></u></div>'
          ].join('');
          var expected = [
            '<span style="text-decoration: underline">',
            '<span style="font-weight: bold">',
            '<span style="font-style: italic">',
            'inner</span></span></span>'
          ].join('');

          expect(FormatPreserver.restoreFormat(FormatPreserver.preserveFormat(pasteContent))).to.be.equal(expected);
        });
      });
    });
  });
});
