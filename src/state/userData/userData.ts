import { createSlice } from "@reduxjs/toolkit";

interface userinfoState {
    value: {
        credits: number,
        subscription: number,
        icons: [{key: string, url: string}] | []
    }
}

const initialState: userinfoState = {
    value: {
        credits: 0,
        subscription: -1,
        icons: []
    }
}

const userinfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfoState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setUserInfoState } = userinfoSlice.actions
export default userinfoSlice.reducer