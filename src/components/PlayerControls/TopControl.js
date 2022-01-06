import React, { forwardRef } from "react";
import { Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const TopControl = forwardRef(({
    onBookmark
}) => {

    return (
        <>
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

        </>
    );
});

export default TopControl;
