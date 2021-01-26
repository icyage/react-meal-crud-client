import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../../containers/main.container';
import { useSelector, useDispatch } from 'react-redux';
import Filter from '../../../components/Meal/MealFilter';
import MealTable from '../../../components/Meal/MealTable';
import AddMeal from '../../../components/Meal/AddMeal';
import EditMeal from '../../../components/Meal/EditMeal';
import { deleteOneMeal, loadMeals, loadUsers } from '../../../actions';
import { showInfoNotification } from '../../../services/utils.service';

const useStyles = makeStyles(() => ({
    root: {
        margin: '20px',
    },
}));

const MealsPage = () => {
    const classes = useStyles();
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [popup, setPopup] = useState('');
    const [editMeal, setEditMeal] = useState({});
    const [filter, setFilter] = useState({});

    const isFilterEmpty = () => {
        return Object.keys(filter).length === 0;
    };

    const handleAddClick = () => {
        setPopup('Add');
        setEditMeal({});
        if (!isFilterEmpty()) {
            setFilter({});
            showInfoNotification('filter is cleared when adding');
        }
    };

    const handleEditClick = meal => {
        setPopup('Edit');
        setEditMeal(meal);
        if (!isFilterEmpty()) {
            setFilter({});
            showInfoNotification('filter is cleared when editing');
        }
    };

    const handleDeleteClick = meal => {
        hidePopup();
        dispatch(deleteOneMeal({ token, mealId: meal.id }));
    };

    const hidePopup = () => {
        setPopup('');
        setEditMeal({});
    };

    const handleFilterChange = newFilter => {
        hidePopup();
        setFilter(newFilter);
    };


    useEffect(() => {
        dispatch(loadMeals({ token, filter }));
    }, [token, filter, dispatch]);

    useEffect(() => {
        if (user.role === 'Admin') {
            dispatch(loadUsers({ token }));
        }
    });

    return (
        <MainContainer>
            <div className={classes.root}>
                <Filter onFilterChange={handleFilterChange} />
                <MealTable
                    onAddClick={handleAddClick}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    editingMeal={editMeal}
                />
                {popup === 'Add' && <AddMeal onHide={() => hidePopup()} /> }
                {popup === 'Edit' && <EditMeal onHide={() => hidePopup()} meal={editMeal} /> }
            </div>
        </MainContainer>
    );
};

export default MealsPage;
