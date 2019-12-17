import React from 'react'
import useMediaQuery, { RenderUseMediaQuery } from '@tev/use-media-query'

const App = () => {
  const isMobileScreen = useMediaQuery(query => query.down('xs'))
  return (
    <div>
      <h1>Hooks API</h1>
      {isMobileScreen ? 'Small' : 'Not small'}

      <RenderUseMediaQuery query={'(max-width: 300px)'}>
        {isMobileScreen => {
          return (
            <div>
              <h1>Render prop API</h1>
              {isMobileScreen ? 'Small' : 'Not small'}
            </div>
          )
        }}
      </RenderUseMediaQuery>
    </div>
  )
}

export default App
