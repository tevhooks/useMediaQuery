// @flow

import * as React from 'react'

const { useState, useEffect, useContext, createContext } = React
type BreakPointQueryFunction = string => string
type BreakPointQueryObject = {
  up: BreakPointQueryFunction,
  down: BreakPointQueryFunction
}

type BreakPointObject = { [string | number]: string | number }

type Query = string | BreakPointQueryObject

type VoidObjectParamReturn = Object => void

type MediaQueryResponseObject = {
  matches: boolean,
  addListener: (fn: VoidObjectParamReturn) => void,
  removeListener: (fn: VoidObjectParamReturn) => void,
  matchMedia: (fn: VoidObjectParamReturn) => void
}

const QueryContext = createContext<Object>()
function breakpointsFormatter(
  breakpoints: BreakPointObject
): BreakPointQueryObject {
  return {
    up: selectedBreakPoint =>
      `(min-width: ${parseInt(breakpoints[selectedBreakPoint])}px)`,
    down: selectedBreakPoint =>
      `(max-width: ${parseInt(breakpoints[selectedBreakPoint])}px)`
  }
}

export default function useMediaQuery(query: Query): boolean {
  const breakpoints: BreakPointObject = useContext(QueryContext)
  const mediaQuery: Query =
    typeof query === 'function'
      ? query(breakpointsFormatter((breakpoints: BreakPointObject)))
      : query
  const mediaQueryList: MediaQueryResponseObject = window.matchMedia(mediaQuery)
  const [queryMatch, setQueryMatch]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = useState(() => mediaQueryList.matches)
  useEffect(
    (() => {
      const setMediaMatchHandler: VoidObjectParamReturn = (e: {
        matches: boolean
      }) => setQueryMatch(e.matches)

      setMediaMatchHandler(mediaQueryList)

      mediaQueryList.addListener(setMediaMatchHandler)

      return () => mediaQueryList.removeListener(setMediaMatchHandler)
    }: () => () => void),
    [mediaQuery, mediaQueryList]
  )

  return queryMatch
}

export function QueryProvider({
  children,
  breakpoints
}: {
  children: React.Element<any>,
  breakpoints: Query
}): React.Node {
  return (
    <QueryContext.Provider value={breakpoints}>
      {children}
    </QueryContext.Provider>
  )
}

export function RenderUseMediaQuery({
  children,
  query
}: {
  children: (pred: boolean) => React.Element<any>,
  query: Query
}): React.Node {
  const pred = useMediaQuery(query)
  return children(pred)
}
