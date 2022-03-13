import React from "react";
import "./MyForm.css";
import { Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { ButtonAppBar } from "./ButtonAppBar";
import MyFormInput from "./MyFormInput";
import MyRBGroup from "./MyRBGroup";

import { pasteText } from "../utils/browserInteractionModule";
import { IconTypes } from "../types";
import { STATE_NAME, WHEN_OPTIONS, CLOSING_MESSAGE, EMAIL_TEMPLATE } from "../utils/constants";

class MyForm extends React.Component<{},
    { recruiterName: string, companyName: string, contactMeWhen: string, closingMessage: string }> {
    constructor(props: any) {
        super(props);

        this.state = { recruiterName: "", companyName: "", contactMeWhen: WHEN_OPTIONS[0], closingMessage: CLOSING_MESSAGE[0] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createEmail = this.createEmail.bind(this);
    }

    async pasteText(stateName: string) {
        const response = await pasteText();
        switch (stateName) {
            case STATE_NAME.recruiterName:
                this.setState({ recruiterName: response.text });
                break;
            case STATE_NAME.companyName:
                this.setState({ companyName: response.text });
                break;
            case STATE_NAME.closingMessage:
                this.setState({ closingMessage: response.text });
                break;
            case STATE_NAME.contactMeWhen:
                this.setState({ contactMeWhen: response.text });
                break;
        }
    }

    createEmail(): string {
        return EMAIL_TEMPLATE.replace("$recruiter$", this.state.recruiterName)
            .replace("$when$", this.state.contactMeWhen)
            .replace("$atCompany$", this.state.companyName ? `at ${this.state.companyName}` : "")
            .replace("$closing$", this.state.closingMessage);
    }

    handleSubmit(event: any) {
        if (!this.state.recruiterName || !this.state.contactMeWhen || !this.state.closingMessage) {
            console.error("All fields are required!");
            return;
        }
        // Query the active tab, which will be only one tab and inject the script in it.
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                { method: "replyToEmail", emailToSend: this.createEmail() }//response is always true
            );
        });
        event.preventDefault();
    }

    handleChange(event: any, stateName: string) {
        switch (stateName) {
            case STATE_NAME.recruiterName:
                this.setState({ recruiterName: event.target.value });
                break;
            case STATE_NAME.companyName:
                this.setState({ companyName: event.target.value });
                break;
            case STATE_NAME.contactMeWhen:
                this.setState({ contactMeWhen: event.target.value });
                break;
            case STATE_NAME.closingMessage:
                this.setState({ closingMessage: event.target.value });
                break;
        }
    }

    render() {
        return (
            <Stack spacing={2}>
                <ButtonAppBar />
                <MyFormInput label="Recruiter Name *" icon={IconTypes.recruiterName} helperText="Paste Recruiter Name here"
                    stateName={STATE_NAME.recruiterName} onClick={this.pasteText.bind(this)} value={this.state.recruiterName}
                    onChange={this.handleChange.bind(this)}
                />
                <MyFormInput label="Company Name" icon={IconTypes.companyName} helperText="Paste Company Name here"
                    stateName={STATE_NAME.companyName} onClick={this.pasteText.bind(this)} value={this.state.companyName}
                    onChange={this.handleChange.bind(this)}
                />
                <MyRBGroup label="When Should You Be Contacted *"
                    options={WHEN_OPTIONS} onChange={this.handleChange.bind(this)} stateName={STATE_NAME.contactMeWhen}
                    value={this.state.contactMeWhen}
                />
                <MyRBGroup label="Closing Message *"
                    options={CLOSING_MESSAGE} onChange={this.handleChange.bind(this)} stateName={STATE_NAME.closingMessage}
                    value={this.state.closingMessage}
                />

                <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={this.handleSubmit}
                    sx={{ padding: "2px 4px", display: "flex", alignItems: "center" }}>
                    Submit
                </Button>
            </Stack >
        );
    }
}

export default MyForm;