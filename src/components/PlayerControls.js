import React, { forwardRef, useRef } from "react";
import { Typography } from "@mui/material";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullScreenIcon from "@mui/icons-material/Fullscreen";
import { Pause } from "@mui/icons-material";

const useStyles = makeStyles({
    controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    },
    controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)",
        },
    },
    bottomIcons: {
        color: "#999",
        "&:hover": {
            color: "#fff",
        },
    },
    volumeSlider: {
        width: 100,
    },
});

const PrettoSlider = withStyles({
    root: {
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const PlayerControls = forwardRef(({
    onPlayPause,
    playing,
    onRewind,
    onFastForward,
    muted,
    onMute,
    onVolumeChange,
    onVolumeSeekUp,
    volume,
    onPlaybackRateChange,
    playbackRate,
    onToggleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    onDuration,
    elapsedTime,
    totalDuration,
    onChangeDispayFormat,
    onBookmark

}, ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    const containerRef = useRef(null);

    return (
        <div className={classes.controlsWrapper} ref={ref}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ padding: 16 }}
            >
                <Grid item>
                    <Typography variant="h5" style={{ color: "#99a2b0" }}>
                        Video Title
                    </Typography>
                </Grid>

                <Grid item style={{ color: "black" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<BookmarkBorderIcon />}
                        onClick={onBookmark}
                        style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#99a2b0" }}
                    >
                        Bookmark
                    </Button>
                </Grid>
            </Grid>

            {/* middle controls */}
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

            {/* bottom controls */}
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ padding: 16 }}
            >
                <Grid item xs={12}>
                    <PrettoSlider
                        aria-label="pretto slider"
                        min={0}
                        max={100}
                        value={played * 100}
                        valueLabelDisplay="auto"
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        onDuration={onDuration}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                    />
                </Grid>

                <Grid item>
                    <Box
                        sx={{
                            width: 300,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <IconButton className={classes.bottomIcons} onClick={onPlayPause}>
                            {playing ? (
                                <Pause fontSize="large" />
                            ) : (
                                <PlayArrowIcon fontSize="large" />
                            )}
                        </IconButton>

                        <IconButton onClick={onMute} className={classes.bottomIcons}>
                            {muted ? (
                                <VolumeOffIcon fontSize="large" />
                            ) : volume > 0.5 ? (
                                <VolumeUpIcon fontSize="large" />
                            ) : (
                                <VolumeDownIcon fontSize="large" />
                            )}
                        </IconButton>

                        <Slider
                            min={0}
                            max={100}
                            value={volume * 100}
                            defaultValue={70}
                            style={{ color: "#999" }}
                            className={classes.bottomIcons}
                            onChange={onVolumeChange}
                            onChangeCommitted={onVolumeSeekUp}
                        />
                        <Button
                            onClick={onChangeDispayFormat}
                            variant="text"
                            style={{ color: "#fff", marginLeft: 16 }}
                        >

                            <Typography>
                                {elapsedTime}/{totalDuration}
                            </Typography>
                        </Button>
                    </Box>
                </Grid>
                <Grid item ref={containerRef}>
                    <Button
                        onClick={handlePopover}
                        variant="text"
                        className={classes.bottomIcons}
                    >
                        <Typography>{playbackRate}X</Typography>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        container={containerRef.current}
                    >
                        <Grid container direction="column-reverse">
                            {[0.5, 1, 1.5, 2].map((rate) => (
                                <Button
                                    variant="text"
                                    onClick={() => onPlaybackRateChange(rate)}
                                >
                                    <Typography
                                        color={rate === playbackRate ? "secondary" : "inherit"}
                                    >
                                        {rate}
                                    </Typography>
                                </Button>
                            ))}
                        </Grid>
                    </Popover>
                    <IconButton
                        onClick={onToggleFullScreen}
                        className={classes.bottomIcons}
                    >
                        <FullScreenIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </div >
    );
});

export default PlayerControls;
