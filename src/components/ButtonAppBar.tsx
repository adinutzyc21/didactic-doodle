import { Typography, Toolbar, AppBar, Avatar, Box } from "@mui/material";
import logo from "../img/logo.png";

export function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, margin_bottom: 200 }}>
            <AppBar position="static">
                <Toolbar>
                    <Avatar variant="square" alt="Recruiter-Reply Extension for Gmail" src={logo} sx={{
                        width: 30,
                        height: "auto",
                        marginRight: '10px'
                    }} />
                    <Typography variant="h6" sx={{
                        flexGrow: 1,
                        textAlign: "center"
                    }}>
                        Recruiter-Reply Extension for Gmail
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
