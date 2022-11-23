import React from "react";
import IconButton from "@mui/material/IconButton";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
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
          sx={{
            "& .MuiAlert-icon": {
              fontSize: "50px",
            },
            "& 	.MuiAlert-message": {
              alignSelf: "center",
              width: "350px",
            },
          }}
          elevation={24}
          action={
            <IconButton
              sx={{ alignSelf: "center" }}
              aria-label="sulje"
              color="inherit"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          }
        >
          <AlertTitle>
            <strong>{alertOptions.title}</strong>
          </AlertTitle>
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
