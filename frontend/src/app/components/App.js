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
import Menu, { MenuItem } from 'material-ui/Menu';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';

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
    width: '100%'
  },
  appBar: {
    background: 'linear-gradient(to right, #E29587, #D66D75)',
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
    background: 'linear-gradient(to right, #86fde8, #acb6e5)',
    width: '100%',
    padding: theme.spacing.unit * 3,
    // height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      // height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
});

class App extends React.Component {
  state = {
    mobileOpen: false,
    postEditorOpen: false,
    sorting: {
      sortBy: 'timestamp',
      sortMethod: 'desc'
    }
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

  sortByDate = orderingMethod => {
    this.setState({
      sorting: {
        sortBy: 'timestamp',
        sortMethod: orderingMethod
      }
    });
  };

  sortByVoteScore = orderingMethod => {
    this.setState({
      sorting: {
        sortBy: 'voteScore',
        sortMethod: orderingMethod
      }
    });
  };

  render() {
    const {
      classes,
      posts,
      selectedCategory
    } = this.props;
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
              <SortMenu
                sortByDate={this.sortByDate}
                sortByVoteScore={this.sortByVoteScore}
              />
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
            <Dashboard posts={posts} sorting={this.state.sorting} />
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

class SortMenu extends React.Component {
  state = {
    anchorEl: null,
    sortingMethod: undefined,
    sortBy: ''
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = sortBy => {
    this.setState({ anchorEl: null, sortingMethod: sortBy });
    sortBy && sortBy('desc');
  };

  render() {
    const { sortByDate, sortByVoteScore } = this.props;
    const { anchorEl, sortingMethod } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          style={{ color: 'white' }}
          onClick={this.handleClick}
        >
          Sort By: {this.state.sortBy}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose(null)}
        >
          <MenuItem
            onClick={() => {
              this.setState({ sortBy: 'Date' });
              this.handleClose(sortByDate);
            }}
          >
            Date
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.setState({ sortBy: 'Score' });
              this.handleClose(sortByVoteScore);
            }}
          >
            Vote Score
          </MenuItem>
        </Menu>
        <Button
          style={{ color: 'white' }}          
          onClick={() => sortingMethod && sortingMethod('asc')}
        >
          ASC
          <ExpandLess />
        </Button>
        <Button
          style={{ color: 'white' }}
          onClick={() => sortingMethod && sortingMethod('desc')}
        >
          DESC
          <ExpandMore />          
        </Button>
      </div>
    );
  }
}
