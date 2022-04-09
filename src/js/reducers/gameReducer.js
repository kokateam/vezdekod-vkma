import { createSlice } from "@reduxjs/toolkit";

export const gameReducer = createSlice({
    name: "game",
    initialState: {
        memberCount: "3",
        isError: false,
        members: [],
        activeMember: 0,
        location: {
            "name": "Театр",
            "photo":  "https://meme-police.ru/spyfall/location/spyfall1/0.jpg",
            "job": ["Зритель", "Кассир", "Гардеробщик", "Актер", "Буфетчик", "Охранщик"]
        },
    },
    reducers: {
        set: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        setNameMember: (state, action) => {
            state.members[action.payload.index].name = action.payload.value;
        },
    },
});

export const { set, setNameMember } = gameReducer.actions;
export default gameReducer.reducer;