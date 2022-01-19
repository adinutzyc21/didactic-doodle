import React from 'react';
import './MyForm.css';

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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.text} onChange={this.handleChange} />
                </label>
                <input type="button" onClick={this.pasteText} value="Paste Selection" />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default MyForm;