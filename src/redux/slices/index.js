import { combineReducers } from 'redux'

import setCurrentArray from './setCurrentArray'
import setCurrentTimeSpeed from './setCurrentTimeSpeed'

const rootReducer = combineReducers({
    setCurrentArray,
    setCurrentTimeSpeed,
})

export default rootReducer
