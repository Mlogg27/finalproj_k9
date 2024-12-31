import {RootState} from './store'
const getInputting = (state :RootState ) => state.inputting;

const getRequests = (state: RootState) => state.requests;

export {getInputting, getRequests};