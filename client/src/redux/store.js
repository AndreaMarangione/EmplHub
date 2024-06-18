import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import menuReducer from './menuMobileSlice';

export const rootReducer = combineReducers({
    sessionState: sessionReducer,
    menuState: menuReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}
