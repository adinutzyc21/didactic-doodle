import { Typography, Toolbar, AppBar, Avatar, Box } from "@mui/material";
import logo from "./logo.png";

export function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, margin_bottom: 200 }}>
            <AppBar position="static">
                <Toolbar>
                    <Avatar variant="square" alt="Chrome Extension built with React" src={logo} sx={{
                        width: 30,
                        height: "auto",
                        marginRight: '10px'
                    }} />
                    <Typography variant="h6" sx={{
                        flexGrow: 1,
                        textAlign: "center"
                    }}>
                        Chrome Extension built with React!
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
