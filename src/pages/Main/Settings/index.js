import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';

import MainContainer from '../../../containers/main.container';
import { updateOneUser } from '../../../actions';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: '20px'
    },
    container: {
        justifyContent: 'space-evenly',
        display: 'flex',
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    },
    selectRole: {
        marginTop: '16px'
    }
}));

const SettingsPage = () => {
    const classes = useStyles();
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [calories, setCalories] = useState(user.calories);

    useEffect(() => {
        setCalories(user.calories);
    }, [user]);

    const onUpdateUser = () => {
        dispatch(updateOneUser({
            token,
            userId: user.id,
            user: {
                calories,
            }
        }));
    };

    return (
        <MainContainer>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.container}>
                        <TextField id='calories' type='number' label='Calories' value={calories} onChange={(e) => setCalories(e.target.value)} />
                        <Button variant='contained' color='primary' onClick={onUpdateUser}>Save</Button>
                    </div>
                </Paper>
            </div>
        </MainContainer>
    );
};

export default SettingsPage;
