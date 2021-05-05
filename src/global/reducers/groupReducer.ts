import {Group} from '../../db';
import {setGroupsAction, ActionTypes} from '../actions/group';

type Action = setGroupsAction;

const groupReducer = (state: Group[] = [], action: setGroupsAction) => {
  switch (action.type) {
    case ActionTypes.setGroups:
      return action.payload;
    default:
      return state;
  }
};

export {groupReducer};
