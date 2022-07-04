import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"
import axios from 'axios'


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            //Отправка запроса на сервер
            const response = await axios.get('http://localhost:5000/tracks')
            //Если запрос успешен
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        }catch(e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}

//Поиск треков
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            //Отправка запроса на сервер
            const response = await axios.get('http://localhost:5000/tracks/')
            //Если запрос успешен
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        }catch(e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}