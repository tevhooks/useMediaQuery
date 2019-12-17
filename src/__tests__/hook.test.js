import React from 'react'
import mediaQuery from 'css-mediaquery'
import { renderHook, act } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import useMediaQuery, { RenderUseMediaQuery, QueryProvider } from '..'

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {}
  })
}

function Container({ children }) {
  const breakpoints = {
    xs: 300,
    md: 700,
    lg: 1200
  }
  return <QueryProvider breakpoints={breakpoints}>{children}</QueryProvider>
}

describe('useMediaQuery', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth)
  })

  it('is defined', () => {
    expect(useMediaQuery).toBeTruthy()
  })

  it('should return boolean when query is provided in string format', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 300px)'))

    expect(typeof result.current).toBe('boolean')
  })
  it('should render with the renderPropAPI', () => {
    function App() {
      const breakpoints = {
        xs: 300,
        md: 700,
        lg: 1200
      }

      return (
        <Container>
          <RenderUseMediaQuery query={query => query.down('xs')}>
            {isMobile => (isMobile ? <div>isSmall</div> : <div>Is Big</div>)}
          </RenderUseMediaQuery>
        </Container>
      )
    }
    const { getByText } = render(<App />)
    expect(getByText('Is Big')).toBeInTheDocument()
  })
  it('should render content when the hook is used with the callback function in a component', () => {
    const App = () => {
      const isMobileScreen = useMediaQuery(query => query.up('xs'))
      return <div>{isMobileScreen ? 'Small' : 'Big'}</div>
    }
    const ApplicationContainer = () => {
      return (
        <Container>
          <App />
        </Container>
      )
    }
    const { getByText } = render(<ApplicationContainer />)
    expect(getByText('Small')).toBeInTheDocument()
  })
})
