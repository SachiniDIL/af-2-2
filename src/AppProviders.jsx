import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import {CountryProvider} from "./contexts/CountryProvider.jsx";

function AppProviders({children}) {
  return (
    <ThemeProvider>
      <CountryProvider>
        {children}
      </CountryProvider>
    </ThemeProvider>
  )
}

export default AppProviders