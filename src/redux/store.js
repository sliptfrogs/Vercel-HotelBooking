import { configureStore } from "@reduxjs/toolkit";
import storeReducer from './features/store/storeActions.js'
import UserAuthSlice from './features/authAction/authActions'
const store = configureStore({
    reducer: {
        store: storeReducer,
        user: UserAuthSlice
    }
})
export default store