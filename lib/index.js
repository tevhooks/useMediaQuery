function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
var QueryContext = createContext();

function breakpointsFormatter(breakpoints) {
  return {
    up: function up(selectedBreakPoint) {
      return "(min-width: ".concat(parseInt(breakpoints[selectedBreakPoint]), "px)");
    },
    down: function down(selectedBreakPoint) {
      return "(max-width: ".concat(parseInt(breakpoints[selectedBreakPoint]), "px)");
    }
  };
}

export default function useMediaQuery(query) {
  var breakpoints = useContext(QueryContext);
  var mediaQuery = typeof query === 'function' ? query(breakpointsFormatter(breakpoints)) : query;
  var mediaQueryList = window.matchMedia(mediaQuery);

  var _useState = useState(function () {
    return mediaQueryList.matches;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      queryMatch = _useState2[0],
      setQueryMatch = _useState2[1];

  useEffect(function () {
    var setMediaMatchHandler = function setMediaMatchHandler(e) {
      return setQueryMatch(e.matches);
    };

    setMediaMatchHandler(mediaQueryList);
    mediaQueryList.addListener(setMediaMatchHandler);
    return function () {
      return mediaQueryList.removeListener(setMediaMatchHandler);
    };
  }, [mediaQuery, mediaQueryList]);
  return queryMatch;
}
export function QueryProvider(_ref) {
  var children = _ref.children,
      breakpoints = _ref.breakpoints;
  return React.createElement(QueryContext.Provider, {
    value: breakpoints
  }, children);
}
QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  breakpoints: PropTypes.object.isRequired
};
export function RenderUseMediaQuery(_ref2) {
  var children = _ref2.children,
      query = _ref2.query;
  var pred = useMediaQuery(query);
  return children(pred);
}
RenderUseMediaQuery.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};