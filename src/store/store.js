import { configureStore } from "@reduxjs/toolkit";
import  calcItemSlice  from "../slices/calcItemSlice";

export const store = configureStore({
    reducer: {
        calcItem: calcItemSlice,
        // constructorItem: constructorItemSlice,
    }
})