import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { MessageCard } from './MessageCard'

import { Message, User } from '../types'
import { useMessagesContext } from './userContext'

interface Props {
  users: User[]
}

export const MessageBoard: React.FC<Props> = ({ users }) => {
  const { messages, fetchMessages } = useMessagesContext()

  useEffect(() => {
    fetchMessages()
  }, [])

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
                    users={users}
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
