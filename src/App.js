import { BrowserRouter } from "react-router-dom";
import PageIndex from "./pages";
import { SnackbarProvider } from "notistack";
import { makeStyles, useTheme } from "@material-ui/core";
import { getUser } from "./action/user";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));
getUser();
const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <SnackbarProvider
      className={classes.container}
      autoHideDuration={5000}
      style={{
        backgroundColor: theme.palette.darkTheme.seven,
      }}
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <BrowserRouter>
        <PageIndex />
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;
