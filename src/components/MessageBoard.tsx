import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { MessageCard } from './MessageCard'

import { Message, User } from '../types'
import { useMessagesContext } from './userContext'

interface Props {
  users: User[]
}

export const MessageBoard: React.FC<Props> = ({ users }) => {
  const { messages } = useMessagesContext()

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
        <Grid
          container={true}
          direction="row"
          justify="center"
          alignItems="baseline"
        >
          {messages.map((message: Message) => (
            <>
              {!message.parentId ? (
                <MessageCard
                  key={message.id}
                  messages={messages}
                  currentMessage={message}
                  users={users}
                />
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
