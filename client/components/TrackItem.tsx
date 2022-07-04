import React from "react";
import { ITrack } from "../types/track";
import { Card, IconButton, Grid } from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Image, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useDispatch } from "react-redux";
import { deleteTrack } from "../store/action-creators/track";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const {playTrack, pauseTrack, setActiveTrack} = useActions();
  const dispatch = useDispatch()

  const play = (e: any) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack()
  }

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        style={{ marginLeft: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Delete/>
      </IconButton>
    </Card>
  );
};

export default TrackItem;
