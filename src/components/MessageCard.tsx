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
  ListItem,
  Avatar,
  ListItemText,
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

import { EditComponent } from './EditComponent'
import { DeleteComponent } from './DeletComponent'
import { ReplyComponent } from './ReplyComponent'
import { CommentCard } from './CommentCard'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  deleteMessage: (id: number) => void
  editMessage: (message: Message) => void
  replyMessage: (parentId: number, message: string) => void
  users: User[]
  activeUser: User
}

export const MessageCard: React.FC<Props> = ({
  messages,
  activeUser,
  currentMessage,
  deleteMessage,
  replyMessage,
  editMessage,
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

  return (
    <Card variant="outlined" className={classes.root}>
      {author ? (
        <CardHeader
          avatar={<Avatar aria-label={author.name} src={author.imageUrl} />}
          action={
            activeUser.id === currentMessage.author ? (
              <DeleteComponent
                deleteMessage={deleteMessage}
                currentMessage={currentMessage}
              />
            ) : null
          }
          title={author.name}
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {currentMessage.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing={true}>
        {activeUser.id === currentMessage.author ? (
          <React.Fragment>
            <EditComponent
              editMessage={editMessage}
              currentMessage={currentMessage}
            />
          </React.Fragment>
        ) : null}
        <ReplyComponent
          replyMessage={replyMessage}
          currentMessage={currentMessage}
        />
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                    activeUser={activeUser}
                    editMessage={editMessage}
                    deleteMessage={deleteMessage}
                  />
                )
              })}
            </List>
          </CardContent>
        ) : null}
      </Collapse>
    </Card>
  )
}
