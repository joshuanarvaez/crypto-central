// This file holds our entire application's state. 
import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({
    reducer: {    
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});