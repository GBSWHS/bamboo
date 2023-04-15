import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(217, 237, 255);
    max-width: 800px;
    margin: 0 auto 20px auto;
    text-rendering: optimizeLegibility;
    padding: 0 10px;

    line-height: 1.4;
    color: #363636;
    text-rendering: optimizeLegibility;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  html,
  body {
    width: 100vw;
    height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyle
