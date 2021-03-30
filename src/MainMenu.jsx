import React from "react";
import {
  List,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ListLabel from "./ListLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  list: {
    minWidth: "30%",
    maxWidth: "40%",
  },
  deleteIcon: {
    color: "white",
  },
}));

const MainMenu = (props) => {
  const { username, onLogoutClick } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseCanceled = () => {
    setOpenDialog(false);
  };

  const handleCloseAccepted = () => {
    setOpenDialog(false);
  };

  const testLists = ["AAA", "BBB", "CCC", "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"];
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        backgroundColor: "#4caf50",
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {"Hello " + username}
          </Typography>
          <Button color="inherit" onClick={onLogoutClick}>
            LOGOUT
          </Button>
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteForeverIcon className={classes.deleteIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "column",
          alignContent: "center",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <List variant="" className={classes.list}>
          {testLists.map((value) => (
            <ListLabel listName={value} />
          ))}
        </List>
      </div>
      <Dialog open={openDialog} onClose={handleCloseCanceled}>
        <DialogTitle>{"Potwierdzenie usuwania"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć konto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAccepted} color="primary">
            Usuń
          </Button>
          <Button onClick={handleCloseCanceled} color="primary" autoFocus>
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainMenu;
