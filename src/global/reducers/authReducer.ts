import {GoogleUser} from 'expo-google-sign-in';
import {ActionTypes, LogOutAction, AuthAction} from '../actions/auth';

type State = GoogleUser | null;
type Action = LogOutAction | AuthAction;

export const authReducer = (state: State = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.authenticated:
      return action.payload;
    default:
      return state;
  }
};
