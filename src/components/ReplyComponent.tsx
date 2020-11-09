import React, { useState, ChangeEvent } from 'react'
import { Message } from '../types'

import CommentIcon from '@material-ui/icons/Comment'
import { Button, IconButton } from '@material-ui/core'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
  currentMessage: Message
  replyMessage: (parentId: number, message: string) => void
}

export const ReplyComponent: React.FC<Props> = ({
  currentMessage,
  replyMessage,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [messageInput, setMessageInput] = useState<string>('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const createMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(event.target.value)
  }

  const addComment = () => {
    replyMessage(currentMessage.id, messageInput)
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton
        aria-label="Reply message"
        color="primary"
        onClick={handleClickOpen}
      >
        <CommentIcon />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Write your comment message</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addComment} color="primary">
            Comment on thread
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
