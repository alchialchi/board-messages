import React from 'react'
import styled from '@emotion/styled'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Message, User } from '../types'

import { EditComponent } from './EditComponent'
import { DeleteComponent } from './DeletComponent'

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
  deleteMessage: (id: number) => void
  editMessage: (message: Message) => void
}

export const CommentCard: React.FC<Props> = ({
  message,
  author,
  deleteMessage,
  editMessage,
}) => {
  const classes = useStyles()

  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }

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
      {currentUser.id === message.author ? (
        <ActionsContainer>
          <EditComponent editMessage={editMessage} currentMessage={message} />
          <DeleteComponent
            deleteMessage={deleteMessage}
            currentMessage={message}
          />
        </ActionsContainer>
      ) : null}
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}
