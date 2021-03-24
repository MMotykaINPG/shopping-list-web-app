import React from 'react';
import { List, AppBar, Toolbar, Typography, Button, TextField, IconButton, withTheme, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/styles';
import ItemLabel from './ItemLabel';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    list: {
        minWidth: "30%",
        maxWidth: "40%"
    },
    backIcon:{
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
        '&:hover': {
          background: "#4791db",
          cursor: "pointer"
       }
    }
  }));

const ListEditPage = (props) => {
    const {username, listName} = props;
    const classes = useStyles();
    const testLists = ["item1","item2","item3","iteeeeeeeeeem4"];
    return(
        <div style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            backgroundColor: "#4caf50"}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton  aria-label="back">
                        <ArrowBackIcon className={classes.backIcon} onClick={props.onBackClick}/>
                    </IconButton>   
                    <Typography variant="h6" className={classes.title}>
                    {"Hello " + username}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                    {"Editing: " + listName}
                    </Typography>
                    <Button color="inherit">LOGOUT</Button>
                </Toolbar>
            </AppBar>        
            <div style={{
                width: "100%",
                display: "flex",
                flexFlow: "column",
                alignContent: "center",
                alignItems: "center",
                paddingTop: "5%"}}>
            <List variant="" className={classes.list}>
                <ListItem className={classes.item}>
                    {/* <ListItemText primary={listName} className={classes.label}/> */}
                    <TextField label="Add item..."/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>  
                {testLists.map((value) => <ItemLabel listName={value}/>)}
            </List>
            </div>
        </div>
    );
}

export default ListEditPage