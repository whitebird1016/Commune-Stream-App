import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { Box, TextField } from "@material-ui/core";
import { useState } from "react";

const AlertDialog = ({ open, setOpen, walletinfo, roomId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [flag, setFlag] = useState(0);
  const [filename, setFilename] = useState();
  const handleSave = async () => {
    if (flag === 1) {
      setOpen(false);
    } else {
      setFlag(1);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          style={{
            padding: 10,
            backgroundColor: "#212032",
            borderRadius: "4px",
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Privacy is a right!- Commune Team"}
          </DialogTitle>
          <DialogContent>
            {flag === 0 ? (
              <DialogContentText id="alert-dialog-description">
                Would you like this recording saved to your Jackal account? This
                will ensure that you, and only you, will ever be able to see,
                play, or manipulate this recording in any way. All recordings
                are assigned a random file ID (FID) as proof of authenticity
                that cannot be duplicated on this network.
              </DialogContentText>
            ) : (
              <>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder=" Please name your file"
                  fullWidth
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} autoFocus>
              {flag === 0 ? "Agree" : "Save"}
            </Button>
            <Button onClick={handleClose}>
              {flag === 0 ? "DisAgree" : "Cancel"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
