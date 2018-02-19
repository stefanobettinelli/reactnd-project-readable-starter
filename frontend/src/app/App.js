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
import { fetchCategories } from '../nav/navActions';
import { fetchPosts } from '../dashboard/dashboardActions';
import { connect } from 'react-redux';
import PostEditor from './PostEditor';
import { GetUUID } from '../commons/Utils';
import {
  submitNewPost,
  submitEditedPost,
  openPostEditor,
  closePostEditor
} from './appActions';
import { postNewPost, putEditedPost } from '../commons/ReadableAPI';

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
    categories: [],
    posts: [],
    selectedCategory: 'all',
    mobileOpen: false
  };

  componentDidMount() {
    const { dispatchGetAllPosts } = this.props;
    dispatchGetAllPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { categories, posts, selectedCategory } = nextProps;
    this.setState({
      selectedCategory,
      categories: categories.items,
      posts: posts.items
    });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  isFieldMissing = modalFormValues => {
    const { author, category, title, body } = modalFormValues;
    return !modalFormValues || !author || !category || !title || !body;
  };

  handleClosePostEditor = (post, isNewPost) => {
    const {
      dispatchPostSubmitted,
      dispatchEditedPostSubmitted,
      closePostEditor
    } = this.props;
    if (this.isFieldMissing(post)) {
      closePostEditor();
      return;
    }
    const { author, category, title, body } = post;
    const newPost = isNewPost
      ? {
          author,
          body,
          category,
          id: GetUUID(),
          timestamp: Date.now(),
          title
        }
      : { ...post };
    const { selectedCategory } = this.state;
    if (selectedCategory === 'all' || newPost.category === selectedCategory)
      // will trigger re-render in oder to see the new post on the dashboard
      isNewPost
        ? dispatchPostSubmitted(newPost)
        : dispatchEditedPostSubmitted(newPost);
    else {
      isNewPost ? postNewPost(newPost) : putEditedPost(newPost);
    }
    closePostEditor();
  };

  render() {
    const { classes } = this.props;
    const { categories, posts, selectedCategory } = this.state;
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
                aria-label="add"
                onClick={() => this.props.openPostEditor()}
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
            <Nav type="permanent" open/>
          </Hidden>
          <main className={classes.content}>
            <Dashboard posts={posts} />
          </main>
        </div>

        {/* modal post creator */}
        <PostEditor
          open={this.props.postEditor.open}
          handleClose={this.handleClosePostEditor}
          categories={this.props.categories.items}
          post={this.props.postEditor.post}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProp = ({
  selectedCategory,
  categories,
  posts,
  postEditor
}) => ({
  selectedCategory,
  categories,
  posts,
  postEditor
});

const mapDispatchToProps = dispatch => ({
  dispatchGetAllPosts: () => dispatch(fetchPosts()),
  dispatchPostSubmitted: post => dispatch(submitNewPost(post)),
  dispatchEditedPostSubmitted: post => dispatch(submitEditedPost(post)),
  openPostEditor: post => dispatch(openPostEditor(post)),
  closePostEditor: () => dispatch(closePostEditor())
});

const MainApp = withStyles(styles, { withTheme: true })(App);

export default connect(mapStateToProp, mapDispatchToProps)(MainApp);
