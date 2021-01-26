import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Select, MenuItem } from '@material-ui/core';

import { validateEmail, showErrorNotification } from '../../services/utils.service';
import { addOneUser } from '../../actions';

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

const AddUser = (props) => {
    const classes = useStyles();
    const { onHide } = props;
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Regular');
    const [calories, setCalories] = useState(500);

    const onAddUser = () => {
        if (!first.length || !last.length || !email.length) {
            showErrorNotification('Please fill all infos');
            return;
        }
        if (!validateEmail(email)) {
            showErrorNotification('Invalid email');
            return;
        }
        dispatch(addOneUser({
            token,
            user: {
                first,
                last,
                email,
                password,
                role,
                calories
            }
        }));
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <TextField id='first' label='First Name' value={first} onChange={(e) => setFirst(e.target.value)} />
                <TextField id='last' label='Last Name' value={last} onChange={(e) => setLast(e.target.value)} />
                <TextField id='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField id='password' type='password' label='Password' onChange={(e) => setPassword(e.target.value)} />
                <Select id='role' value={role} className={classes.selectRole} onChange={(e) => setRole(e.target.value)} >
                    <MenuItem value='Regular'>Regular</MenuItem>
                    {user.role === 'Admin' && <MenuItem value='Manager'>Manager</MenuItem>}
                    {user.role === 'Admin' && <MenuItem value='Admin'>Admin</MenuItem>}
                </Select>
                <TextField id='calories' type='number' label='Calories' value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>
            <div className={classes.container}>
                <Button variant="contained" color="primary" onClick={onAddUser}>Add</Button>
                <Button variant="contained" color="primary" onClick={onHide}>Cancel</Button>
            </div>
        </Paper>
    );
};

AddUser.propTypes = {
    onHide: PropTypes.func.isRequired
};

export default AddUser;
