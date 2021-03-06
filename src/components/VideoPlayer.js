import React, { useState, useRef } from "react";
import { Container } from "@mui/material";
import ReactPlayer from "react-player";
import styled from "styled-components";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";
import BookmarkCollection from "./BookmarkCollection";
import Description from "./Description";

const VideoTitle = styled.div`
  text-align: center;
  color: #fff;
  margin-top: 5rem;
`;

const Hero = styled.div`
  position: relative;
  margin-top: -6rem;
`;
const PlayerWrapper = styled.div`
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0.6);
  position: relative;
`;

const MainBackground = styled.div`
  padding: 2rem 0 2rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  &:after {
    top: 0px;
    left: 0px;
    z-index: -1;
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: blur(5px);
    background-image: url(./images/Big.Buck.Bunny.-.Opening.Screen.png);
  }
`;

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

const VideoPlayer = ({ data }) => {
    const { title, url, description } = data;
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
    const { playing, muted, playbackRate, played, volume } = state;

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
        if (count > 2) {
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
        controlsRef.current.style.visibility = "visible";
        count = 0;
    };
    return (
        <>
            <Hero>
                <MainBackground>
                    <VideoTitle>
                        <h1>{title}</h1>
                    </VideoTitle>
                    <Container maxWidth="md">
                        <PlayerWrapper
                            ref={playerContainerRef}
                            onMouseMove={handleMouseMove}
                        >
                            <ReactPlayer
                                ref={playerRef}
                                width={"100%"}
                                height="100%"
                                url={url}
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
                                elapsedTime={elapsedTime}
                                totalDuration={totalDuration}
                                onChangeDispayFormat={handleDisplayFormat}
                                onBookmark={addBookmark}
                                ref={controlsRef}
                            />
                        </PlayerWrapper>
                    </Container>
                </MainBackground>
            </Hero>
            <Description description={description} />
            <BookmarkCollection
                bookmarks={bookmarks}
                canvasRef={canvasRef}
                playerRef={playerRef}
                controlsRef={controlsRef}
            />
        </>
    );
};

export default VideoPlayer;
