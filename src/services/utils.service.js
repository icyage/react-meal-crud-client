import { NotificationManager } from 'react-notifications';

export const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const fetchData = async (fetchApi) => {
    try {
        const result = await fetchApi;
        const data = await result.json();
        return data;
    } catch(e) {
        return { success: false, error: 'An Error occured' };
    }
};

export const showErrorNotification = (msg) => {
    NotificationManager.error(msg, 'Error', 3000);
};

export const showInfoNotification = (msg) => {
    NotificationManager.info(msg, 'Info', 3000);
};

export const showSuccessNotification = (msg) => {
    NotificationManager.success(msg, 'Success', 3000);
};

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};