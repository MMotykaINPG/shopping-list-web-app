import React, { Fragment } from "react";
import {
  List,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  withTheme,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import ItemLabel from "./ItemLabel";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useQuery } from "react-query";

const isBought = (item) => item.is_bought;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  list: {
    minWidth: "30%",
    maxWidth: "40%",
  },
  backIcon: {
    color: "white",
  },
  inputBox: {
    border: "1px solid #4791db",
    borderRadius: "15px",
    margin: "5px 0 5px 0",
    background: "lightgray",
  },
  item: {
    border: "1px solid #4791db",
    borderRadius: "15px",
    margin: "5px 0 20px 0",
    background: "lightgray",
    "&:hover": {
      background: "#4791db",
      cursor: "pointer",
    },
  },
}));

const getListItems = async (id) =>
{
   const a = await axios.get(`https://shop-app-list.herokuapp.com/items/?shopping_list=${id}`);
   a.data.sort((i1, i2) => i1.is_bought == true ? 1 : -1);
   return a;
}


const ListEditPage = (props) => {
  const {
    username,
    listId,
    listName,
    onAddNewItemClick,
    onDeleteItemClick,
    onItemNameEdited,
  } = props;
  const [newItemName, setNewItemName] = React.useState("");
  const classes = useStyles();

  const { data, error, isLoading, refetch } = useQuery(
    ["list-items", props.listId],
    () => getListItems(props.listId)
  );

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "4caf50",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Error</Typography>;
  }

  const { data: items } = data;

  const updateItemIsBought = async (itemId, isBought, fullItemData) => {
    try {
      await axios.put(`https://shop-app-list.herokuapp.com/items/${itemId}/`, {
        ...fullItemData,
        is_bought: isBought,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onItemBackfaceClick = async (itemId) => {
    const item = items.find(({ id }) => id === itemId);
    await (isBought(item)
      ? updateItemIsBought(itemId, false, item)
      : updateItemIsBought(itemId, true, item));
    await refetch();
  };

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
          <IconButton aria-label="back">
            <ArrowBackIcon
              className={classes.backIcon}
              onClick={props.onBackClick}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {"Hello " + username}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {"Editing: " + listName}
          </Typography>
          {/* <Button color="inherit">LOGOUT</Button> */}
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
          <ListItem className={classes.item}>
            {/* <ListItemText primary={listName} className={classes.label}/> */}
            <TextField
              label="Add item..."
              onChange={(event) => {
                setNewItemName(event.target.value);
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <AddIcon onClick={() => onAddNewItemClick(newItemName)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {items.map(({ id, name, content, shopping_list, is_bought }) => (
            <Fragment key={id}>
              <ItemLabel
                onDeleteItemClick={() => onDeleteItemClick(id)}
                crossed={is_bought}
                onBackfaceClick={() => onItemBackfaceClick(id)}
                listName={name}
                onItemEditClick={() => {
                  console.log(name);
                  const newName = prompt("new name?", name);
                  console.log(newName);
                  onItemNameEdited(id, newName, content, shopping_list, is_bought);
                }}
              />
            </Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ListEditPage;
