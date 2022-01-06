import React, { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { Pause } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const useStyles = makeStyles({
    controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)",
        },
    }
});

const MiddleControl = forwardRef(({
    onPlayPause,
    playing,
    onRewind,
    onFastForward,
}) => {
    const classes = useStyles();
    return (
        <>
            <Grid container direaction="row" alignItems="center" justifyContent="center">
                <IconButton
                    onClick={onRewind}
                    className={classes.controlIcons}
                    aria-label="reqind"
                >
                    <FastRewindIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                    onClick={onPlayPause}
                    className={classes.controlIcons}
                    aria-label="reqind"
                >
                    {playing ? (
                        <Pause fontSize="inherit" />
                    ) : (
                        <PlayArrowIcon fontSize="inherit" />
                    )}
                </IconButton>

                <IconButton
                    onClick={onFastForward}
                    className={classes.controlIcons}
                    aria-label="reqind"
                >
                    <FastForwardIcon fontSize="inherit" />
                </IconButton>
            </Grid>

        </>
    )
});

export default MiddleControl
