import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import VideoPlayer from "../src/components/VideoPlayer"



function App() {


  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">React Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <VideoPlayer />
    </>
  );
}

export default App;
