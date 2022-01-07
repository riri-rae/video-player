import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { makeStyles } from "@material-ui/core/styles";

const BookmarkTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding-top: 3rem;
  color: #e5e5e5;
`;

const BookmarkText = styled.h2`
  margin-left: 8px;
  color: #e5e5e5;

`;

const BookmarkWrapper = styled.div`
  background-color: rgb(20, 20, 20);
  height: 100vh;
`;

const useStyles = makeStyles({
    BookmarkItems: {
        display: "flex",
        margin: "6px",
        cursor: "pointer",
        "&:hover": {
            transform: "translateY(-0.5rem)",
            transition: "all 0.5s ease-out 0s",
        },
    },
});

const BookmarkCollection = ({ bookmarks, canvasRef, playerRef, controlsRef }) => {
    const classes = useStyles();

    return (
        <>
            <BookmarkWrapper>
                <Container maxWidth="md">
                    <BookmarkTitle>
                        <BookmarkBorderIcon />
                        <BookmarkText>Bookmark Collections</BookmarkText>
                    </BookmarkTitle>
                    <Grid container style={{ marginTop: 20 }} spacing={3}>
                        {bookmarks.map((bookmark, index) => (
                            <Grid key={index} item className={classes.BookmarkItems}>
                                <Paper
                                    onClick={() => {
                                        playerRef.current.seekTo(bookmark.time);
                                        controlsRef.current.style.visibility = "visible";

                                        setTimeout(() => {
                                            controlsRef.current.style.visibility = "hidden";
                                        }, 1000);
                                    }}
                                    elevation={3}
                                >
                                    <Typography variant="body2" align="center" margin="8px">
                                        Bookmark at {bookmark.display}
                                    </Typography>
                                    <img crossOrigin="anonymous" src={bookmark.image} alt="img" />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    <canvas ref={canvasRef} />
                </Container>
            </BookmarkWrapper>
        </>
    )
}

export default BookmarkCollection
