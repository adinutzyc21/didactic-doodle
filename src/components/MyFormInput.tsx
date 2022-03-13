import './MyForm.css';
import { IconTypes } from '../types';
import { getIcon } from '../utils/iconAliases';
import { FormControl, FormHelperText, Paper, Input, InputLabel, IconButton, InputAdornment } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function MyFormInput(props:
    {
        label: string,
        value: string,
        icon: IconTypes,
        helperText: string,
        stateName: string,
        onClick: (stateName: string) => void,
        onChange: (event: any, stateName: string) => void
    }) {
    return (
        <Paper
            component="form"
            sx={{ padding: '2px 4px', display: 'flex', alignItems: 'left', margin: "20px 5px 200px" }}
        >
            <FormControl variant="standard" sx={{ ml: 1, flex: 1 }} aria-label='paste text here'>
                <InputLabel htmlFor="component-helper">{props.label}</InputLabel>
                <Input
                    id="component-helper" value={props.value}
                    onChange={(event) => props.onChange(event, props.stateName)}
                    aria-describedby="component-helper-text"
                    startAdornment={
                        <InputAdornment position="start">
                            {getIcon(props.icon)}
                        </InputAdornment>
                    }
                />
                <FormHelperText id="component-helper-text">
                    {props.helperText}
                </FormHelperText>
            </FormControl>
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="paste" onClick={() => props.onClick(props.stateName)}>
                <ContentPasteIcon />
            </IconButton>
        </Paper >
    );
}
