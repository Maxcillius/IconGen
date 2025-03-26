import { configureStore } from "@reduxjs/toolkit"
import popupReducer from "./popup/popup"
import styleReducer from "./styles/style"
import subscriptionReducer from "./subscription/subscription"

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        style: styleReducer,
        subscription: subscriptionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch