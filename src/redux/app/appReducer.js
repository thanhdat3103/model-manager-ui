import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../globalActions';

const initialState = {
    snackbar: {
        open: null,
        severity: null,
        message: null,
    },
    isLoading: {
        state: false,
        progress: 0, //over 100
    },
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openSnackBar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state) {
            state.snackbar.open = false;
            state.snackbar.message = null;
        },
        updateIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

// Reducer
export default slice.reducer;
