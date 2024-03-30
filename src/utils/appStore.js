import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
    reducer: { // this is the big main reducer of appStore which will have all the small reducers of different slices 
        cart: cartReducer //each slice will have its own reducer
    }
})

export default appStore;