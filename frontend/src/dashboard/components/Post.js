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
import GlobalPostEditor from '../../post-editor/containers/GlobalPostEditor';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: theme.mixins.gutters({
    background: '#F0FFF0',
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
    commentText: '',
    postEditorOpen: false
  };

  handleOpenEditor = () => {
    this.setState({ postEditorOpen: true });
  };

  handleClosePostEditor = () => {
    this.setState({ postEditorOpen: false });
  };

  componentDidMount() {
    const { expandComments } = this.props;
    expandComments && this.setState({ commentsExpanded: expandComments });
  }

  render() {
    const {
      post,
      classes,
      updateVoteToPost,
      deleteThePost,
      getPostComments,
      postComments,
      deletePostComments,
      submitComment,
      disableLink
    } = this.props;
    const { commentsExpanded, commentText, commentAuthor } = this.state;
    const formattedTimeStamp = getFormattedDate(post.timestamp);
    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={this.handleOpenEditor} aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (postComments) {
                    const commentList = Object.keys(postComments).map(
                      id => postComments[id]
                    );
                    deletePostComments(commentList);
                  }
                  deleteThePost(post);
                }}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          }
          title={
            disableLink ? (
              post.title
            ) : (
              <Link
                to={`/${post.category}/${post.id}`}
                onClick={() => this.setState({commentsExpanded: false})}
                style={{ textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            )
          }
          subheader={`${post.author} ${formattedTimeStamp} (posted on ${
            post.category
          })`}
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
        <GlobalPostEditor
          post={post}
          open={this.state.postEditorOpen}
          handleClose={this.handleClosePostEditor}
          isNewPost={false}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
