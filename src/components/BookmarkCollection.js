import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { makeStyles } from "@material-ui/core/styles";
import { BlockWrapper, BlockTitle, BlockText } from "./style/generalStyle";
import styled from "styled-components";

const NoBookmark = styled.div`
  color: #e5e5e5;
`;

const Text = styled.h4`
  color: #e5e5e5;
`;

const BookmarkRow = styled.div`
  display: flex;
  margin-bottom: 5rem;

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    border: none;
    margin: 2px 0;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    border: none;
    width: 2px;
    height: 2px;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
`;

const useStyles = makeStyles({
    BookmarkItems: {
        display: "flex",
        margin: "6px",
        marginBottom: "12px",
        paddingTop: "2px",
        cursor: "pointer",
        "&:hover": {
            transform: "translateY(-0.5rem)",
            transition: "all 0.5s ease-out 0s",
        },
    },
});

const BookmarkCollection = ({
    bookmarks,
    canvasRef,
    playerRef,
    controlsRef,
}) => {
    const classes = useStyles();

    return (
        <>
            <BlockWrapper>
                <Container maxWidth="md">
                    <BlockTitle>
                        <BookmarkBorderIcon />
                        <BlockText>Bookmark Collections</BlockText>
                    </BlockTitle>
                </Container>
                <Container maxWidth="lg">
                    {bookmarks.length !== 0 ? (
                        <BookmarkRow
                            container
                            style={{ marginTop: 4, flexWrap: "nowrap", overflow: "auto" }}
                        >
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
                                        <img
                                            crossOrigin="anonymous"
                                            src={bookmark.image}
                                            alt="img"
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </BookmarkRow>
                    ) : (
                        <Container maxWidth="md">
                            <NoBookmark>
                                <Text>Your Bookmarks are empty !</Text>
                            </NoBookmark>
                        </Container>
                    )}
                    <canvas ref={canvasRef} />
                </Container>
            </BlockWrapper>
        </>
    );
};

export default BookmarkCollection;
