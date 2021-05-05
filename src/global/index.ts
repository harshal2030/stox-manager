import {combineReducers, createStore} from 'redux';
import {GoogleUser} from 'expo-google-sign-in';

import {Item, Group} from '../db';
import {authReducer} from './reducers/authReducer';
import {groupReducer} from './reducers/groupReducer';
import {items} from './reducers/itemReducer';

export interface StoreState {
  auth: GoogleUser | null;
  items: Item[];
  groups: Group[];
}

const reducers = combineReducers<StoreState>({
  auth: authReducer,
  items,
  groups: groupReducer,
});

export const store = createStore(reducers);
