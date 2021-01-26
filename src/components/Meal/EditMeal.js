import moment from 'moment';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Select, MenuItem } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { updateOneMeal } from '../../actions/meal.action';

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

const EditMeal = (props) => {
    const classes = useStyles();
    const { onHide, meal } = props;
    const { users } = useSelector(state => state.users);
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [owner, setSelectedOwner] = useState(user.id);
    const [date, setSelectedDate] = useState(moment(meal.date, 'YYYY-MM-DD').toDate());
    const [time, setSelectedTime] = useState(moment(meal.time, 'HH:mm:ss').toDate());
    const [text, setSelectedText] = useState(meal.text);
    const [calories, setSelectedCal] = useState(meal.calories);

    useEffect(() => {
        setSelectedOwner(meal.user);
        setSelectedDate(moment(meal.date, 'YYYY-MM-DD').toDate());
        setSelectedTime(moment(meal.time, 'HH:mm:ss').toDate());
        setSelectedText(meal.text);
        setSelectedCal(meal.calories);
    }, [meal]);

    const onUpdateMeal = () => {
        let mealData = {
            date: moment(date).format('YYYY-MM-DD'),
            time: moment(time).format('HH:mm:ss'),
            text,
            calories,
        };
        mealData.user = owner;
        dispatch(updateOneMeal({
            token,
            mealId: meal.id,
            meal: mealData
        }));
        onHide();
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
                <Button variant="contained" color="primary" onClick={onUpdateMeal}>Update</Button>
                <Button variant="contained" color="primary" onClick={onHide}>Cancel</Button>
            </div>
        </Paper>
    );
};

EditMeal.propTypes = {
    onHide: PropTypes.func.isRequired,
    meal: PropTypes.object.isRequired
};

export default EditMeal;
