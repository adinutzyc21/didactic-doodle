import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper } from '@mui/material';

export default function MyRBGroup(props:
    {
        options: Array<string>,
        onChange: (event: any, stateName: string) => void,
        stateName: string,
        label: string,
        value: string
    }) {

    return (
        <Paper
            component="form"
            sx={{ padding: '2px 4px', margin: "20px 5px 200px" }}
        >
            <FormControl variant="standard" sx={{ ml: 1 }} aria-label='select radiobutton'>
                <FormLabel sx={{ fontSize: "12px" }}>{props.label}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={props.label}
                    value={props.value}
                    onChange={(event) => props.onChange(event, props.stateName)}
                >
                    {props.options.map(val =>
                        <FormControlLabel value={val} control={<Radio />} label={val} />
                    )}
                </RadioGroup>
            </FormControl >
        </Paper>
    );
}