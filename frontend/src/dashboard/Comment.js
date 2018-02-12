import React from 'react';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const Comment = props => {
  const { comment } = props;
  return (
    <CardContent>
      <Typography paragraph>
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        aside for 10 minutes.
      </Typography>
    </CardContent>
  );
};

export default Comment;
