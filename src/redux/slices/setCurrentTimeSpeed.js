import { createSlice } from '@reduxjs/toolkit'

const setCurrentTimeSpeed = createSlice({
    name: 'setCurrentTimeSpeed',
    initialState: {
        currentTime: 200,
    },
    reducers: {
        updateTime: (state, action) => {
            state.currentTime = action.payload
        },
    },
})

export const { updateTime } = setCurrentTimeSpeed.actions
export const setCurrentTimeSpeedSelector = (state) =>
    state.setCurrentTimeSpeed.currentTime
export default setCurrentTimeSpeed.reducer
