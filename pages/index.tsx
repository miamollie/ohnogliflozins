import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Layout from '../components/Layout';

function Index() {
  return (
    <Layout heading="Gliflozin Guide" showHome={false}>
      <Typography variant="body1" gutterBottom>
        Here is some explanation about what this guide is. There will also be a disclaimer in the footer..
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Link href="/flows">Get started &gt;</Link>
      </Typography>
    </Layout>
  );
}

export default Index;
