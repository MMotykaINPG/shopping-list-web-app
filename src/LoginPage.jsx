import React from 'react'
import {Grid, Button, TextField} from '@material-ui/core'

const LoginPage = (props) => {

    return(
        <Grid container>
            <Grid item xs={3}/>
            <Grid item container direction="column" alignItems="center" justify="center" xs={6}>
                <Grid item xs={2}/>
                <Grid item container direction="column" alignItems="center" spacing={2} xs={6}>
                    <Grid item>
                        <TextField label="Enter login..." color="primary" variant="filled"/>
                    </Grid>
                    <Grid item>
                        <TextField label="Enter password..." color="primary" variant="filled" type="password"/>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained">SIGN IN</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" variant="contained" onClick={props.onSignUpClick}>SIGN UP</Button>
                    </Grid>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
};

export default LoginPage;

