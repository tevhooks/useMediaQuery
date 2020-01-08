function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React from 'react';
import mediaQuery from 'css-mediaquery';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useMediaQuery, { RenderUseMediaQuery, QueryProvider } from '..';

function createMatchMedia(width) {
  return function (query) {
    return {
      matches: mediaQuery.match(query, {
        width: width
      }),
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };
}

function Container(_ref) {
  var children = _ref.children;
  var breakpoints = {
    xs: 300,
    md: 700,
    lg: 1200
  };
  return React.createElement(QueryProvider, {
    breakpoints: breakpoints
  }, children);
}

describe('useMediaQuery', function () {
  beforeAll(function () {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  it('is defined', function () {
    expect(useMediaQuery).toBeTruthy();
  });
  it('should return boolean when query is provided in string format', function () {
    var _renderHook = renderHook(function () {
      return useMediaQuery('(min-width: 300px)');
    }),
        result = _renderHook.result;

    expect(_typeof(result.current)).toBe('boolean');
  });
  it('should render with the renderPropAPI', function () {
    function App() {
      var breakpoints = {
        xs: 300,
        md: 700,
        lg: 1200
      };
      return React.createElement(Container, null, React.createElement(RenderUseMediaQuery, {
        query: function query(_query) {
          return _query.down('xs');
        }
      }, function (isMobile) {
        return isMobile ? React.createElement("div", null, "isSmall") : React.createElement("div", null, "Is Big");
      }));
    }

    var _render = render(React.createElement(App, null)),
        getByText = _render.getByText;

    expect(getByText('Is Big')).toBeInTheDocument();
  });
  it('should render content when the hook is used with the callback function in a component', function () {
    var App = function App() {
      var isMobileScreen = useMediaQuery(function (query) {
        return query.up('xs');
      });
      return React.createElement("div", null, isMobileScreen ? 'Small' : 'Big');
    };

    var ApplicationContainer = function ApplicationContainer() {
      return React.createElement(Container, null, React.createElement(App, null));
    };

    var _render2 = render(React.createElement(ApplicationContainer, null)),
        getByText = _render2.getByText;

    expect(getByText('Small')).toBeInTheDocument();
  });
});