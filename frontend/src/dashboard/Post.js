import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import TextField from 'material-ui/TextField';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import {
  fetchChangedVotePost,
  fetchPostComments,
  postComment,
  updatePostCommentCounter,
  fetchDeleteComment
} from './dashboardActions';
import { openPostEditor, submitDeletePost } from '../app/appActions';
import Comment from './Comment';
import Vote from './Vote';
import {GetUUID, getFormattedDate } from '../commons/Utils';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';

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

  componentDidMount() {
    const {getPostComments, post} = this.props;
    getPostComments(post);
  }

  submitComment = ev => {
    const { post, submitPostCommet, updatePostCommentCount } = this.props;
    const { commentAuthor, commentText } = this.state;
    if (ev.type === 'click' || (ev.key === 'Enter' && !ev.shiftKey)) {
      ev.preventDefault();
      const newComment = {
        id: GetUUID(),
        timestamp: Date.now(),
        body: commentText,
        author: commentAuthor,
        parentId: post.id
      };
      if (commentAuthor && commentText) {
        submitPostCommet(newComment).then(() => {
          this.setState({
            commentAuthor: '',
            commentText: ''
          });
          updatePostCommentCount(post.id, 1);
        });
      }
    }
  };

  render() {
    const {
      post,
      classes,
      updateVoteToPost,
      openPostEditor,
      deleteThePost,
      getPostComments,
      comments,
      deletePostComments
    } = this.props;
    const { commentsExpanded, commentText, commentAuthor } = this.state;
    const postComments = comments[post.id];
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
          subheader={`${post.author} ${formattedTimeStamp} [CAT:${
            post.category
          }]`}
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
                    commentsExpanded: true
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
            error={this.state.commentText.length === 0}
            value={commentText}
            multiline
            className={classes.textField}
            onChange={ev => {
              const text = ev.target.value;
              this.setState({
                commentText: text
              });
            }}
            onKeyPress={this.submitComment}
          />
          <TextField
            id="textarea"
            error={this.state.commentAuthor.length === 0}
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
            onKeyPress={this.submitComment}
          />
          <Button onClick={this.submitComment}>Add</Button>
          {postComments &&
            Object.keys(postComments)
              .filter(commentId => !postComments[commentId].deleted)
              .map(commentId => (
                <div key={commentId}>
                  <Comment comment={postComments[commentId]} />
                </div>
              ))}
        </Collapse>
      </Card>
    );
  }
}

const postComponent = withStyles(styles)(Post);

const mapStateToProps = ({ comments }) => ({
  comments: comments.items
});

const mapDispatchToProps = dispatch => ({
  updateVoteToPost: (voteScore, postId) =>
    dispatch(fetchChangedVotePost(voteScore, postId)),
  openPostEditor: post => dispatch(openPostEditor(post)),
  deleteThePost: post => dispatch(submitDeletePost(post)),
  getPostComments: post => dispatch(fetchPostComments(post)),
  submitPostCommet: comment => dispatch(postComment(comment)),
  updatePostCommentCount: (postId, val) =>
    dispatch(updatePostCommentCounter(postId, val)),
  deletePostComments: comments =>
    comments.forEach(comment => {
      dispatch(fetchDeleteComment(comment));
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(postComponent);
