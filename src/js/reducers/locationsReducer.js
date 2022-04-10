import { createSlice } from "@reduxjs/toolkit";
import locations from "../../data/locations.json";

export const locationsReducer = createSlice({
    name: "locations",
    initialState: {
        locations: locations,
        editData: {},
        changePositions: false,
    },
    reducers: {
        set: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

export const { set } = locationsReducer.actions;
export default locationsReducer.reducer;