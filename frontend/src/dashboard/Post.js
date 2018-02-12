import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import ExposurePlus1 from 'material-ui-icons/ExposurePlus1';
import ExposureNeg1 from 'material-ui-icons/ExposureNeg1';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { fetchChangedVotePost, fetchPostComments } from './dashboardActions';
import { openPostEditor, submitDeletePost } from '../app/appActions';
import Comment from './Comment';
import Vote from './Vote';

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
    width: '100%',
  }
});

class Post extends React.Component {
  state = {
    expanded: false
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
          {post.commentCount > 0 && (
            <Button
              className={classes.expand}
              onClick={() => {
                getPostComments(post).then(() =>
                  this.setState({
                    expanded: !this.state.expanded
                  })
                );
              }}
            >
              <Typography variant="caption" gutterBottom align="center">
                {post.commentCount === 1
                  ? `${post.commentCount} comment`
                  : `${post.commentCount} comments`}
              </Typography>
            </Button>
          )}
        </CardActions>
        <TextField
          id="textarea"
          placeholder="Write a comment..."
          multiline
          className={classes.textField}
          margin="normal"
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>          
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
  getPostComments: post => dispatch(fetchPostComments(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(postComponent);
