module.exports = function() {
  'use strict';

  var isBold = function($element) {
    return $element.css('font-weight') === 'bold' || $element.prop('tagName') === 'B';
  };

  var isItalic = function($element) {
    return $element.css('font-style') === 'italic' || $element.prop('tagName') === 'I';
  };

  var isUnderline = function($element) {
    return $element.css('text-decoration') === 'underline' || $element.prop('tagName') === 'U';
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

  var addMarker = function($element, marker) {
    return $element.text([marker.startMarker, $element.text(), marker.endMarker].join(''));
  };

  var addMarkers = function($element) {
    if ($element.children().length) {
      addMarkers(jQuery($element.children()));
    }

    for (var o in marker) {
      var styleMarker = marker[o];
      $element.each(function(idx, el) {
        var $el = jQuery(el);
        if (styleMarker.test($el)) {
          addMarker($el, styleMarker);
        }
      });
    }

    var html = [];

    $element.each(function(idx, el) {
      html.push(jQuery(el).html());
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
    tmp.innerHTML = addMarkers(jQuery(htmlContent));

    return tmp.textContent || tmp.innerText || '';
  };

  this.restoreFormat = function(htmlContent){
    return replaceMaker(htmlContent);
  };
};
