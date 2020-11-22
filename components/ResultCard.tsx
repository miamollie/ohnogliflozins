import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const resultColorMap: Record<string, string> = {
  DKA: 'red',
  cancel: 'red',
  inpatient: 'orange',
  contactEndo: 'orange',
  discharge: 'green',
  proceed: 'green',
};

function ResultCard({
  result,
  children,
  tryAgain,
}: {
  result: string;
  children: React.ReactNode;
  tryAgain: () => void;
}) {
  return (
    <>
      <Box
        padding={3}
        component="section"
        border={3}
        style={{ borderColor: resultColorMap[result] }}
        borderRadius="borderRadius"
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {result.toUpperCase()}
        </Typography>
        <Box mb={1}>{children}</Box>
      </Box>
      <Button variant="outlined" onClick={tryAgain}>
        <Typography variant="body1">Start again</Typography>
      </Button>
    </>
  );
}

export default ResultCard;
