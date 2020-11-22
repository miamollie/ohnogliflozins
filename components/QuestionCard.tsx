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
    <>
      <Box component="section" bgcolor="primary.main" padding="30px">
        <Typography variant="h5" component="h2" gutterBottom>
          {question}
        </Typography>
        <Box mb={1} display="flex" justifyContent="center">
          <Box m={1}>
            <Button size="large" color="secondary" variant="contained" disableElevation onClick={primaryAction.action}>
              <Typography variant="body1">{primaryAction.copy}</Typography>
            </Button>
          </Box>
          <Box m={1}>
            {secondaryAction && (
              <Button size="large" color="secondary" variant="outlined" onClick={secondaryAction.action}>
                <Typography variant="body1">{secondaryAction.copy}</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {returnToPrevState && (
        <Button variant="outlined" onClick={returnToPrevState}>
          <Typography variant="body1">&lt; Back</Typography>
        </Button>
      )}
    </>
  );
}

export default QuestionCard;
