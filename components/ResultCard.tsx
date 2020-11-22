import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  card: {
    border: '3px solid',
    borderRadius: '8px',
    padding: '30px',
  },
}));

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
  const classes = useStyles();
  return (
    <section style={{ borderColor: resultColorMap[result] }} className={classes.card}>
      <Typography variant="h5" component="h2" gutterBottom>
        {result.toUpperCase()}
      </Typography>
      <Box mb={1}>{children}</Box>
      <Button variant="outlined" onClick={tryAgain}>
        <Typography variant="body1">Start again</Typography>
      </Button>
    </section>
  );
}

export default ResultCard;
