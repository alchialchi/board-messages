import React from 'react'
import { Message, User } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  List,
  Avatar,
  IconButton,
  Collapse,
  Grid,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { EditComponent } from './EditComponent'
import { DeleteComponent } from './DeleteComponent'
import { ReplyComponent } from './ReplyComponent'
import { CommentCard } from './CommentCard'

import { useCurrentUser } from '../context/userContext'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentWrapper: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}))

interface Props {
  messages: Message[]
  currentMessage: Message
  users: User[]
}

export const MessageCard: React.FC<Props> = ({
  messages,
  currentMessage,
  users,
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const childrenMessages: Message[] = messages.filter(
    (message: Message) => message.parentId === currentMessage.id
  )

  const author: User | undefined = users.find(
    (user: User) => user.id === currentMessage.author
  )

  const currentUser = useCurrentUser()

  return (
    <Grid
      item={true}
      key={currentMessage.id}
      xs={12}
      sm={6}
      md={4}
      style={{ padding: 16 }}
    >
      <Card variant="outlined" className={classes.root} key={currentMessage.id}>
        <CardHeader
          avatar={
            <Avatar
              aria-label={author && author.name}
              src={author && author.imageUrl}
            />
          }
          action={
            currentUser && currentUser.id === currentMessage.author ? (
              <DeleteComponent currentMessage={currentMessage} />
            ) : null
          }
          title={author && author.name}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentMessage.message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing={true}>
          <ReplyComponent currentMessage={currentMessage} />
          {currentUser && currentUser.id === currentMessage.author ? (
            <React.Fragment>
              <EditComponent currentMessage={currentMessage} />
            </React.Fragment>
          ) : null}
          {childrenMessages.length ? (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show comments"
            >
              <ExpandMoreIcon />
            </IconButton>
          ) : null}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          {childrenMessages.length ? (
            <CardContent>
              <Typography variant="h6">Comments</Typography>
              <List className={classes.commentWrapper}>
                {childrenMessages.map((message: Message) => {
                  const commentAuthor = users.find(
                    (user) => user.id === message.author
                  )
                  if (!commentAuthor) {
                    return null
                  }
                  return (
                    <CommentCard
                      author={commentAuthor}
                      message={message}
                      key={message.id}
                    />
                  )
                })}
              </List>
            </CardContent>
          ) : null}
        </Collapse>
      </Card>
    </Grid>
  )
}
