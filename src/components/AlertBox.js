import React from "react";
import IconButton from "@mui/material/IconButton";
import { Alert, Snackbar } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function AlertBox(props) {
  const { alertOpen, alertOptions, setAlertOpen } = props;

  return (
    <div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={setAlertOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertOptions.severity}
          style={{ width: "350px" }}
          action={
            <IconButton
              aria-label="sulje"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
