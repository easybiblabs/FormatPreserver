module.exports = function() {
  'use strict';

  var isBold = function(element) {
    return getComputedStyle(element)['font-weight'] || element.tagName === 'B';
  };

  var isItalic = function(element) {
    return getComputedStyle(element)['font-style'] === 'italic' || element.tagName === 'I';
  };

  var isUnderline = function(element) {
    return getComputedStyle(element)['text-decoration'] === 'underline' || element.tagName === 'U';
  };

  var marker = {
    bold: {
      test: isBold,
      startMarker: '|BOLD|',
      endMarker: '|/BOLD|',
      startStyle: '<span style="font-weight: bold">',
      endStyle: '</span>'
    },
    underline: {
      test: isUnderline,
      startMarker: '|UNDERLINE|/',
      endMarker: '/|/UNDERLINE|/',
      startStyle: '<span style="text-decoration: underline">',
      endStyle: '</span>'
    },
    italic: {
      test: isItalic,
      startMarker: '|ITALIC|',
      endMarker: '|/ITALIC|',
      startStyle: '<span style="font-style: italic">',
      endStyle: '</span>'
    }
  };

  var addMarker = function(element, marker) {
    return element.textContent = [marker.startMarker, element.textContent, marker.endMarker].join('');
  };

  var addMarkers = function(element) {
    if (element.children.length) {
      addMarkers(element.children);
    }

    for (var o in marker) {
      var styleMarker = marker[o];
      Array.prototype.forEach.call(element, function(el){
        if (styleMarker.test(el)) {
          addMarker(el, styleMarker);
        }
      });
    }

    var html = [];

    Array.prototype.forEach.call(element, function(el){
      html.push(el.innerHTML);
    });

    return html.join('');
  };

  var replaceAllOccurences = function(element, markerToReplace, markerReplacement) {
    while (element.indexOf(markerToReplace) !== -1) {
      element = element.replace(markerToReplace, markerReplacement);
    }

    return element;
  };

  var replaceMaker = function(element) {
    for (var o in marker) {
      var styleMarker = marker[o];

      element = replaceAllOccurences(element, styleMarker.startMarker, styleMarker.startStyle);
      element = replaceAllOccurences(element, styleMarker.endMarker, styleMarker.endStyle);

    }

    return element;
  };

  this.preserveFormat = function(htmlContent){
    var tmp = document.implementation.createHTMLDocument('sandbox').body;
    tmp.innerHTML = addMarkers(htmlContent);

    return tmp.textContent;
  };

  this.restoreFormat = function(htmlContent){
    return replaceMaker(htmlContent);
  };
};
