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
  updatePostCommentCounter
} from './dashboardActions';
import { openPostEditor, submitDeletePost } from '../app/appActions';
import Comment from './Comment';
import Vote from './Vote';
import GetUUID from '../commons/Utils';

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
  },
  flex: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1
  }
});

class Post extends React.Component {
  state = {
    commentsExpanded: false,
    commentAuthor: '',
    commentText: ''
  };

  submitComment = ev => {
    const { post, submitPostCommet, updatePostCommentCount } = this.props;
    const { commentAuthor, commentText } = this.state;
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      const newComment = {
        id: GetUUID(),
        timestamp: Date.now(),
        body: commentText,
        author: commentAuthor,
        parentId: post.id
      };
      if (commentAuthor && commentText) {
        submitPostCommet(newComment).then(() =>
          updatePostCommentCount(post, 1)
        );
        this.setState({
          addCommentsExpanded: false
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
      comments
    } = this.props;
    const { commentsExpanded, commentText, commentAuthor } = this.state;
    const postComments = comments[post.id];
    const date = new Date(post.timestamp);
    const formattedTimeStamp = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <div>
              <Button
                fab
                mini
                color="primary"
                aria-label="edit"
                onClick={() => openPostEditor(post)}
                className={classes.button}
              >
                <Icon>edit_icon</Icon>
              </Button>
              <Button
                fab
                mini
                color="secondary"
                aria-label="delete"
                onClick={() => deleteThePost(post)}
                className={classes.button}
              >
                <DeleteIcon />
              </Button>
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
              {post.commentCount === 1
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
          {postComments &&
            Object.keys(postComments).map(commentId => (
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
  updatePostCommentCount: (post, val) =>
    dispatch(updatePostCommentCounter(post, val))
});

export default connect(mapStateToProps, mapDispatchToProps)(postComponent);
