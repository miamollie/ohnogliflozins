import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

interface ActionType {
  copy: string;
  action: () => void;
}

function QuestionCard({
  question,
  primaryAction,
  secondaryAction,
  returnToPrevState,
}: {
  question: string;
  primaryAction: ActionType;
  secondaryAction?: ActionType;
  returnToPrevState?: () => void;
}) {
  return (
    <section>
      <Typography variant="h5" component="h2" gutterBottom>
        {question}
      </Typography>
      <Box mb={1}>
        <Button color="primary" variant="contained" disableElevation onClick={primaryAction.action}>
          <Typography variant="body1">{primaryAction.copy}</Typography>
        </Button>
        {secondaryAction && (
          <Button color="secondary" onClick={secondaryAction.action}>
            <Typography variant="body1">{secondaryAction.copy}</Typography>
          </Button>
        )}
      </Box>
      {returnToPrevState && (
        <Button variant="outlined" onClick={returnToPrevState}>
          <Typography variant="body1">Back</Typography>
        </Button>
      )}
    </section>
  );
}

export default QuestionCard;
