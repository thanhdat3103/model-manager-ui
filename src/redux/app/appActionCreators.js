import axios from '../../utils/axios';
import { slice } from './appReducer';

export const closeSnackBar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
};

export const showSnackbar =
    ({ severity, message }) =>
    async (dispatch, getState) => {
        dispatch(
            slice.actions.openSnackBar({
                message,
                severity,
            }),
        );

        setTimeout(() => {
            dispatch(slice.actions.closeSnackBar());
        }, 4000);
    };
