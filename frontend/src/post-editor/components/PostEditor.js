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
  render() {
    const {
      categories,
      classes,
      open,
      handleClose,
      post,
      onChangeAuthor,
      onChangeBody,
      handleChangeCategory,
      onChangeTitle,
      isNewPost
    } = this.props;
    const { author, category, title, body } = isNewPost
      ? post
      : {
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
              onChange={onChangeAuthor}
              value={author || ''}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                disabled={!isNewPost}
                value={category || ''}
                onChange={handleChangeCategory}
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
              onChange={onChangeTitle}
              value={title || ''}
            />
            <TextField
              multiline
              rows="10"
              margin="dense"
              id="body"
              label="Body"
              fullWidth
              onChange={onChangeBody}
              value={body || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose(post, isNewPost);
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

export default withStyles(styles)(PostEditor);
