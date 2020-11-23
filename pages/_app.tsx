import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'styles/theme';

export default function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    if ('serviceWorker' in navigator) {
      // eslint-disable-next-line no-undef
      window.addEventListener('load', function() {
        // eslint-disable-next-line no-undef
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          function(err) {
            console.log('Service Worker registration failed: ', err);
          },
        );
      });
    }
  }, []);

  //TODO restore when you can ignore possible undef
  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   // eslint-disable-next-line no-undef
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

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
