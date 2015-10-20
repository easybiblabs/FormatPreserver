module.exports = (function() {
  'use strict';

  var hasStyle = function(element, key, value) {
    return getComputedStyle(element)[key] === value || element.style[key] === value;
  };

  var isBold = function(element) {
    return hasStyle(element, 'font-weight', 'bold') || element.tagName === 'B';
  };

  var isItalic = function(element) {
    return hasStyle(element, 'font-style', 'italic') || element.tagName === 'I';
  };

  var isUnderline = function(element) {
    return hasStyle(element, 'text-decoration', 'underline') || element.tagName === 'U';
  };

  var marker = {
    bold: {
      test: isBold,
      startMarker: '#BOLD#',
      endMarker: '#ENDBOLD#',
      startStyle: '<span style="font-weight: bold">',
      endStyle: '</span>'
    },
    underline: {
      test: isUnderline,
      startMarker: '#UNDERLINE#',
      endMarker: '#ENDUNDERLINE#',
      startStyle: '<span style="text-decoration: underline">',
      endStyle: '</span>'
    },
    italic: {
      test: isItalic,
      startMarker: '#ITALIC#',
      endMarker: '#ENDITALIC#',
      startStyle: '<span style="font-style: italic">',
      endStyle: '</span>'
    }
  };

  for (var o in marker) {
    var styleMarker = marker[o];
    styleMarker.startRegex = new RegExp(styleMarker.startMarker, 'g');
    styleMarker.endRegex = new RegExp(styleMarker.endMarker, 'g');
  }

  var addMarker = function(element, marker) {
    element.textContent = [marker.startMarker, element.textContent, marker.endMarker].join('');
  };

  var addMarkers = function($element) {
    if ($element.children().length) {
      addMarkers(jQuery($element.children()));
    }

    for (var o in marker) {
      var styleMarker = marker[o];
      $element.each(function(idx, el) {
        if (styleMarker.test(el)) {
          addMarker(el, styleMarker);
        }
      });
    }

    var html = [];

    $element.each(function(idx, el) {
      html.push(jQuery(el).html());
    });

    return html.join('');
  };

  var replaceMaker = function(element) {
    for (var o in marker) {
      var styleMarker = marker[o];

      element = element.replace(styleMarker.startRegex, styleMarker.startStyle);
      element = element.replace(styleMarker.endRegex, styleMarker.endStyle);

    }

    return element;
  };

  return {
    preserveFormat: function(htmlContent) {
      var tmp = document.implementation.createHTMLDocument('sandbox').body;
      tmp.innerHTML = addMarkers(jQuery(htmlContent));

      return tmp.textContent || tmp.innerText || '';
    },
    restoreFormat: function(htmlContent) {
      return replaceMaker(htmlContent);
    }
  };
}());
