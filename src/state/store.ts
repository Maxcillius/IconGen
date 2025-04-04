import { configureStore } from "@reduxjs/toolkit"
import popupReducer from "./popup/popup"
import styleReducer from "./styles/style"
import userInfoReducer from "./userData/userData"
import userIconsReducer from "./icons/userIcons"

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        style: styleReducer,
        userInfo: userInfoReducer,
        userIcons: userIconsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch