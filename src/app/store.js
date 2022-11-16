import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

// This file holds our entire application's state. 
export default configureStore({
    reducer: {    
        [cryptoApi.reducerPath]: cryptoApi.reducer, // 3) add reducer
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // 3) add reducer
    },
});