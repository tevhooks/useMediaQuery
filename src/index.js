import React, { useState, useEffect, useContext, createContext } from 'react'
import PropTypes from 'prop-types'

const QueryContext = createContext()
function breakpointsFormatter(breakpoints) {
  return {
    up: selectedBreakPoint =>
      `(min-width: ${parseInt(breakpoints[selectedBreakPoint])}px)`,
    down: selectedBreakPoint =>
      `(max-width: ${parseInt(breakpoints[selectedBreakPoint])}px)`
  }
}

export default function useMediaQuery(query) {
  const breakpoints = useContext(QueryContext)
  const mediaQuery =
    typeof query === 'function'
      ? query(breakpointsFormatter(breakpoints))
      : query
  const mediaQueryList = window.matchMedia(mediaQuery)
  const [queryMatch, setQueryMatch] = useState(() => mediaQueryList.matches)
  useEffect(() => {
    const setMediaMatchHandler = e => setQueryMatch(e.matches)

    setMediaMatchHandler(mediaQueryList)

    mediaQueryList.addListener(setMediaMatchHandler)

    return () => mediaQueryList.removeListener(setMediaMatchHandler)
  }, [mediaQuery, mediaQueryList])

  return queryMatch
}

export function QueryProvider({ children, breakpoints }) {
  return (
    <QueryContext.Provider value={breakpoints}>
      {children}
    </QueryContext.Provider>
  )
}

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  breakpoints: PropTypes.object.isRequired
}

export function RenderUseMediaQuery({ children, query }) {
  const pred = useMediaQuery(query)
  return children(pred)
}

RenderUseMediaQuery.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
}
