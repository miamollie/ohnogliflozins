import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

function Index() {
  return (
    <Layout isHome>
      <Box display="flex" flexDirection="column" justifyContent="space-evenly">
        <Typography variant="body1" gutterBottom>
          Here is some explanation about what this guide is. There will also be a disclaimer in the footer..
        </Typography>
        <Box m={4}>
          <Button color="primary" variant="contained">
            <Link href="/flows">
              <Typography variant="body1">Get started</Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Index;
