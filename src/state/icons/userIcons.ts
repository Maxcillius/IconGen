import { createSlice } from "@reduxjs/toolkit";

interface userIconsState {
    value: [{key: string, url: string}] | null
}

const initialState: userIconsState = {
    value: null
}

const userIconsSlice = createSlice({
    name: "userIcons",
    initialState,
    reducers: {
        setUserIconsState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setUserIconsState } = userIconsSlice.actions
export default userIconsSlice.reducer