import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

function Index() {
  return (
    <Layout isHome>
      <Typography variant="body1" gutterBottom>
        Here is some explanation about what this guide is. There will also be a disclaimer in the footer..
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Button variant="outlined">
          <Link href="/flows">Get started &gt;</Link>
        </Button>
      </Typography>
    </Layout>
  );
}

export default Index;
