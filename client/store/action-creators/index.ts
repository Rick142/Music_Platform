//Сливаем все action - creator в index файл
import * as PlayerActionCreators from '../action-creators/player';


export default {
    //Разворичиваем все action creator в export
    ...PlayerActionCreators
}