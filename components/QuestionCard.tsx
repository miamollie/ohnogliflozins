import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
  function handleClick() {
    console.log('what');
    primaryAction.action();
  }
  return (
    <section>
      <Typography variant="h5" component="h2" gutterBottom>
        {question}
      </Typography>
      <Box mb={1}>
        <ButtonGroup>
          <Button onClick={handleClick}>
            <Typography variant="h5">{primaryAction.copy}</Typography>
          </Button>
          {secondaryAction && (
            <Button onClick={secondaryAction.action}>
              <Typography variant="h5">{secondaryAction.copy}</Typography>
            </Button>
          )}
        </ButtonGroup>
      </Box>
      {returnToPrevState && (
        <Button onClick={returnToPrevState}>
          <Typography variant="h5">Back</Typography>
        </Button>
      )}
    </section>
  );
}

export default QuestionCard;

//TODO reset machine if type is final && start again
