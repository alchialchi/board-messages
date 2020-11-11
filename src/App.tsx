import React from 'react'

import { MessageContainer } from './components/MessageContainer'
import { MessagesProvider } from './components/userContext'

const App = () => {
  return (
    <MessagesProvider>
      <MessageContainer />
    </MessagesProvider>
  )
}
export default App
