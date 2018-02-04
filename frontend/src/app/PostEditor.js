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
import { connect } from 'react-redux';

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

class FormDialog extends React.Component {
  state = {
    author: '',
    category: '',
    title: '',
    body: ''
  };

  resetForm = () => {
    this.setState({
      author: '',
      category: '',
      title: '',
      body: ''
    });
  };

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  render() {
    const { categories, classes, open, handleClose } = this.props;
    const { author, category, title, body } = this.state;
    return (
      <form className={classes.container} autoComplete="off">
        <Dialog
          open={open}
          onClose={handleClose}
          onEnter={() => this.resetForm()}
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
              onChange={event => this.setState({ author: event.target.value })}
              value={author}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                input={<Input name="category" id="category-helper" />}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map(category => (
                    <MenuItem key={category.name} value={category.name}>
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
              onChange={event => this.setState({ title: event.target.value })}
              value={title}
            />
            <TextField
              multiline
              rows="10"
              margin="dense"
              id="body"
              label="Body"
              fullWidth
              onChange={event => this.setState({ body: event.target.value })}
              value={body}
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

function mapStateToProp({ categories }) {
  return { categories: categories.items };
}

const PostEditor = withStyles(styles)(FormDialog);

export default connect(mapStateToProp)(PostEditor);
