import React from 'react';
import PropTypes from 'prop-types';
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
import { submitVotePost } from '../commons/ReadableAPI';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '100%',
    margin: theme.spacing.unit
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  textFieldFormLabel: {
    fontSize: 18
  },
  button: {
    margin: theme.spacing.unit
  },
  avatar: {
    backgroundColor: 'red'
  }
});

class Post extends React.Component {
  state = {
    voteScore: 0
  };

  componentDidMount() {
    const { voteScore } = this.props.post;
    this.setState({
      voteScore
    });
  }

  handleVote = (val, postId) => {
    const nextVoteScore = this.state.voteScore + val;
    this.setState({
      voteScore: nextVoteScore
    });
    submitVotePost(val, postId);
  }

  render() {
    const { post, classes } = this.props;
    const { voteScore } = this.state;
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
          <Chip label={voteScore} className={classes.chip} />
          {/* <Debounce time="400" handler="onChange"> */}
          <IconButton
            onClick={() => this.handleVote(1, post.id)}
            aria-label="Add to favorites"
          >
            <ExposurePlus1 />
          </IconButton>
          {/* </Debounce> */}
          <IconButton
            onClick={() => this.handleVote(-1, post.id)}
            aria-label="Add to favorites"
          >
            <ExposureNeg1 />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

const Dashboard = ({ posts, classes, filter }) => (
  <div>
    {posts.length > 0 &&
      posts.map(post => <Post key={post.id} post={post} classes={classes} />)}
  </div>
);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
