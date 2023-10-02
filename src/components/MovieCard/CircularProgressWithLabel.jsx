import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTheme } from '@mui/material/styles';

export default function CircularProgressWithLabel(props) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: "absolute",
                display: "inline-flex",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "50%",
                padding: "2px",
                top: "-20px",
            }}
        >
            <CircularProgress
                variant="determinate"
                value={100}
                sx={{
                    color:
                        props.value > 70
                            ? theme.custom.highRating
                            : props.value > 40
                            ? theme.custom.medRating
                            : theme.custom.lowRating,

                    opacity: 0.3,
                }}
            />{" "}
            {/* background progress bar */}
            <CircularProgress
                variant="determinate"
                {...props}
                sx={{
                    color:
                        props.value > 70
                            ? theme.custom.highRating
                            : props.value > 40
                            ? theme.custom.medRating
                            : theme.custom.lowRating,
                    position: "absolute",
                }}
            />{" "}
            {/* actual progress bar */}
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: theme.palette.background.default, fontWeight: "700" }}
                >
                    {`${Math.round(props.value)}`}
                    <sup>%</sup>
                </Typography>
            </Box>
        </Box>
    );
}
