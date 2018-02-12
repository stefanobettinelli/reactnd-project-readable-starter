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
import Chip from 'material-ui/Chip';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import { fetchChangedVotePost } from './dashboardActions';
import { openPostEditor, submitDeletePost } from '../app/appActions';

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
      deleteThePost
    } = this.props;
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
          <Chip label={post.voteScore} className={classes.chip} />
          <IconButton
            onClick={() => updateVoteToPost(1, post.id)}
            aria-label="Add to favorites"
          >
            <ExposurePlus1 />
          </IconButton>
          <IconButton
            onClick={() => updateVoteToPost(-1, post.id)}
            aria-label="Add to favorites"
          >
            <ExposureNeg1 />
          </IconButton>
          <Button
            className={classes.expand}
            onClick={() =>
              this.setState({
                expanded: !this.state.expanded
              })
            }
          >
            <Typography variant="caption" gutterBottom align="center">
              3 comments
            </Typography>
          </Button>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const postComponent = withStyles(styles)(Post);

const mapDispatchToProps = dispatch => ({
  updateVoteToPost: (voteScore, postId) =>
    dispatch(fetchChangedVotePost(voteScore, postId)),
  openPostEditor: post => dispatch(openPostEditor(post)),
  deleteThePost: post => dispatch(submitDeletePost(post))
});

export default connect(null, mapDispatchToProps)(postComponent);
