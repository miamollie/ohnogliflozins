import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'styles/theme';

export default function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Head>
        <title>Gliflozin Guide</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
