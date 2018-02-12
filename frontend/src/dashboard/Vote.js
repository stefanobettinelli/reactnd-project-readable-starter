import React from 'react';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';

const style = theme => ({
  chip: {
    margin: 2
  }
});

const Vote = ({ item, updateVoteToItem, classes }) => {
  return (
    <div>
      <IconButton
        onClick={() => updateVoteToItem(-1, item.id)}
        aria-label="Add to favorites"
      >
        <ExpandMore />
      </IconButton>
      <Chip label={item.voteScore} className={classes.chip} />
      <IconButton
        onClick={() => updateVoteToItem(1, item.id)}
        aria-label="Add to favorites"
      >
        <ExpandLess />
      </IconButton>
    </div>
  );
};

export default withStyles(style)(Vote);
