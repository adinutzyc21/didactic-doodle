import React from 'react';
import './MyForm.css';
import { IconTypes } from '../types';
import { FormControl, FormHelperText, Paper, Input, InputLabel, IconButton, InputAdornment } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

class MyFormInput extends React.Component<{
    label: string,
    value: string,
    icon: IconTypes,
    helperText: string,
    stateName: string,
    onClick: (stateName: string) => void,
    onChange: (event: any, stateName: string) => void,
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Paper
                component="form"
                sx={{ padding: '2px 4px', display: 'flex', alignItems: 'left', margin: "20px 5px 200px" }}
            >
                <FormControl variant="standard" sx={{ ml: 1, flex: 1 }} aria-label='paste text here'>
                    <InputLabel htmlFor="component-helper">{this.props.label}</InputLabel>
                    <Input
                        id="component-helper" value={this.props.value}
                        onChange={(event) => this.props.onChange(event, this.props.stateName)}
                        aria-describedby="component-helper-text"
                        startAdornment={
                            <InputAdornment position="start">
                                {this.props.icon == IconTypes.firstName ? <PersonAddIcon /> : this.props.icon == IconTypes.lastName ? <PersonAddAltIcon /> : <span />}
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="component-helper-text">
                        {this.props.helperText}
                    </FormHelperText>
                </FormControl>
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="paste" onClick={() => this.props.onClick(this.props.stateName)}
                >
                    <ContentPasteIcon />
                </IconButton>
            </Paper >
        );
    }
}

export default MyFormInput;