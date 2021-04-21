/* eslint-disable no-undef */
import {GoogleUser} from 'expo-google-sign-in';

enum ActionTypes {
  authenticated = 'auth_success',
  logOut = 'log_out',
}

interface AuthAction {
  type: ActionTypes.authenticated;
  payload: GoogleUser;
}

interface LogOutAction {
  type: ActionTypes.logOut;
  payload: null;
}

const authenticate = (user: GoogleUser): AuthAction => {
  return {
    type: ActionTypes.authenticated,
    payload: user,
  };
};

const logOut = (): LogOutAction => {
  return {
    type: ActionTypes.logOut,
    payload: null,
  };
};

export {authenticate, logOut, ActionTypes};

export type {AuthAction, LogOutAction};
