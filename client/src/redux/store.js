import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session';

import userReducers from "./userSlice";




const persistConfig = {
    key: 'root',
    storage : storageSession,
    whitelist: ['user'],
}

// combine all the reducers which are to be persisted
const rootReducer = combineReducers({
    user: userReducers,
})
   
// make a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
    reducer : persistedReducer,

});


const persistor = persistStore(store);

export {persistor};

export default store;