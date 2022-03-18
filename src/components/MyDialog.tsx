import { MODAL_STATES, BUTTON_OPTIONS } from '../utils/constants';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props: { id: string, children: any, onClose: () => void }) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MyDialog(props: { showModalState: string, handleClose: (option: string) => void, generatedEmailMessage: string, errorMsg: string }) {
    let title = "";
    let body = "";
    let buttons = <span />;

    switch (props.showModalState) {
        case MODAL_STATES.failure:
            title = "Failed to generate message";
            body = props.errorMsg;
            buttons = <Button variant="outlined" style={{ width: "100px" }} autoFocus onClick={() => props.handleClose(BUTTON_OPTIONS.cancel)}>Cancel</Button>
            break;
        case MODAL_STATES.success:
            title = "Message generated successfully";
            body = "The email was generated successfully. Please double-check below and press Send Email if it looks good. Your email signature will also be automatically added.";
            buttons = <Stack spacing={2} direction="row">
                <Button variant="contained" style={{ width: "150px" }} color="error" onClick={() => props.handleClose(BUTTON_OPTIONS.send)}>Send Email</Button>
                <Button variant="outlined" style={{ width: "150px" }} autoFocus onClick={() => props.handleClose(BUTTON_OPTIONS.cancel)}>Cancel</Button>
            </Stack>;
            break;
    }

    return (
        <div>
            <BootstrapDialog
                onClose={() => props.handleClose(BUTTON_OPTIONS.cancel)}
                aria-labelledby="customized-dialog-title"
                open={props.showModalState !== MODAL_STATES.none}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.handleClose(BUTTON_OPTIONS.cancel)}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {body}
                    </Typography>
                    {props.showModalState === MODAL_STATES.success && <div style={{ fontSize: "14px", background: "aliceblue", padding: "10px" }}
                        dangerouslySetInnerHTML={{ __html: props.generatedEmailMessage }} />}
                </DialogContent>
                <DialogActions>
                    {buttons}
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
