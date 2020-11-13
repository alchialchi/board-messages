import React from 'react'

import { Messages } from './components/Messages'
import { MessagesProvider } from './context/messagesContext'

const App = () => {
  return (
    <MessagesProvider>
      <Messages />
    </MessagesProvider>
  )
}
export default App
