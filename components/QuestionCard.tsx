import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';

interface ActionType {
  copy: string;
  action: () => void;
}

function QuestionCard({
  question,
  primaryAction,
  secondaryAction,
}: {
  question: string;
  primaryAction: ActionType;
  secondaryAction?: ActionType;
}) {
  return (
    <Slide direction="left" in mountOnEnter unmountOnExit key={question}>
      <div>
        <Box component="section" bgcolor="primary.main" padding="30px">
          <Typography variant="h5" component="h2" gutterBottom>
            {question}
          </Typography>
          <Box mb={1} display="flex" justifyContent="center">
            <Box m={1}>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                disableElevation
                onClick={primaryAction.action}
              >
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
      </div>
    </Slide>
  );
}

export default QuestionCard;
