import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./js/reducers/mainReducer";
import gameReducer from "./js/reducers/gameReducer";
import locationsReducer from "./js/reducers/locationsReducer";

export const store = configureStore({
    reducer: {
        main: mainReducer,
        game: gameReducer,
        locations: locationsReducer,
    },
});