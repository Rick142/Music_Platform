//Страница с треками
import { Grid, Card, Button, Box, TextField } from "@material-ui/core";
import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTracks} from '../../store/action-creators/track'
import { useDispatch } from "react-redux";


const Index = () => {
  const router = useRouter();
  //Треки указываем через интерфейс
  const {tracks, error} = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null)

  //Функция поиска песен
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer){
      clearTimeout(timer)
    }
    //Чтобы не спамить на сервер запросами, ставим таймер
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      })
    )
  }

  if (error) {
    return <MainLayout><h1>{error}</h1></MainLayout>
  }

  return (
    <>
      <MainLayout title={'Список треков'}>
        <Grid container justifyContent="center">
          <Card style={{ width: 900 }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h1>Список треков</h1>
                <Button onClick={() => router.push("/tracks/create")}>
                  Загрузить
                </Button>
              </Grid>
            </Box>
            <TextField
              fullWidth
              value={query}
              onChange={search}
            />
            <TrackList tracks={tracks} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};

export default Index;


//При отправке запросов в next необходимо использовать специальные функции
//getServerSideProps и getInitialProps
//В случае использования next с redux нужно использовать wrapper
export const getServerSideProps = wrapper.getServerSideProps((store) => 
  //Преобразуем dispatch
  async ({req, res}) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());
  }
)

