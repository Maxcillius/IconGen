import { createSlice } from "@reduxjs/toolkit"

interface PopupState {
    value: boolean
}

const initialState: PopupState = {
    value: false
}

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        setPopupState: (state) => {
            state.value = !state.value
        }
    }
})

export const { setPopupState } = popupSlice.actions

export default popupSlice.reducer