import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Vote from './Vote';

const styles = theme => ({
  card: {
    margin: '10px 0px 10px 0px',
    backgroundColor: '#39CCCC'
  }
});

const Comment = props => {
  const { comment, classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography paragraph>{comment.body}</Typography>
        <Vote item={comment} updateVoteToItem={() => console.log('suka')} />
      </CardContent>
    </Card>
  );
};

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
