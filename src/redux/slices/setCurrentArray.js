import { createSlice } from '@reduxjs/toolkit'

const setCurrentArray = createSlice({
    name: 'setCurrentArray',
    initialState: {
        currentArray: [],
    },
    reducers: {
        updateArray: (state, action) => {
            state.currentArray = action.payload
        },
    },
})

export const { updateArray } = setCurrentArray.actions
export const setCurrentArraySelector = (state) => state.setCurrentArray.currentArray
export default setCurrentArray.reducer
