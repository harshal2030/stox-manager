/* eslint-disable no-undef */
import {Group} from '../../db';

enum ActionTypes {
  setGroups = 'set_groups',
}

interface setGroupsAction {
  type: ActionTypes.setGroups;
  payload: Group[];
}

const setGroups = (groups: Group[]): setGroupsAction => {
  return {
    type: ActionTypes.setGroups,
    payload: groups,
  };
};

export {ActionTypes, setGroups};

export type {setGroupsAction};
