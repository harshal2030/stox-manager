import {Item} from '../../db';
import {ActionType, insertItemAction, getItemAction} from '../actions/items';

const items = (
  state: Item[] = [],
  action: insertItemAction | getItemAction,
) => {
  switch (action.type) {
    case ActionType.getItems:
      return action.payload;
    case ActionType.insertItem:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export {items};
