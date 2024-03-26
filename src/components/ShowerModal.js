import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { Box } from "@material-ui/core";
import FileViewer from "react-file-viewer";

const ShowerDialog = ({ setModalFlag, modalFlag, base64Data }) => {
  const { enqueueSnackbar } = useSnackbar();
  console.log(base64Data);
  const handleSave = async () => {
    setModalFlag(false);
  };
  const handleClose = () => {
    setModalFlag(false);
  };

  return (
    <div>
      <Dialog
        open={modalFlag}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <Box
          style={{
            padding: 10,
            backgroundColor: "rgb(35 45 69)",
            borderRadius: "4px",
            minWidth: "600px",
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"What is Lorem Ipsum?"}
          </DialogTitle>
          <Box style={{ textAlign: "center" }}>
            {" "}
            {base64Data && (
              <FileViewer
                fileType={base64Data?.type}
                filePath={base64Data?.base64}
              />
            )}
          </Box>

          <DialogActions>
            {/* <Button onClick={handleSave} autoFocus>
              Save
            </Button> */}
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default ShowerDialog;
