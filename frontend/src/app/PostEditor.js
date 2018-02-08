import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class PostEditor extends React.Component {
  state = {
    post: {}
  };

  handleChange = event => {
    const { post } = this.state;
    this.setState({ post: { ...post, category: event.target.value } });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post
    });
  }

  render() {
    const { categories, classes, open, handleClose } = this.props;
    const { post } = this.state;
    const { author, category, title, body } = this.state.post || {
      author: '',
      category: '',
      title: '',
      body: ''
    };

    return (
      <form className={classes.container} autoComplete="off">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="author"
              label="Author"
              fullWidth
              onChange={event =>
                this.setState({ post: { ...post, author: event.target.value } })
              }
              value={author || ''}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={category || ''}
                onChange={this.handleChange}
                input={<Input name="category" id="category-helper" />}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map(category => (
                    <MenuItem key={category.name} value={category.name || ''}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              onChange={event =>
                this.setState({ post: { ...post, title: event.target.value } })
              }
              value={title || ''}
            />
            <TextField
              multiline
              rows="10"
              margin="dense"
              id="body"
              label="Body"
              fullWidth
              onChange={event =>
                this.setState({ post: { ...post, body: event.target.value } })
              }
              value={body || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose({ author, category, title, body });
              }}
              color="primary"
              disabled={!author || !category || !title || !body}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

const postEditorComponent = withStyles(styles)(PostEditor);

export default postEditorComponent;
