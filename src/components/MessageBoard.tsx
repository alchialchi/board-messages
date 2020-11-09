import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { MessageCard } from './MessageCard'

import { Message, User } from '../types'

interface Props {
  messages: Message[]
  deleteMessage: (id: number) => void
  editMessage: (message: Message) => void
  replyMessage: (parentId: number, message: string) => void
  users: User[]
  activeUser: User
}

export const MessageBoard: React.FC<Props> = ({
  messages,
  deleteMessage,
  editMessage,
  replyMessage,
  users,
  activeUser,
}) => {
  return (
    <Grid
      container={true}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Typography component="h1" variant="h5">
        Messages Board
      </Typography>
      {messages.length ? (
        <Grid container={true} spacing={3}>
          {messages.map((message: Message) => (
            <>
              {!message.parentId ? (
                <Grid
                  item={true}
                  key={message.id}
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ padding: 16 }}
                >
                  <MessageCard
                    messages={messages}
                    currentMessage={message}
                    deleteMessage={deleteMessage}
                    replyMessage={replyMessage}
                    editMessage={editMessage}
                    users={users}
                    activeUser={activeUser}
                  />
                </Grid>
              ) : null}
            </>
          ))}
        </Grid>
      ) : (
        <Typography component="p">No messages yet :(</Typography>
      )}
    </Grid>
  )
}
