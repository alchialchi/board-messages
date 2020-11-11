import React, { useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'

import { Message } from '../types'
import { useMessagesContext } from './userContext'

interface Props {
  currentMessage: Message
}

export const DeleteComponent: React.FC<Props> = ({ currentMessage }) => {
  const { fetchMessages } = useMessagesContext()

  useEffect(() => {
    fetchMessages()
  }, [])

  const deleteMessage = async (id: number) => {
    await fetch(`http://localhost:3000/messages/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.error(err))
  }

  const remove = async () => {
    await deleteMessage(currentMessage.id)
    fetchMessages()
  }

  return (
    <IconButton aria-label="Delete message" onClick={remove}>
      <DeleteIcon />
    </IconButton>
  )
}
