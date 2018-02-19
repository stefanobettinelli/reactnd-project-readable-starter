import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import DeleteIcon from 'material-ui-icons/Delete';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Vote from '../components/Vote';
import { getFormattedDate } from '../../commons/Utils';
import PostComment from '../containers/PostComment';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  expand: {
    marginLeft: 'auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  textFieldAuthor: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Post extends React.Component {
  state = {
    commentsExpanded: false,
    commentAuthor: '',
    commentText: ''
  };

  render() {
    const {
      post,
      classes,
      updateVoteToPost,
      openPostEditor,
      deleteThePost,
      getPostComments,
      postComments,
      deletePostComments,
      submitComment
    } = this.props;
    const { commentsExpanded, commentText, commentAuthor } = this.state;
    const formattedTimeStamp = getFormattedDate(post.timestamp);

    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <div>
              <IconButton
                onClick={() => openPostEditor(post)}
                aria-label="Edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  const commentList = Object.keys(postComments).map(
                    id => postComments[id]
                  );
                  deleteThePost(post);
                  deletePostComments(commentList);
                }}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          }
          title={`${post.title}`}
          subheader={`${post.author} ${formattedTimeStamp}`}
        />
        <CardContent>
          <Typography component="p">{post.body}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Vote item={post} updateVoteToItem={updateVoteToPost} />

          <Button
            className={classes.expand}
            onClick={() => {
              if (!commentsExpanded)
                getPostComments(post).then(() =>
                  this.setState({
                    commentsExpanded: true,
                    commentAuthor: '',
                    commentText: ''
                  })
                );
              else
                this.setState({
                  commentsExpanded: false
                });
            }}
          >
            <Typography variant="caption" gutterBottom align="center">
              {post.commentCount === 0
                ? 'Add a new Comment'
                : post.commentCount === 1
                  ? `${post.commentCount} comment`
                  : `${post.commentCount} comments`}
            </Typography>
          </Button>
        </CardActions>
        <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
          <TextField
            id="textarea"
            placeholder="Write a comment..."
            error={commentText.length === 0}
            value={commentText}
            multiline
            className={classes.textField}
            onChange={ev => {
              const text = ev.target.value;
              this.setState({
                commentText: text
              });
            }}
            onKeyPress={event =>
              submitComment(event, commentAuthor, commentText)
            }
          />
          <TextField
            id="textarea"
            error={commentAuthor.length === 0}
            placeholder="Author"
            className={classes.textFieldAuthor}
            margin="normal"
            value={commentAuthor}
            onChange={ev => {
              const text = ev.target.value;
              this.setState({
                commentAuthor: text
              });
            }}
            onKeyPress={event =>
              submitComment(event, commentAuthor, commentText)
            }
          />
          <Button
            onClick={event => submitComment(event, commentAuthor, commentText)}
          >
            Add
          </Button>
          {postComments &&
            Object.keys(postComments)
              .filter(commentId => !postComments[commentId].deleted)
              .map(commentId => (
                <div key={commentId}>
                  <PostComment comment={postComments[commentId]} />
                </div>
              ))}
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
