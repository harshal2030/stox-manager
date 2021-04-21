import {combineReducers, createStore} from 'redux';
import {GoogleUser} from 'expo-google-sign-in';

import {authReducer} from './reducers/authReducer';

export interface StoreState {
  auth: GoogleUser | null;
}

const reducers = combineReducers<StoreState>({
  auth: authReducer,
});

export const store = createStore(reducers);
