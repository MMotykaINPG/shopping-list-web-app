import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, IconButton} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    item: {
      border: "1px solid #4791db",
      borderRadius: "15px",
      margin: "5px 0 5px 0",
      background: "lightgray",
      '&:hover': {
        background: "#4791db",
        cursor: "pointer"
     },
     label:
     {
         multiline: "true"
     }
    },

  }));

const ListLabel = (props) => {
    const {listName} = props;
    const classes = useStyles();
    return(
        <ListItem className={classes.item}>
            <ListItemAvatar>
            <Avatar>
                <ListIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={listName} className={classes.label}/>
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>

    );
};

export default ListLabel;