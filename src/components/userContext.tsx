import React, { useState, useEffect } from 'react'

import { User, Message } from '../types'

export const CurrentUserContext = React.createContext<User | undefined>(
  undefined
)

export const useCurrentUser = () => React.useContext(CurrentUserContext)

export const MessagesContext = React.createContext<{
  messages: Message[]
  fetchMessages: () => void
}>({ messages: [], fetchMessages: () => undefined })

export const MessagesProvider: React.FC<{ messages?: Message[] }> = ({
  children,
  messages: defaultMessages = [],
}) => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages)

  const fetchMessages = async () => {
    const response = await fetch('http://localhost:3000/messages')
    const newMessages = await response.json()
    setMessages(newMessages)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <MessagesContext.Provider value={{ messages, fetchMessages }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessagesContext = () => React.useContext(MessagesContext)
