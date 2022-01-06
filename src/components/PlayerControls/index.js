import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TopControl from "./TopControl";
import MiddleControl from './MiddleControl'
import BottomControl from "./BottomControl";

const useStyles = makeStyles({
    controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    }
});


const PlayerControls = (ref) => {
    const classes = useStyles();

    return (
        <div className={classes.controlsWrapper} ref={ref}>
            <TopControl />
            <MiddleControl />
            <BottomControl />
        </div>
    )
};

export default PlayerControls;
