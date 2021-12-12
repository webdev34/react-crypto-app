import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoServices";
import { cryptoNewsApi } from "../services/cryptoNewsService";
import { cryptoExchangesApi } from "../services/cryptoExchangesService";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer
    } 
})