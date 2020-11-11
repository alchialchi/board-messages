import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Message } from '../types'

import CommentIcon from '@material-ui/icons/Comment'
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'

import { useCurrentUser, useMessagesContext } from './userContext'

interface Props {
  currentMessage: Message
}

export const ReplyComponent: React.FC<Props> = ({ currentMessage }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [messageInput, setMessageInput] = useState<string>('')

  const { fetchMessages } = useMessagesContext()
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const makeComment = async (parentId: number, message: string) => {
    const comment = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        author: currentUser.id,
        parentId,
      }),
    }
    await fetch('http://localhost:3000/messages', comment).catch((err) =>
      console.error(err)
    )
  }

  const placeReply = async (parentId: number, message: string) => {
    await makeComment(parentId, message)
    fetchMessages()
  }

  const createMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    placeReply(currentMessage.id, messageInput)
    setOpen(!open)
  }

  const isFieldEmpty = messageInput === ''

  return (
    <React.Fragment>
      <IconButton
        aria-label="Reply message"
        color="primary"
        onClick={handleClick}
      >
        <CommentIcon />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Write your comment message</DialogTitle>
        <DialogContent>
          <form id="reply-form" onSubmit={handleSubmit}>
            <TextField
              autoFocus={true}
              margin="dense"
              multiline={true}
              rows={4}
              label="Add comment"
              fullWidth={true}
              onChange={createMessage}
              value={messageInput}
              variant="filled"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="secondary">
            Cancel
          </Button>
          <Button
            form="reply-form"
            type="submit"
            onClick={handleSubmit}
            color="primary"
            disabled={isFieldEmpty ? true : false}
          >
            Comment on thread
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
