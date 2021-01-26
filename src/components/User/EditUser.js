import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Select, MenuItem } from '@material-ui/core';

import { validateEmail, showErrorNotification } from '../../services/utils.service';
import { updateOneUser } from '../../actions';

const useStyles = makeStyles(theme => ({
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

const EditUser = (props) => {
    const classes = useStyles();
    const { onHide, data } = props;
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [first, setFirst] = useState(data.first);
    const [last, setLast] = useState(data.last);
    const [email, setEmail] = useState(data.email);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(data.role);
    const [calories, setCalories] = useState(data.calories);

    useEffect(() => {
        setFirst(data.first);
        setLast(data.last);
        setEmail(data.email);
        setRole(data.role);
        setCalories(data.calories);
    }, [data]);

    const onUpdateUser = () => {
        if (!first.length || !last.length || !email.length) {
            showErrorNotification('Please fill all infos');
            return;
        }
        if (!validateEmail(email)) {
            showErrorNotification('Invalid email');
            return;
        }

        let userData = {
            first,
            last,
            email,
            role,
            calories
        };
        if (password.length) {
            userData.password = password;
        }
        dispatch(updateOneUser({
            token,
            userId: data.id,
            user: userData
        }));
        onHide();
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <TextField id='first' label='First Name' value={first} onChange={(e) => setFirst(e.target.value)} />
                <TextField id='last' label='Last Name' value={last} onChange={(e) => setLast(e.target.value)} />
                <TextField id='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField id='password' type='password' label='Password' onChange={(e) => setPassword(e.target.value)} />
                <Select labelId='role-label' id='role' value={role} className={classes.selectRole} onChange={(e) => setRole(e.target.value)} >
                    <MenuItem value='Regular'>Regular</MenuItem>
                    {user.role === 'Admin' && <MenuItem value='Manager'>Manager</MenuItem>}
                    {user.role === 'Admin' && <MenuItem value='Admin'>Admin</MenuItem> }
                </Select>
                <TextField id='calories' type='number' label='Calories' value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>
            <div className={classes.container}>
                <Button variant='contained' color='primary' onClick={onUpdateUser}>Update</Button>
                <Button variant='contained' color='primary' onClick={onHide}>Cancel</Button>
            </div>
        </Paper>
    );
};

EditUser.propTypes = {
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default EditUser;
