import { combineReducers } from 'redux'
import ReducerSession from './ReducerSession'

const ReducerRoot = combineReducers({
    Session: ReducerSession
})

export default ReducerRoot