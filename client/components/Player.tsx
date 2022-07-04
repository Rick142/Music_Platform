//Компонент плеера
import React, { useEffect } from "react";
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import styles from '../styles/Player.module.scss';
import { ITrack } from "../types/track";
import { Card, IconButton, Grid } from "@material-ui/core";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypesSelector";
import { useActions } from "../hooks/useActions";


//Работа с аудио файлами. Объект audio
let audio: any;

const Player = () => {
    //Получаем состояние проигрывания трека
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()


    useEffect(() => {
      if (!audio){
        audio = new Audio()
      } else {
        setAudio()
        play()
      }
    }, [active])

    //Логика с инициализацией функций
    const setAudio = () => {
      if (active){
        //В качестве ссылки на то, что проигрываем, указываем ссылку на файл на сервере
        audio.src = 'http://localhost:5000/' + active.audio;
        audio.volume = volume / 100;//Звук изначально вкручен в половину
        audio.onloadedmetadata = () => {
          setDuration(Math.ceil(audio.duration));
        }
        audio.ontimeupdate = () => {
          setCurrentTime(Math.ceil(audio.currentTime));
        }
      }
    }

const play = () => {
  if (pause){
    playTrack()
    audio.play()
  } else {
    pauseTrack();
    audio.pause();
  }
}

const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
  audio.volume = Number(e.target.value) / 100;//Звук варьируется от 0 до 1
  setVolume(Number(e.target.value))
}

const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
  audio.currentTime = Number(e.target.value);//Звук варьируется от 0 до 1
  setCurrentTime(Number(e.target.value))
}

if (!active) {
  return null;
}


  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress left={volume} right={100} onChange={changeVolume}/>
    </div>
  );
};

export default Player;
