import React from 'react'
import Pages from '@/pages'
import {initI18n} from '@/i18n'

initI18n().then()

function App() {
  return (
    <Pages />
  )
}

export default App
