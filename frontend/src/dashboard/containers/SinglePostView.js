import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import DashboardPost from './DashboardPost';

const styles = {
  appBar: {
    background: 'linear-gradient(to right, #E29587, #D66D75)',
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.setState({ open: this.props.open });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.goBack();
  };

  render() {
    const { classes, post } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {post ? (
            <DashboardPost
              handleCloseSinglePostView={this.handleClose}
              post={post}
              expandComments={true}
              disableLink={true}
            />
          ) : (
            <h1>Content no longer exists ):</h1>
          )}
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
