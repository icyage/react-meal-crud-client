import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

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
    addButton: {
        marginRight: '90px'
    }
}));

const UserTable = (props) => {
    const classes = useStyles();
    const { onAddClick, onEditClick, onDeleteClick } = props;
    const { users } = useSelector(state => state.users);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = [
        { id: 'id', numeric: true, disablePadding: true, label: 'No' },
        { id: 'first', numeric: false, disablePadding: true, label: 'First Name' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    ];

    const handleDeleteClick = user => {
        if ((users.length - page * rowsPerPage - 1) < 1) {
            setPage(page - 1);
        }
        onDeleteClick(user);
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
                        {stableSort(users, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {

                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell className={classes.tableCell} align="center">{i + 1 + page * rowsPerPage}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.first}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.last}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.email}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.role}</TableCell>
                                        <TableCell className={classes.tableCell} align="right">{row.calories}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <div className={classes.actionCell}>
                                                <IconButton aria-label="edit user" onClick={() => onEditClick(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete user" onClick={() => handleDeleteClick(row)}>
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <IconButton aria-label="add user" className={classes.addButton} onClick={() => onAddClick()}>
                    <AddIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

UserTable.propTypes = {
    onAddClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default UserTable;
