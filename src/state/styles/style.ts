import { createSlice } from "@reduxjs/toolkit"

interface StyleState {
    value: string
}

const initialState: StyleState = {
    value: ""
}

const styleSlice = createSlice({
    name: "style",
    initialState,
    reducers: {
        setStyleState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setStyleState } = styleSlice.actions
export default styleSlice.reducer