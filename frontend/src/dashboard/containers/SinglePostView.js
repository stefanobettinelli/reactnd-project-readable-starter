import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import DashboardPost from './DashboardPost';

const styles = {
  appBar: {
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
          {post && <DashboardPost post={post} expandComments={true} disableLink={true}/>}
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
