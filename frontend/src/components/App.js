import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Dashboard from '../dashboard';
import Nav from '../nav';
import { getAllCategories, getAllPosts } from '../ReadableAPI';
import { connect } from 'react-redux';
import PostEditor from './PostEditor';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    // zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
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
      position: 'relative',
      height: '100vh'
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
    categories: [],
    posts: [],
    filter: 'all',
    isPostEditorOpen: false,
    mobileOpen: false
  };

  componentDidMount() {
    getAllCategories().then(categories => this.setState({ categories }));
    getAllPosts().then(posts => this.setState({ posts }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filter: nextProps.filter
    });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  openPostEditor = () => {
    this.setState({ isPostEditorOpen: true });
  };

  closePostEditor = () => {
    this.setState({ isPostEditorOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { categories, posts, filter } = this.state;
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
                {this.state.filter.toUpperCase()}
              </Typography>
              <Button
                fab
                mini
                color="default"
                aria-label="add"
                onClick={() => this.openPostEditor()}
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
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
              categories={categories}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Nav type="permanent" open categories={categories} />
          </Hidden>
          <main className={classes.content}>
            <Dashboard posts={posts} filter={filter} />
          </main>
        </div>

        {/* modal post creator */}
        <PostEditor open={this.state.isPostEditorOpen} handleClose={this.closePostEditor}/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProp(state) {
  const { filter } = state;
  return { filter };
}

const MainApp = withStyles(styles, { withTheme: true })(App);

export default connect(mapStateToProp)(MainApp);
