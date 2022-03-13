import React from 'react';
import './MyForm.css';
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ButtonAppBar } from "./ButtonAppBar";
import MyFormInput from "./MyFormInput";
import { IconTypes } from '../types';
import { STATE_NAME } from '../utils/constants';
import { pasteText } from "../utils/browserInteractionModule";

class MyForm extends React.Component<{}, { firstName: string, lastName: string }> {
    constructor(props: any) {
        super(props);

        this.state = { firstName: "", lastName: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async pasteText(stateName: string) {
        const response = await pasteText();
        switch (stateName) {
            case STATE_NAME.firstName:
                this.setState({ firstName: response.text });
                break;
            case STATE_NAME.lastName:
                this.setState({ lastName: response.text });
                break;
        }
    }

    handleSubmit(event: any) {
        console.log('A new state was submitted:', this.state);
        event.preventDefault();
    }

    handleChange(event: any, stateName: string) {
        switch (stateName) {
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
                    stateName={STATE_NAME.firstName} onClick={this.pasteText.bind(this)} value={this.state.firstName}
                    onChange={this.handleChange.bind(this)}
                />
                <MyFormInput label="Last Name" icon={IconTypes.lastName} helperText="Paste Last Name Here"
                    stateName={STATE_NAME.lastName} onClick={this.pasteText.bind(this)} value={this.state.lastName}
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