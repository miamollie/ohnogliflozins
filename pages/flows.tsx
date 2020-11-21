import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Layout from '../components/Layout';

function Flows() {
  return (
    <Layout heading="Choose a guide">
      <Typography variant="body1" gutterBottom>
        <Link href="/preop">Preop Guide</Link>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Link href="/postop">Postop Guide</Link>
      </Typography>
    </Layout>
  );
}

export default Flows;
