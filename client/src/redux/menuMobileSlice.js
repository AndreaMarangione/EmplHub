import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showMenu: false,
}
const menuSlice = createSlice({
    name: 'mobileMenu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.showMenu = !state.showMenu;
        }
    }
})

export const showMenu = state => state.menuState.showMenu;
export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
