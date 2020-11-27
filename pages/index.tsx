import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link as MUILink } from '@material-ui/core';

import Link from 'next/link';
import Box from '@material-ui/core/Box';

function Index() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Layout isHome>
      <Box display="flex" flexDirection="column" justifyContent="space-evenly">
        <Typography variant="body1" paragraph>
          Sodium-Glucose Co-Transporter-2 Inhibitors (SGLT2i) are commonly used for patients with diabetes but are
          implicated in perioperative Diabetic Ketoacidosis (DKA), which may occur with normal or minimally elevated
          blood glucose (euglycaemic DKA).
        </Typography>
        <Typography variant="body1" paragraph>
          Gliflozin Guide helps determine on the best management for patients taking SGLT2i medications in the
          perioperative period.
        </Typography>
        <Typography variant="body1" paragraph>
          By using this app, you hereby consent to our disclaimer and{' '}
          <MUILink href="" color="inherit" onClick={handleClickOpen} underline="always">
            agree to its terms
          </MUILink>
          .
        </Typography>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Giflozin Guide terms</DialogTitle>
          <DialogContent>
            <DialogContentText component="section" id="alert-dialog-description">
              <>
                <Typography variant="body1" paragraph>
                  This app reflects a single institution's recommendations, based on{' '}
                  <a href="https://diabetessociety.com.au/documents/ADS_DKA_SGLT2i_Alert_update_2020.pdf">
                    this publication
                  </a>
                  .
                </Typography>
                <Typography variant="body1" paragraph>
                  It should be used by medical professionals only in conjunction with clinical judgement and local
                  guidelines. All information on Gliflozin Guide is published in good faith for general information
                  purposes only. Gliflozin Guide does not make any warranties about the completenss, reliability and
                  accuracy of this information. Any action you take upon the information on this website is strictly at
                  your own risk. Gliflozin Guide will not be liable for any losses and/or damages in connection with the
                  use of our app.
                </Typography>
                <Typography variant="body1" paragraph>
                  Patients should always consult a healthcare professional when making decisions about their health and
                  treatment.
                </Typography>
              </>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
        <Box m={4}>
          <Button color="primary" variant="contained">
            <Link href="/flows">
              <Typography variant="body1">Get started</Typography>
            </Link>
          </Button>
        </Box>
        Copyright 2020
      </Box>
    </Layout>
  );
}

export default Index;
