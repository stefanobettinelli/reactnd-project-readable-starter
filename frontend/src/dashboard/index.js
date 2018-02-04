import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader } from 'material-ui/Card';

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
    editMode: false
  };

  render() {
    const { post, classes } = this.props;
    const { editMode } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.author.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <Button
                fab
                mini
                color="primary"
                aria-label="edit"
                className={classes.button}
                onClick={() => this.setState({ editMode: !this.state.editMode })}
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
          title={post.title}
          subheader={post.timestamp}
        />
        {editMode ? (
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                multiline
                rows="4"
                defaultValue={post.body}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.textFieldInput
                  }
                }}
              />
            </FormControl>
          </div>
        ) : (
          <div>
            <Typography component="p">{post.body}</Typography>
          </div>
        )}
      </Card>
    );
  }
}

const Dashboard = ({ posts, classes, filter }) => (
  <div>
    {posts.length > 0 &&
      posts
        .map(post => <Post key={post.id} post={post} classes={classes} />)}
  </div>
);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
