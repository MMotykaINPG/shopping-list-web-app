import React from 'react';
import { List, AppBar, Toolbar, Typography, Button, TextField, CircularProgress } from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import ListLabel from './ListLabel';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    list: {
        minWidth: "30%",
        maxWidth: "40%"
    }
  }));

  

const MainMenu = (props) => {
    const {username} = props;
    const classes = useStyles();
    const testLists = ["AAA","BBB","CCC","DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"];
    return(
        <div style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            backgroundColor: "#4caf50"}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    {"Hello " + username}
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
                {testLists.map((value) => <ListLabel listName={value}/>)}
            </List>
            </div>
        </div>
    );
}

export default MainMenu