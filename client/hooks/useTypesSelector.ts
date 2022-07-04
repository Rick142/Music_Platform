//Обыкновенный типизированный хук useSelector
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers";

//generic - корневое состояние из reducer
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector