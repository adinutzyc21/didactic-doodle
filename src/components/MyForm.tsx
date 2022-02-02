import React from 'react';
import './MyForm.css';
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ButtonAppBar } from "./ButtonAppBar";
import MyFormInput from "./MyFormInput";
import { IconTypes } from '../types';


class MyForm extends React.Component<{}, { firstName: string, lastName: string }> {
    constructor(props: any) {
        super(props);

        this.state = { firstName: "", lastName: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pasteText(stateOpt: string) {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                { method: "getSelection" },
                (response: any) => {
                    switch (stateOpt) {
                        case "firstName":
                            this.setState({ firstName: response.text });
                            break;
                        case "lastName":
                            this.setState({ lastName: response.text });
                            break;
                    }
                });
        });
    }
    handleSubmit(event: any) {
        console.log('A new state was submitted:', this.state);
        event.preventDefault();
    }
    handleChange(event: any, stateOpt: string) {
        switch (stateOpt) {
            case "firstName":
                this.setState({ firstName: event.target.value });
                break;
            case "lastName":
                this.setState({ lastName: event.target.value });
                break;
        }
    }

    render() {
        return (
            <Stack spacing={2}>
                <ButtonAppBar />
                <MyFormInput label="First Name" icon={IconTypes.firstName} helperText="Paste First Name Here"
                    stateOpt="firstName" onClick={this.pasteText.bind(this)} value={this.state.firstName}
                    onChange={this.handleChange.bind(this)}
                />
                <MyFormInput label="Last Name" icon={IconTypes.lastName} helperText="Paste Last Name Here"
                    stateOpt="lastName" onClick={this.pasteText.bind(this)} value={this.state.lastName}
                    onChange={this.handleChange.bind(this)}
                />

                <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={this.handleSubmit}
                    sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
                    Submit
                </Button>
            </Stack>
        );
    }
}

export default MyForm;