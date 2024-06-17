import { combineReducers, configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuMobileSlice';

export const rootReducer = combineReducers({
    menuState: menuReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}
