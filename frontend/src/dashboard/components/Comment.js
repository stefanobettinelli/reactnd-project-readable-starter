import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Vote from './Vote';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { getFormattedDate } from '../../commons/Utils';

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
    marginBottom: '5px'
  }
});

class Comment extends React.Component {
  state = {
    comment: {},
    editMode: false
  };

  submitEdit = event => {
    const { comment } = this.state;
    const { submitEditedComment } = this.props;
    submitEditedComment(comment).then(() => this.setState({ editMode: false }));
  };

  cancelEdit = () =>
    this.setState({ editMode: false, comment: this.props.comment });

  componentDidMount() {
    this.setState({
      comment: this.props.comment
    });
  }

  render() {
    const { comment, editMode } = this.state; //used for editing the comment as a controlled component
    const { classes, deleteComment, onVoteChange } = this.props;
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
            <div>
              <Typography variant="headline" component="h3">
                <Chip label={comment.author} className={classes.chip} />
              </Typography>
              <Typography component="p">{comment.body}</Typography>
            </div>
          )}
        </CardContent>
        {!editMode && (
          <CardActions className={classes.actions} disableActionSpacing>
            <Vote item={propComment} updateVoteToItem={onVoteChange} />
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
                onClick={() => deleteComment(comment)}
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

export default withStyles(styles)(Comment);
