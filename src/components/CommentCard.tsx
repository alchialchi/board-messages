import React from 'react'
import styled from '@emotion/styled'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
} from '@material-ui/core'
import { Message, User } from '../types'

import { EditComponent } from './EditComponent'
import { DeleteComponent } from './DeleteComponent'

import { useCurrentUser } from './userContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
)

const ActionsContainer = styled.div`
  margin: 0;
  margin-left: auto;
  width: 100px;
`

interface Props {
  message: Message
  author: User
}

export const CommentCard: React.FC<Props> = ({ message, author }) => {
  const classes = useStyles()

  const currentUser = useCurrentUser()

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={author.name} src={author.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="h2"
                variant="subtitle2"
                className={classes.inline}
                color="textPrimary"
              >
                {author.name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textSecondary"
              >
                {message.message}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {currentUser && currentUser.id === message.author ? (
        <ActionsContainer>
          <EditComponent currentMessage={message} />
          <DeleteComponent currentMessage={message} />
        </ActionsContainer>
      ) : null}
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}
