import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Dashboard from '../../dashboard';
import Nav from '../../nav';
import GlobalPostEditor from '../../post-editor/containers/GlobalPostEditor';

const drawerWidth = 150;

const styles = theme => ({
  root: {
    width: '100%',
    // height: 430,
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  flex: {
    flex: 1
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
});

class App extends React.Component {
  state = {
    mobileOpen: false,
    postEditorOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleOpenEditor = () => {
    this.setState({ postEditorOpen: true });
  };

  handleClosePostEditor = () => {
    this.setState({ postEditorOpen: false });
  };

  render() {
    const { classes, posts, selectedCategory } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                type="title"
                color="inherit"
                className={classes.flex}
                noWrap
              >
                {selectedCategory.toUpperCase()}
              </Typography>
              <Button
                fab
                mini
                color="default"
                aria-label="add post"
                onClick={this.handleOpenEditor}
                className={classes.button}
              >
                <AddIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Nav
              type="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Nav type="permanent" open />
          </Hidden>
          <main className={classes.content}>
            <Dashboard posts={posts} />
          </main>
        </div>

        {/* modal post creator */}
        <GlobalPostEditor
          open={this.state.postEditorOpen}
          handleClose={this.handleClosePostEditor}
          isNewPost={true}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
