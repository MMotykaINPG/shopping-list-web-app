import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    border: "1px solid #4791db",
    borderRadius: "15px",
    margin: "5px 0 5px 0",
    background: "lightgray",
    "&:hover": {
      background: "#4791db",
      cursor: "pointer",
    },
    label: {
      multiline: "true",
    },
  },
}));

const ItemLabel = (props) => {
  const { listName, onBackfaceClick, crossed, key, onDeleteItemClick, onItemEditClick } = props;
  const classes = useStyles();
  return (
    <ListItem className={classes.item} onClick={onBackfaceClick}>
      <ListItemAvatar>
        <Avatar>
          <ShoppingCartIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        style={crossed ? { textDecoration: "line-through" } : {}}
        primary={listName}
        className={classes.label}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={onItemEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteItemClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ItemLabel;
