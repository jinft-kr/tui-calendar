import { Dispatch, SetStateAction, useCallback } from 'react';

import categories from '../../../assets/json/category_data.json';
import { ToDo } from '../../../types/ToDo';

interface PropTypes {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  onModifyTodo: () => void;
};

const level = ["HIGH", "MEDIUM", "LOW"]
const status = ["TODO", "IN PROGRESS", "DONE"]

const TodoModal = ({
  setIsModal,
  onModifyTodo
}: PropTypes): JSX.Element => {

  const onCloseModal = useCallback((): void => {
    setIsModal(false);
  }, [setIsModal]);
  
  return (
    <>
      <div onClick={onCloseModal}></div>
      <div>
        <div>
          <div>Todo 추가하기</div>
        </div>

        <div className='TodoModal-Contents'>
          <div className='flex flex-row'>
            <h3>Title</h3>
            <input
                type='text'
                placeholder='Todo 입력'
            />
          </div>
          <div>
            <select name ="category" className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'>
              {categories.map((category:any) => <option value={category.main_category_name}>{category.main_category_name}</option>)}
            </select>
          </div>
          <div>
            서브카테고리
          </div>
          <div>
            <h3>description</h3>
            <input
                type='text'
                placeholder='설명'
            />
          </div>
          <div className='flex flex-row'>
            <h3>level</h3>
            <select name ="level" className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'>
              {level.map((level:any) => <option value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <select name ="status" className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'>
              {status.map((status:any) => <option value={status}>{status}</option>)}
            </select>
          </div>
          <button
            className='TodoModal-Contents-Button'
            onClick={onModifyTodo}
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