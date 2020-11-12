import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { User } from '../types'
import styled from '@emotion/styled'
import {
  Typography,
  Button,
  List,
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { CurrentUserContext, useMessagesContext } from './userContext'
import { MessageBoard } from './MessageBoard'

const Wrapper = styled.div`
  padding: 60px;

  @media (max-width: 720px) {
    padding: 16px;
  }
`

const StartThreadContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

const UsersWrapper = styled.div`
  max-width: 280px;
  background: #e2e7ff;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  @media (max-width: 720px) {
    margin-bottom: 40px;
  }
`

const AddMessageForm = styled.form`
  display: flex;
  width: 320px;
  justify-content: space-between;

  @media (max-width: 720px) {
    width: 280px;
    flex-direction: column;

    div {
      margin-bottom: 8px;
    }
  }
`

const loadUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/users')
  return response.json()
}

export const MessageContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentUser, setCurrentUser] = useState<User>()

  const { fetchMessages } = useMessagesContext()

  const fetchUsers = async () => {
    const getUsers = await loadUsers()
    setUsers(getUsers)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const sendMessage = async () => {
    const requestMessage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: newMessage,
        author: selectedIndex,
        parentId: null,
      }),
    }
    await fetch('http://localhost:3000/messages', requestMessage)
  }

  const createMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value)
  }

  const handleListItemClick = async (
    event: ChangeEvent<any>,
    user: User,
    id: number
  ) => {
    await setCurrentUser(user)
    setSelectedIndex(id)
  }

  const addMessage = async () => {
    if (selectedIndex !== 0) {
      await sendMessage()
      fetchMessages()
    } else {
      console.log('error')
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    addMessage()
    setNewMessage('')
  }

  const disableForm = selectedIndex === 0 || newMessage === ''

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Wrapper>
        <StartThreadContainer>
          <UsersWrapper>
            <Typography component="h2" variant="h6">
              What kitty are you today?
            </Typography>
            <List>
              {users.map((user: User) => (
                <ListItem
                  key={user.id}
                  button={true}
                  onClick={(event) => handleListItemClick(event, user, user.id)}
                  selected={selectedIndex === user.id}
                >
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </UsersWrapper>
          <AddMessageForm onSubmit={handleSubmit}>
            <TextField
              id="filled-multiline-static"
              label="Add message"
              defaultValue="Default Value"
              variant="standard"
              onChange={createMessage}
              value={newMessage}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={disableForm ? true : false}
            >
              Add message
            </Button>
          </AddMessageForm>
        </StartThreadContainer>
        <MessageBoard users={users} />
      </Wrapper>
    </CurrentUserContext.Provider>
  )
}
