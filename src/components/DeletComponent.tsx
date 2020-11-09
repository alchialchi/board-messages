import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'

import { Message } from '../types'

interface Props {
    currentMessage: Message
    deleteMessage: (id: number) => void
}

export const DeleteComponent: React.FC<Props> = ({
    currentMessage,
    deleteMessage,
}) => {
    return (
        <IconButton
            aria-label="Delete message"
            onClick={() => deleteMessage(currentMessage.id)}
        >
            <DeleteIcon />
        </IconButton>
    )
}
