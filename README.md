# use-media-query

> react hook for handling media queries

[![NPM](https://img.shields.io/npm/v/use-media-query.svg)](https://www.npmjs.com/package/use-media-query) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @tevhooks/use-media-query
```

## Usage

At the root level of your app, you need to define the various breakpoints that you will be using for your application.
You can have the most common breakpoints defined here.

```jsx
import { QueryProvider } from '@tevhooks/use-media-query'

const breakpoints = {
  xs: 300,
  sm: 500,
  md: 700,
  lg: 900,
  xl: 1400
}

ReactDOM.render(
  <QueryProvider breakpoints={breakpoints}>
    <App />
  </QueryProvider>,
  document.getElementById('root')
)
```

In your components use this hook to render components based on the screen's size.

```jsx
import useMediaQuery from '@tevhooks/use-media-query'

const App = () => {
  const isMobileScreen = useMediaQuery(query => query.down('xs'))// use the breakpoints that you defined in the root of your app
  return (
    <div>
      {isMobileScreen ? 'Small' : 'Not small'}
  )
}
```

For edge cases / breakpoints that do not need to be in the main breakpoints, just pass in the string for the required media-query

```jsx
import useMediaQuery from '@tevhooks/use-media-query'

const App = () => {
  const isMobileScreen = useMediaQuery("(max-width: 300px)"))// pass in the media-query string
  return (
    <div>
      {isMobileScreen ? 'Small' : 'Not small'}
  )
}
```

For those not using Hooks, there's a renderProp component that does the same thing

```jsx
import { RenderUseMediaQuery } from '@tevhooks/use-media-query'

function App() {
  return (
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
  )
}
```

## License

MIT © [Tevinthuku](https://github.com/Tevinthuku)
