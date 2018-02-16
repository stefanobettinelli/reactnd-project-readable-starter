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
import { fetchDeleteComment, updatePostCommentCounter } from './dashboardActions';

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
  }
});

class Comment extends React.Component {
  state = {
    comment: {}
  };

  componentDidMount() {
    this.setState({
      comment: this.props.comment
    });
  }

  render() {
    const { comment } = this.state;
    const { classes, deleteComment, updatePostCommentCount } = this.props;
    return (
      <Card className={classes.card}>
        <Typography paragraph>{comment.body}</Typography>
        <CardActions className={classes.actions} disableActionSpacing>
          <Vote item={comment} updateVoteToItem={() => console.log('suka')} />
          <div className={classes.commentButtons}>
            <IconButton aria-label="Share">
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
    dispatch(updatePostCommentCounter(postId, val))
});

export default connect(null, mapDispatchToProps)(commentComponent);
