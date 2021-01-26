import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../../containers/main.container';
import { useSelector, useDispatch } from 'react-redux';
import UserTable from '../../../components/User/UserTable';
import AddUser from '../../../components/User/AddUser';
import EditUser from '../../../components/User/EditUser';
import { deleteOneUser, loadUsers } from '../../../actions';

const useStyles = makeStyles(() => ({
    root: {
        margin: '20px',
    },
}));

const UsersPage = () => {
    const classes = useStyles();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [popup, setPopup] = useState('');
    const [editUser, setEditUser] = useState({});

    const handleEditClick = user => {
        setPopup('Edit');
        setEditUser(user);
    };

    const handleDeleteClick = user => {
        setPopup('');
        dispatch(deleteOneUser({ token, userId: user.id }));
    };

    useEffect(() => {
        dispatch(loadUsers({ token }));
    });

    return (
        <MainContainer>
            <div className={classes.root}>
                <UserTable
                    onAddClick={() => setPopup('Add')}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
                {popup === 'Add' && <AddUser onHide={() => setPopup('')} />}
                {popup === 'Edit' && <EditUser onHide={() => setPopup('')} data={editUser} />}
            </div>
        </MainContainer>
    );
};

export default UsersPage;
