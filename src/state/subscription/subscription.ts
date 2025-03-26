import { createSlice } from "@reduxjs/toolkit";

interface SubscriptionState {
    value: number
}

const initialState: SubscriptionState = {
    value: 0
}

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        setSubscriptionState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setSubscriptionState } = subscriptionSlice.actions
export default subscriptionSlice.reducer