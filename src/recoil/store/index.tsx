import {atom} from 'recoil';

import todo_data from '../../assets/json/todo_data.json'
import { ToDo } from '../../types/ToDo';

export const toDoState = atom<ToDo[]>({
    key: 'toDoState',
    default: todo_data
});

export const modalState = atom<boolean>({
    key : 'modalState',
    default : false
})

export const contextState = atom<ToDo>({
    key: 'contextState',
    default : {
        id: 0,
        title: '',
        category: '',
        sub_category: '',
        description: '',
        level: '',
        status: 'TODO',
        start_date: '',
        end_date: '',
        date_pattern: '',
        repeat: false,
        follwer: [],
        location: '',
        feedback: ''
      }
})