import React, { useState, useEffect, useContext } from "react";
import { AudioContext } from "../../context/AppContext";
import { Container, IconButton, Box, Slider } from "@mui/material";
import { formatMMSS } from "../../helpers/formatMMSS";
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayBar = () => {
  const { currentTrack, isPlaying, audio, setAudio} = useContext(AudioContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setValue(Math.floor(audio.currentTime));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying, audio]);

  const handleSliderChange = (_, newValue) => {
    const newTime = (newValue / 100) * currentTrack.duration;
    audio.currentTime = newTime;
    setValue(newTime);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 0,
        height: 150,
        background: "teal",
        alignItems: "center",
        padding: "40px 0"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => {
                        setAudio(currentTrack);
                    }}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </IconButton>
          <img width={80}  style={{margin:"0 10px"}}  src={currentTrack?.preview} alt="" />
          <div>
            <h4 style={{color:"#fff"}}>{currentTrack?.artists}</h4>
            <p style={{color:"#fff"}}>{currentTrack?.title}</p>
          </div>
          <p style={{ width: "100px",color:"#fff" , fontSize:"20px" }}>{formatMMSS(value)}</p>
          <Slider
            value={(value / currentTrack.duration) * 100}
            onChange={handleSliderChange}
            min={0}
            max={100}
          />
          <p style={{ width: "100px", marginLeft: "10px",color:"#fff" , fontSize:"20px" }}>
            {formatMMSS(currentTrack.duration - value)}
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default PlayBar;


