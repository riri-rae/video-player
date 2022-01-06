import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import PlayerControls from "../components/PlayerControls";
import screenfull from "screenfull";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    playerWrapper: {
        width: "100%",
        position: "relative",
    },
});

const format = (seconds) => {
    if (isNaN(seconds)) {
        return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
};

let count = 0;

const VideoPlayer = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        playing: true,
        muted: true,
        played: 0,
        playbackRate: 1.0,
        volume: 1,
    });

    const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
    const [bookmarks, setBookmarks] = useState([]);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    const {
        playing,
        muted,
        playbackRate,
        played,
        volume,
    } = state;

    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing });
    };
    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const handleMute = () => {
        setState({ ...state, muted: !state.muted });
    };

    const handleVolumeSeekUp = (e, newValue) => {
        setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
    };
    const handleVolumeChange = (e, newValue) => {
        // console.log(newValue);
        setState({
            ...state,
            volume: parseFloat(newValue / 100),
            muted: newValue === 0 ? true : false,
        });
    };

    const handlePlaybackRate = (rate) => {
        setState({ ...state, playbackRate: rate });
    };

    const toggleFullScreen = () => {
        screenfull.toggle(playerContainerRef.current);
    };

    const handleProgress = (changeState) => {
        if (count > 3) {
            controlsRef.current.style.visibility = "hidden";
            count = 0;
        }
        if (controlsRef.current.style.visibility === "visible") {
            count += 1;
        }
        if (!state.seeking) {
            setState({ ...state, ...changeState });
        }
    };

    const handleSeekChange = (e, newValue) => {
        console.log({ newValue });
        setState({ ...state, played: parseFloat(newValue / 100) });
    };

    const handleSeekMouseDown = (e) => {
        setState({ ...state, seeking: true });
    };

    const handleSeekMouseUp = (e, newValue) => {
        // console.log({ value: e.target });
        setState({ ...state, seeking: false });
        // console.log(sliderRef.current.value)
        playerRef.current.seekTo(newValue / 100, "fraction");
    };

    const handleDuration = (duration) => {
        setState({ ...state, duration });
    };

    const addBookmark = () => {
        const canvas = canvasRef.current;
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            playerRef.current.getInternalPlayer(),
            0,
            0,
            canvas.width,
            canvas.height
        );
        const dataUri = canvas.toDataURL();
        canvas.width = 0;
        canvas.height = 0;
        const bookmarksCopy = [...bookmarks];
        bookmarksCopy.push({
            time: playerRef.current.getCurrentTime(),
            display: format(playerRef.current.getCurrentTime()),
            image: dataUri,
        });
        setBookmarks(bookmarksCopy);
    };

    const currentTime =
        playerRef && playerRef.current
            ? playerRef.current.getCurrentTime()
            : "00:00";

    const duration =
        playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

    const elapsedTime =
        timeDisplayFormat === "normal"
            ? format(currentTime)
            : `-${format(duration - currentTime)}`;

    const totalDuration = format(duration);

    const handleDisplayFormat = () => {
        setTimeDisplayFormat(
            timeDisplayFormat === "normal" ? "remaining" : "normal"
        );
    };

    const handleMouseMove = () => {
        console.log("mousemove");
        controlsRef.current.style.visibility = "visible";
        count = 0;
    };
    return (
        <>
            <Container maxWidth="md">
                <div
                    ref={playerContainerRef}
                    className={classes.playerWrapper}
                    onMouseMove={handleMouseMove}
                >
                    <ReactPlayer
                        ref={playerRef}
                        width={"100%"}
                        height="100%"
                        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        muted={muted}
                        playing={playing}
                        volume={volume}
                        playbackRate={playbackRate}
                        onProgress={handleProgress}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: "anonymous",
                                },
                            },
                        }}
                    />
                    <PlayerControls
                        onPlayPause={handlePlayPause}
                        playing={playing}
                        onRewind={handleRewind}
                        onFastForward={handleFastForward}
                        muted={muted}
                        onMute={handleMute}
                        onVolumeChange={handleVolumeChange}
                        onVolumeSeekUp={handleVolumeSeekUp}
                        volume={volume}
                        playbackRate={playbackRate}
                        onPlaybackRateChange={handlePlaybackRate}
                        onToggleFullScreen={toggleFullScreen}
                        onProgress={handleProgress}
                        played={played}
                        onSeek={handleSeekChange}
                        onSeekMouseDown={handleSeekMouseDown}
                        onSeekMouseUp={handleSeekMouseUp}
                        onDuration={handleDuration}
                        elapsedTime={elapsedTime}
                        totalDuration={totalDuration}
                        onChangeDispayFormat={handleDisplayFormat}
                        onBookmark={addBookmark}
                        ref={controlsRef}
                    />
                </div>
                <Grid container style={{ marginTop: 20 }} spacing={3}>
                    {bookmarks.map((bookmark, index) => (
                        <Grid key={index} item>
                            <Paper>
                                <Typography >
                                    Bookmark
                                </Typography>
                            </Paper>
                            <Paper
                                onClick={() => {
                                    playerRef.current.seekTo(bookmark.time);
                                }}
                            >
                                <img crossOrigin="anonymous" src={bookmark.image} alt='img' />
                                <Typography >
                                    At {bookmark.display}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <canvas ref={canvasRef} />

            </Container>


        </>
    )
}

export default VideoPlayer
