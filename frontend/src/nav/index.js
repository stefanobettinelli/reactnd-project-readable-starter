import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { selectCategory } from './actions';

const drawerWidth = 240;

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100vh',
    },
  }
});

const Nav = ({ classes, type, open, onClose, ModalProps, categories, selectCategory }) =>
  (
    <Drawer
      type={type}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onClose}
      ModalProps={ModalProps}
    >
      <div>
        <div className={classes.drawerHeader} >
          <Typography type="title">
            Readable
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem onClick={() => selectCategory('all')} button>
            <ListItemText primary='all' />
          </ListItem>
          {
            categories.length > 0
            &&
            categories.map(cat => (
              <ListItem key={cat.name} onClick={() => selectCategory(cat.name)} button>
                <ListItemText primary={cat.name} />
              </ListItem>
            ))
          }
        </List>
      </div>
    </Drawer>
  );

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (data) => dispatch(selectCategory(data))
  }
}

const navComponent = withStyles(styles)(Nav);

export default connect(null, mapDispatchToProps)(navComponent);
