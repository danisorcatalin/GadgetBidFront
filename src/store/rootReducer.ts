import { combineReducers } from '@reduxjs/toolkit';

const initialReducer = (state = []) => {
  return state;
};

const rootReducer = combineReducers({
  initialReducer,
});

export default rootReducer;
