/* eslint-disable no-undef */
import {Item} from '../../db';

enum ActionType {
  getItems = 'get_items',
  updateItem = 'update_item',
  deleteItem = 'delete_item',
  insertItem = 'insert_item',
}

type getItemAction = {
  type: ActionType.getItems;
  payload: Item[];
};

type insertItemAction = {
  type: ActionType.insertItem;
  payload: Item;
};

const getItems = (items: Item[]): getItemAction => {
  return {
    type: ActionType.getItems,
    payload: items,
  };
};

const insertItem = (item: Item): insertItemAction => {
  return {
    type: ActionType.insertItem,
    payload: item,
  };
};

export {insertItem, getItems, ActionType};

export type {insertItemAction, getItemAction};
