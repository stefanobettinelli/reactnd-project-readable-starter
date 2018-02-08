import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import ExposurePlus1 from 'material-ui-icons/ExposurePlus1';
import ExposureNeg1 from 'material-ui-icons/ExposureNeg1';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { Debounce } from 'react-throttle';
import { connect } from 'react-redux';
import { fetchChangedVotePost } from './dashboardActions';
import { openPostEditor } from '../app/appActions';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  button: {
    margin: theme.spacing.unit
  }
});

const Post = props => {
  const { post, classes, updateVoteToPost, openPostEditor } = props;
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
        <Chip label={post.voteScore} className={classes.chip} />
        {/* <Debounce time="400" handler="onChange"> */}
        <IconButton
          onClick={() => updateVoteToPost(1, post.id)}
          aria-label="Add to favorites"
        >
          <ExposurePlus1 />
        </IconButton>
        {/* </Debounce> */}
        <IconButton
          onClick={() => updateVoteToPost(-1, post.id)}
          aria-label="Add to favorites"
        >
          <ExposureNeg1 />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const postComponent = withStyles(styles)(Post);

const mapDispatchToProps = dispatch => ({
  updateVoteToPost: (voteScore, postId) =>
    dispatch(fetchChangedVotePost(voteScore, postId)),
  openPostEditor: post => dispatch(openPostEditor(post))
});

export default connect(null, mapDispatchToProps)(postComponent);
