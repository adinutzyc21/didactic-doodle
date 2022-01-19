import React from 'react';
import './MyForm.css';
import { InputAdornment, FormControl, FormHelperText, Paper, Input, InputLabel, IconButton, Button, Stack } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { ButtonAppBar } from "./ButtonAppBar";


class MyForm extends React.Component<{}, { text: string }> {
    constructor(props: any) {
        super(props);

        this.state = { text: "" };

        this.pasteText = this.pasteText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    pasteText() {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                { method: "getSelection" },
                (response: any) => {
                    this.setState({ text: response.text });
                });
        });
    }
    handleSubmit(event: any) {
        console.log('A name was submitted:', this.state.text);
        event.preventDefault();
    }
    handleChange(event: any) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <Stack spacing={2}>
                <ButtonAppBar />
                <Paper
                    component="form"
                    sx={{ padding: '2px 4px', display: 'flex', alignItems: 'left', margin: "20px 5px 200px" }}
                >

                    <FormControl variant="standard" sx={{ ml: 1, flex: 1 }} aria-label='paste text here'>
                        <InputLabel htmlFor="component-helper">Name</InputLabel>
                        <Input
                            id="component-helper"
                            value={this.state.text} onChange={this.handleChange}
                            aria-describedby="component-helper-text"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="component-helper-text">
                            Some important helper text
                        </FormHelperText>
                    </FormControl>
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="paste" onClick={this.pasteText}>
                        <ContentPasteIcon />
                    </IconButton>
                </Paper>                <Button variant="contained" color="success" endIcon={<SendIcon />}
                    sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
                    Submit
                </Button>
            </Stack>
        );
    }
}

export default MyForm;