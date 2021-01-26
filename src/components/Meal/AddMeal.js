import moment from 'moment';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';

import { addOneMeal } from '../../actions/meal.action';

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
    }
}));

const AddMeal = (props) => {
    const classes = useStyles();
    const { onHide } = props;
    const { users } = useSelector(state => state.users);
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [owner, setSelectedOwner] = useState(user.id);
    const [date, setSelectedDate] = useState(new Date());
    const [time, setSelectedTime] = useState(new Date());
    const [text, setSelectedText] = useState('breakfast');
    const [calories, setSelectedCal] = useState(500);

    const onAddMeal = () => {
        let mealData = {
            date: moment(date).format('YYYY-MM-DD'),
            time: moment(time).format('HH:mm:ss'),
            text,
            calories,
        };
        mealData.user = owner;
        dispatch(addOneMeal({
            token,
            meal: mealData
        }));
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {
                        user.role === 'Admin' &&
                            <Select id='user' value={owner} onChange={(e) => setSelectedOwner(e.target.value)}>
                                {users.map(user => {
                                    return user.role !== 'Manager' && <MenuItem key={user.id} value={user.id}>{user.first + ' ' + user.last}</MenuItem>;
                                })}
                            </Select>
                    }
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        id="date"
                        label="Date"
                        value={date}
                        onChange={(date) => setSelectedDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        id="time"
                        label="Time"
                        value={time}
                        onChange={(time) => setSelectedTime(time)}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    <TextField id='text' label='Text' value={text} onChange={(e) => setSelectedText(e.target.value)} />
                    <TextField id='calories' type='number' label='Calories' value={calories} onChange={(e) => setSelectedCal(e.target.value)} />
                </MuiPickersUtilsProvider>
            </div>
            <div className={classes.container}>
                <Button variant="contained" color="primary" onClick={onAddMeal}>Add</Button>
                <Button variant="contained" color="primary" onClick={onHide}>Cancel</Button>
            </div>
        </Paper>
    );
};

AddMeal.propTypes = {
    onHide: PropTypes.func.isRequired
};

export default AddMeal;
