import React from 'react'

import { render, waitFor, screen } from '@testing-library/react'

import { MessagesProvider, CurrentUserContext } from './userContext'

import { MessageCard } from './MessageCard'

describe('MessageCard', () => {
  const users = [
    {
      id: 1,
      name: 'First',
      imageUrl: '',
    },
    { id: 2, name: 'Second', imageUrl: '' },
    { id: 3, name: 'Thrird', imageUrl: '' },
  ]

  const messages = [
    { id: 1, author: 1, message: 'test message', parentId: null },
    { id: 2, author: 2, message: 'some nice message', parentId: null },
    { id: 3, author: 3, message: 'whatever', parentId: null },
  ]

  test('expect to have the ability of editing and deleting your message', async () => {
    const message = {
      id: 1,
      author: 1,
      message: 'This is my message, I can delete/edit it',
      parentId: null,
    }
    const currentUser = { id: 1, name: 'First', imageUrl: '' }

    render(
      <MessagesProvider messages={messages}>
        <CurrentUserContext.Provider value={currentUser}>
          <MessageCard
            currentMessage={message}
            messages={messages}
            users={users}
          />
        </CurrentUserContext.Provider>
      </MessagesProvider>
    )

    await waitFor(() =>
      screen.getByText('This is my message, I can delete/edit it')
    )

    expect(screen.getByTestId('edit-button')).toBeVisible()
    expect(screen.queryByTestId('delete-button')).toBeVisible()
  })

  test("expect to have no ability of editing or deleting someone else's message", async () => {
    const message = {
      id: 1,
      author: 1,
      message: 'This is not my message!',
      parentId: null,
    }
    const currentUser = { id: 2, name: 'Second', imageUrl: '' }

    render(
      <MessagesProvider messages={messages}>
        <CurrentUserContext.Provider value={currentUser}>
          <MessageCard
            currentMessage={message}
            messages={messages}
            users={users}
          />
        </CurrentUserContext.Provider>
      </MessagesProvider>
    )

    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument()
  })
})
