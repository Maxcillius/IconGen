import { createSlice } from "@reduxjs/toolkit";

interface userinfoState {
    value: {
        email: string,
        username: string,
        firstname: string,
        middlename: string,
        lastname: string,
        credits: number,
        uid: string,
        subscription: number
    }
}

const initialState: userinfoState = {
    value: {
        email: "",
        username: "",
        firstname: "",
        middlename: "",
        lastname: "",
        credits: 0,
        uid: "",
        subscription: -1
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