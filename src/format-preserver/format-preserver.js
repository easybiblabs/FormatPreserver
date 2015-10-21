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

  var getChildren = function(el) {
    var children = [];

    if (typeof el.length !== 'undefined') {
      for (var i = 0; i < el.length; i++) {
        var e = el[i];

        children = children.concat([].slice.call(e.children));
      }

      return children;
    }

    return [].slice.call(el.children);
  };

  var addMarkers = function($element) {
    var children = getChildren($element);
    if (children.length) {
      addMarkers(children);
    }

    for (var o in marker) {
      var styleMarker = marker[o];
      var list = [].slice.call($element);
      for (var k in list) {
        var el = list[k];
        if (styleMarker.test(el)) {
          addMarker(el, styleMarker);
        }
      }
    }

    var html = [];
    var list = [].slice.call($element);
    for (var k in list) {
      html.push(list[k].innerHTML);
    }

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

  var parseHtml = function(html) {
    var tmpDocument = document.implementation.createHTMLDocument('parser');
    tmpDocument.body.innerHTML = [
      '<head></head>',
      html,
      '<body></body>'
    ].join('');

    return tmpDocument.body.children;
  };

  return {
    preserveFormat: function(htmlContent) {
      var tmp = document.implementation.createHTMLDocument('sandbox').body;
      var elementCollection = parseHtml(htmlContent);
      var resultHtml = addMarkers([].slice.call(elementCollection));

      tmp.innerHTML = resultHtml;

      return tmp.textContent || tmp.innerText || '';
    },
    restoreFormat: function(htmlContent) {
      return replaceMaker(htmlContent);
    }
  };
}());
