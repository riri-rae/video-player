import React, { useState, useEffect } from "react";
import VideoPlayer from "../src/components/VideoPlayer"
import Header from "./components/Header";
import { videoData } from "./components/data";

function App() {
  const [scrollNav, setScrollNav] = useState(false);

  const controlNav = () => {
    if (window.scrollY >= 10) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNav)

    return () => {
      window.removeEventListener('scroll', controlNav)
    }
  }, [])

  return (
    <>
      <Header scrollNav={scrollNav} />
      <VideoPlayer data={videoData} />
    </>
  );
}

export default App;
