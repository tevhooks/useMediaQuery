import React from 'react'
import { useMyHook } from 'use-media-query'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App