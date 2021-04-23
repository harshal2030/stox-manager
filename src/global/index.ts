import {combineReducers, createStore} from 'redux';
import {GoogleUser} from 'expo-google-sign-in';

import {Item} from '../db';
import {authReducer} from './reducers/authReducer';
import {items} from './reducers/itemReducer';

export interface StoreState {
  auth: GoogleUser | null;
  items: Item[];
}

const reducers = combineReducers<StoreState>({
  auth: authReducer,
  items,
});

export const store = createStore(reducers);
