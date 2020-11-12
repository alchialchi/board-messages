import React, { useState, ChangeEvent } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import {
  TextField,
  Dialog,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'

import { Message } from '../types'
import { useMessagesContext } from './userContext'

interface Props {
  currentMessage: Message
}

export const EditComponent: React.FC<Props> = ({ currentMessage }) => {
  const [updatedMessage, setUpdatedMessage] = useState<string>(
    currentMessage.message
  )
  const [open, setOpen] = React.useState(false)

  const { fetchMessages } = useMessagesContext()

  const sendUpdatedMessage = async (message: Message) => {
    await fetch(`http://localhost:3000/messages/${message.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: updatedMessage,
        author: currentMessage.author,
        parentId: currentMessage.parentId,
      }),
    }).catch((err) => console.error(err))
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const updateMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedMessage(event.target.value)
  }

  const saveMessage = async () => {
    await sendUpdatedMessage({ ...currentMessage, message: updatedMessage })
    setOpen(!open)
    fetchMessages()
  }

  return (
    <React.Fragment>
      <IconButton
        aria-label="Edit message"
        data-testid="edit-button"
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle id="form-dialog-title">Edit your message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="dense"
            multiline={true}
            rows={4}
            id="udpateMessage"
            label="Update message"
            fullWidth={true}
            onChange={updateMessage}
            value={updatedMessage}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveMessage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
