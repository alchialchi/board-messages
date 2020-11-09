import React, { useState, ChangeEvent } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Button } from '@material-ui/core'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Message } from '../types'

interface Props {
  editMessage: (message: Message) => void
  currentMessage: Message
}

export const EditComponent: React.FC<Props> = ({
  editMessage,
  currentMessage,
}) => {
  const [messageText, setMessageText] = useState<string>(currentMessage.message)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const saveAndContinue = () => {
    editMessage({ ...currentMessage, message: messageText })
    setOpen(false)
  }

  const updateMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(event.target.value)
  }

  return (
    <React.Fragment>
      <IconButton aria-label="Edit message" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
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
            value={messageText}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveAndContinue} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
