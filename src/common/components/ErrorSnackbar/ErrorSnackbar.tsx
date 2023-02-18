import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setErrorAC, setLoadingStatusAC} from '../../../redux/reducers/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: React.FC = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(t => t.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            dispatch(setErrorAC(null));
        }
        dispatch(setErrorAC(null));
        dispatch(setLoadingStatusAC('idle'))
    };

    return (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}