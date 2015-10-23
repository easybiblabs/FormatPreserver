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

  var getHtml = function(element) {
    var html = [];
    var list = [].slice.call(element);
    for (var k in list) {
      var node = list[k];
      switch (node.nodeType) {
        case 1: // regular element nodes
          html.push(node.innerHTML);
          break;
        case 3: // text nodes
          html.push(node.nodeValue);
          break;
        default:

      }
    }

    return html.join('');
  };

  var addMarkers = function(element) {
    var children = getChildren(element);

    if (children.length) {
      addMarkers(children);
    }

    for (var o in marker) {
      var styleMarker = marker[o];
      var list = [].slice.call(element);
      for (var k in list) {
        var listItem = list[k];
        if (listItem.nodeType === 1 && styleMarker.test(listItem)) {
          addMarker(listItem, styleMarker);
        }
      }
    }

    return getHtml(element);
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
    tmpDocument.body.innerHTML = html;

    return tmpDocument.body.childNodes;
  };

  return {
    preserveFormat: function(htmlContent) {
      var tmp = document.implementation.createHTMLDocument('sandbox').body;
      var elementCollection = parseHtml(htmlContent);

      tmp.innerHTML = addMarkers([].slice.call(elementCollection));

      return tmp.textContent || tmp.innerText || '';
    },
    restoreFormat: function(htmlContent) {
      return replaceMaker(htmlContent);
    }
  };
}());
