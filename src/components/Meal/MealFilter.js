import 'date-fns';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: '20px'
    },
    container: {
        justifyContent: 'space-around',
        display: 'flex',
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    }
}));

const Filter = (props) => {
    const classes = useStyles();
    const { onFilterChange } = props;
    const [dateFrom, setDateFrom] = React.useState(new Date());
    const [dateTo, setDateTo] = React.useState(new Date());
    const [timeFrom, setTimeFrom] = React.useState(new Date());
    const [timeTo, setTimeTo] = React.useState(new Date());

    const [checkedState, setCheckedState] = React.useState({
        dateF: false,
        dateT: false,
        timeF: false,
        timeT: false
    });

    const { dateF, dateT, timeF, timeT } = checkedState;

    const handleChange = name => event => {
        setCheckedState({ ...checkedState, [name]: event.target.checked });
    };

    const handleFilterChange = () => {
        let filter = {};
        if (dateF) {
            filter.dateFrom = moment(dateFrom).format('YYYY-MM-DD');
        }
        if (dateT) {
            filter.dateTo = moment(dateTo).format('YYYY-MM-DD');
        }
        if (timeF) {
            filter.timeFrom = moment(timeFrom).format('HH:mm:ss');
        }
        if (timeT) {
            filter.timeTo = moment(timeTo).format('HH:mm:ss');
        }
        onFilterChange(filter);
    };

    return (
        <Paper className={classes.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.container}>
                    <Checkbox checked={dateF} color="primary" onChange={handleChange('dateF')} value="dateF" />
                    <KeyboardDatePicker
                        disableToolbar
                        disabled={!dateF}
                        variant="inline"
                        format="MM/dd/yyyy"
                        id="filter-date-from"
                        label="Date from"
                        value={dateFrom}
                        onChange={setDateFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <Checkbox checked={dateT} color="primary" onChange={handleChange('dateT')} value="dateT" />
                    <KeyboardDatePicker
                        disableToolbar
                        disabled={!dateT}
                        variant="inline"
                        format="MM/dd/yyyy"
                        id="filter-date-to"
                        label="Date to"
                        value={dateTo}
                        onChange={setDateTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <Checkbox checked={timeF} color="primary" onChange={handleChange('timeF')} value="timeF" />
                    <KeyboardTimePicker
                        id="filter-time-from"
                        disabled={!timeF}
                        label="Time from"
                        value={timeFrom}
                        onChange={setTimeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    <Checkbox checked={timeT} color="primary" onChange={handleChange('timeT')} value="timeT" />
                    <KeyboardTimePicker
                        id="filter-time-to"
                        disabled={!timeT}
                        label="Time to"
                        value={timeTo}
                        onChange={setTimeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </div>
                <div className={classes.container}>
                    <Button variant="contained" color="primary" onClick={() => handleFilterChange()}>Filter Meals</Button>
                    <Button variant="contained" color="primary" onClick={() => onFilterChange({})}>Clear Filter</Button>
                </div>
            </MuiPickersUtilsProvider>
        </Paper>
    );
};

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired
};

export default Filter;