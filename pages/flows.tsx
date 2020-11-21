import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';

function Flows() {
  return (
    <Layout heading="Choose a guide">
      <Box>
        <CardLink href="/preop" text="Preop Guide" />
        <CardLink href="/postop" text="Postop Guide" />
      </Box>
    </Layout>
  );
}
const useStyles = makeStyles((theme: any) => ({
  text: {
    height: '100%',
    width: '100%',
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover, &:focus': {
      outline: 'none',
    },
  },
  card: {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    padding: 0,
    background: theme.palette.primary.main,
    height: '100px',
    width: '100%',
    '&:not(:first-of-type)': {
      background: theme.palette.primary.light,
    },
    '&:hover, &:focus': {
      outline: 'none',
      //lighten?
    },
  },
}));

function CardLink({ href, text }: { href: string; text: string }) {
  const classes = useStyles();
  return (
    <Box mb={1} className={classes.card}>
      <Link href={href}>
        <Typography variant="h5" className={classes.text}>
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

export default Flows;
