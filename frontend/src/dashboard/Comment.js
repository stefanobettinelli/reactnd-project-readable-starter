import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Vote from './Vote';
import { connect } from 'react-redux';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import {
  fetchDeleteComment,
  updatePostCommentCounter,
  editComment
} from './dashboardActions';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { getFormattedDate } from '../commons/Utils';

const styles = theme => ({
  card: {
    margin: '10px 0px 10px 0px',
    backgroundColor: '#39CCCC'
  },
  commentButtons: {
    marginLeft: 'auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  chip: {
    marginRight: '5px'
  }
});

class Comment extends React.Component {
  state = {
    comment: {},
    editMode: false
  };

  componentDidMount() {
    this.setState({
      comment: this.props.comment
    });
  }

  submitEdit = event => {
    const { editMode, comment } = this.state;
    const { submitEditedComment } = this.props;
    submitEditedComment(comment).then(() => this.setState({ editMode: false }));
  };

  cancelEdit = () =>
    this.setState({ editMode: false, comment: this.props.comment });

  render() {
    const { comment, editMode } = this.state;
    const { classes, deleteComment, updatePostCommentCount } = this.props;
    const propComment = this.props.comment;
    return (
      <Card className={classes.card}>
        <CardContent>
          {editMode ? (
            <div>
              <TextField
                multiline
                autoFocus
                margin="dense"
                id="body"
                fullWidth
                onKeyPress={event => {
                  event.key === 'Enter' &&
                    !event.shiftKey &&
                    this.submitEdit(event);
                }}
                onChange={event => {
                  this.setState({
                    comment: {
                      ...comment,
                      body: event.target.value,
                      timestamp: Date.now()
                    }
                  });
                }}
                value={comment.body || ''}
              />
              <Button onClick={this.cancelEdit}>Cancel</Button>
              <Button
                disabled={propComment.body.trim() === comment.body.trim()}
                onClick={this.submitEdit}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Typography paragraph>
              <Chip label={comment.author} className={classes.chip} />
              {comment.body}
            </Typography>
          )}
        </CardContent>
        {!editMode && (
          <CardActions className={classes.actions} disableActionSpacing>
            <Vote item={comment} updateVoteToItem={() => console.log('suka')} />
            {getFormattedDate(comment.timestamp)}
            <div className={classes.commentButtons}>
              <IconButton
                onClick={() =>
                  this.setState({
                    editMode: !this.state.editMode,
                    comment: { ...comment }
                  })
                }
                aria-label="Share"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  deleteComment(comment).then(() =>
                    updatePostCommentCount(comment.parentId, -1)
                  )
                }
                aria-label="Share"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardActions>
        )}
      </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

const commentComponent = withStyles(styles)(Comment);

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => dispatch(fetchDeleteComment(comment)),
  updatePostCommentCount: (postId, val) =>
    dispatch(updatePostCommentCounter(postId, val)),
  submitEditedComment: comment => dispatch(editComment(comment))
});

export default connect(null, mapDispatchToProps)(commentComponent);
