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
    author: '',
    title: '',
    category: '',
    body: ''
  };

  resetFields = () => {
    this.setState({
      author: '',
      title: '',
      category: '',
      body: ''
    });
  };

  onChangeAuthor = author => this.setState({ author });
  onChangeTitle = title => this.setState({ title });
  onChangeBody = body => this.setState({ body });
  onChangeCategory = category => this.setState({ category });

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNewPost) return;
    const { author, title, category, body } = nextProps.post;
    this.setState({
      author,
      title,
      category,
      body
    });
  }

  render() {
    const {
      categories,
      classes,
      open,
      handleClose,
      post,
      handleSubmit,
      isNewPost
    } = this.props;
    const { author, title, category, body } = this.state;

    return (
      <form className={classes.container} autoComplete="off">
        <Dialog
          open={open}
          onClose={() => {this.resetFields(); handleClose()}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {post ? 'Edit Post' : 'New Post'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              disabled={!isNewPost}
              margin="dense"
              id="author"
              label="Author"
              fullWidth
              onChange={event => this.onChangeAuthor(event.target.value)}
              value={author}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                disabled={!isNewPost}
                value={category}
                onChange={event => this.onChangeCategory(event.target.value)}
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
              onChange={event => this.onChangeTitle(event.target.value)}
              value={title}
            />
            <TextField
              multiline
              rows="10"
              margin="dense"
              id="body"
              label="Body"
              fullWidth
              onChange={event => this.onChangeBody(event.target.value)}
              value={body}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.resetFields(); handleClose()}} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit(
                  isNewPost
                    ? { ...this.state }
                    : { ...this.state, id: post.id, timestamp: post.timestamp },
                  isNewPost
                );
                this.resetFields();
              }
              }
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

export default withStyles(styles)(PostEditor);
