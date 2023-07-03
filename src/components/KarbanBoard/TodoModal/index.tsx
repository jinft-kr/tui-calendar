import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import categories from '../../../assets/json/category_data.json';
import { ToDo } from '../../../types/ToDo';

import { SetterOrUpdater } from 'recoil';

interface PropTypes {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  toDo: ToDo[];
  setToDo: SetterOrUpdater<ToDo[]>;
};

const level = ["HIGH", "MEDIUM", "LOW"]
const status = ["TODO", "IN PROGRESS", "DONE"]

const TodoModal = ({
  setIsModal,
  toDo,
  setToDo
}: PropTypes): JSX.Element => {

  const [modifyContents, setModifyContents] = useState<ToDo>({
    id: toDo.length > 0 ? toDo[toDo.length - 1].id + 1 : 0,
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
  });

  const onCloseModal = useCallback((): void => {
    setIsModal(false);
  }, [setIsModal]);

  const onAddToDo = () => {
    setToDo([...toDo, modifyContents]);
    setIsModal(false);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setModifyContents((prevContents) => ({
      ...prevContents,
      [name]: value
    }));
    console.log(JSON.stringify(modifyContents));
  };
  
  return (
    <>
      <div className='font-bold rounded-lg border-2 hover:opacity-70 border-blue-500 m-2 p-3'>
        <div className='todo'>
          <div className='flex flex-row'>
            <h3>Title</h3>
            <input
                type='text'
                placeholder='Todo 입력'
                name='title'
                value={modifyContents.title}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <select 
              name ="category" 
              className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
              value={modifyContents.category}
              onChange={handleInputChange}
              >
              {categories.map((category:any) => <option value={category.main_category_name}>{category.main_category_name}</option>)}
            </select>
          </div>
          <div>
            서브카테고리
          </div>
          <div>
            <h3>description</h3>
            <input
              name='description'
              type='text'
              placeholder='설명'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-row'>
            <h3>level</h3>
            <select 
              name ="level" 
              className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
              value={modifyContents.level}
              onChange={handleInputChange}>
              {level.map((level:any) => <option value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <select 
              name ="status" 
              className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
              value={modifyContents.status}
              onChange={handleInputChange}
              >
              {status.map((status:any) => <option value={status}>{status}</option>)}
            </select>
          </div>
          <button
            className='TodoModal-Contents-Button'
            onClick={onAddToDo}
          >
            저장하기
          </button>
          <button
            onClick={onCloseModal}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoModal;