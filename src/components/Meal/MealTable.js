import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import { stableSort, getComparator } from '../../services/utils.service';

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableFooter: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    actionCell: {
        display: 'flex',
        justifyContent: 'center'        
    },
    tableCell: {
        padding: '8px',
    },
    redRow: {
        background: '#F5B7B1'
    },
    greenRow: {
        background: '#82E0AA'
    },
    editingRow: {
        background: '#E2E00A'
    },
    addButton: {
        marginRight: '90px'
    }
}));

const MealTable = (props) => {
    const classes = useStyles();
    const { onAddClick, onEditClick, onDeleteClick, editingMeal } = props;
    const { users } = useSelector(state => state.users);
    const { user } = useSelector(state => state.auth);
    const { meals } = useSelector(state => state.meals);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = [
        { id: 'id', numeric: true, disablePadding: true, label: 'No' },
        { id: 'user', numeric: false, disablePadding: true, label: 'User' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
        { id: 'text', numeric: false, disablePadding: false, label: 'Text' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    ];

    if (user.role !== 'Admin') {
        headCells.splice(1, 1);
    }

    const handleDeleteClick = meal => {
        if ((meals.length - page * rowsPerPage - 1) < 1) {
            setPage(page - 1);
        }
        onDeleteClick(meal);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const userNameFromId = id => {
        const index = users.findIndex(u => u.id === id);
        if (index < 0) {
            return '';
        }
        return users[index].first + ' ' + users[index].last;
    };

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />
                    <TableBody>
                        {stableSort(meals, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {

                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.id}
                                        className={row.id === editingMeal.id ? classes.editingRow:(row.over ? classes.redRow : classes.greenRow)}
                                    >
                                        <TableCell className={classes.tableCell} align="right">{i + 1 + page * rowsPerPage}</TableCell>
                                        {user.role === 'Admin' && <TableCell className={classes.tableCell} align="center">{userNameFromId(row.user)}</TableCell>}
                                        <TableCell className={classes.tableCell} align="center">{row.date}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.time}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.text}</TableCell>
                                        <TableCell className={classes.tableCell} align="right">{row.calories}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <div className={classes.actionCell}>
                                                <IconButton aria-label="edit meal" onClick={() => onEditClick(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete meal" onClick={() => handleDeleteClick(row)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.tableFooter}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={meals.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <IconButton aria-label="add meal" className={classes.addButton} onClick={() => onAddClick()}>
                    <AddIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

MealTable.propTypes = {
    onAddClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    editingMeal: PropTypes.object.isRequired,
};

export default MealTable;
