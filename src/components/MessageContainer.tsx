import React, { useState, useEffect, ChangeEvent } from 'react'
import { Message, User } from '../types'
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

const AddMessageWrapper = styled.div`
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

export const MessageContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(1)

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/messages')
    const newMessages = await response.json()
    setMessages(newMessages)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users')
    const getUsers = await response.json()
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
        message: messageInput,
        author: selectedIndex,
        parentId: null,
      }),
    }
    await fetch('http://localhost:3000/messages', requestMessage)
  }

  const makeComment = async (parentId: number, message: string) => {
    const comment = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        author: selectedIndex,
        parentId,
      }),
    }
    await fetch('http://localhost:3000/messages', comment)
  }

  const deleteDeleteMessage = async (id: number) => {
    await fetch(`http://localhost:3000/messages/${id}`, {
      method: 'DELETE',
    })
  }

  const sendUpdateMessage = async (message: Message) => {
    await fetch(`http://localhost:3000/messages/${message.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message.message,
        author: selectedIndex,
        parentId: message.parentId,
      }),
    })
  }

  const createMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(event.target.value)
  }

  const saveEditMessage = async (message: Message) => {
    await sendUpdateMessage(message)
    fetchData()
  }

  const removeMessage = async (id: number) => {
    await deleteDeleteMessage(id)
    fetchData()
  }

  const placeReply = async (parentId: number, message: string) => {
    await makeComment(parentId, message)
    fetchData()
  }

  const setUser = (user: User) => {
    localStorage.setItem('activeUser', JSON.stringify(user))
  }

  const handleListItemClick = async (
    event: ChangeEvent<any>,
    user: User,
    id: number
  ) => {
    await setUser(user)
    setSelectedIndex(id)
  }

  const addMessage = async () => {
    if (selectedIndex !== 0) {
      await sendMessage()
      fetchData()
    } else {
      console.log('error')
    }
  }

  const activeUserNow = JSON.parse(localStorage.getItem('activeUser') || '{}')

  return (
    <Wrapper>
      <StartThreadContainer>
        <UsersWrapper>
          <Typography component="h2" variant="h6">
            Users
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
        <AddMessageWrapper>
          <TextField
            id="filled-multiline-static"
            label="Add message"
            defaultValue="Default Value"
            variant="standard"
            onChange={createMessage}
            value={messageInput}
          />
          <Button variant="contained" color="primary" onClick={addMessage}>
            Add message
          </Button>
        </AddMessageWrapper>
      </StartThreadContainer>
      <MessageBoard
        messages={messages}
        deleteMessage={removeMessage}
        replyMessage={placeReply}
        editMessage={saveEditMessage}
        users={users}
        activeUser={activeUserNow}
      />
    </Wrapper>
  )
}
