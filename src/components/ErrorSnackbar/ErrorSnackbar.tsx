import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../common/hooks/hooks';
import {appActions} from "../../features/Application";
import {useActions} from '../../utils/redux-utils';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: React.FC = () => {
    const {setAppError, setAppStatus} = useActions(appActions)
    const error = useAppSelector(t => t.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setAppError({error: null});
        }
        setAppError({error: null});
        setAppStatus({status: 'idle'})
    };

    return (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}