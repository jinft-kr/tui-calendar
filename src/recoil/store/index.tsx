import {atom} from 'recoil';

import todo_data from '../../assets/json/todo_data.json'
import { ToDo } from '../../types/ToDo';

export const toDoState = atom<ToDo[]>({
    key: 'toDoState',
    default: todo_data
});