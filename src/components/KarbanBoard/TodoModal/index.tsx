import { useCallback, useState } from 'react';

import categories from '../../../assets/json/category_data.json';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { contextState, modalState, toDoState } from '../../../recoil/store';

const level = ["HIGH", "MEDIUM", "LOW"]
const status = ["TODO", "IN PROGRESS", "DONE"]

const TodoModal = () : JSX.Element => {

  const [toDo, setToDo] = useRecoilState(toDoState);
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [context, setContext] = useRecoilState(contextState);
  const resetContext = useResetRecoilState(contextState);

  const onCloseModal = useCallback((): void => {
    setIsModal(false);
    resetContext();
  }, [modalState]);

  const onAddToDo = () => {
    const existingToDoIndex = toDo.findIndex(item => item.id === context.id);
  
    if (existingToDoIndex !== -1) {
        // 동일한 id가 있는 경우(기존의 ToDoItem을 수정하는 경우) 해당 객체를 업데이트
        const updatedToDo = [...toDo];
        updatedToDo[existingToDoIndex] = context;
        setToDo(updatedToDo);
    } else {
        // id가 없는 경우(새로운 ToDoItem을 추가하는 경우) 새로운 객체 추가
        setToDo([...toDo, context]);
    }

    resetContext();
    setIsModal(false);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setContext({
      ...context,
      [name]: value
    });
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
                value={context.title}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <select 
              name ="category" 
              className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
              defaultValue={context.category}
              onChange={handleInputChange}
              >
              {categories.map((category:any) => <option key={category.main_category_name} value={category.main_category_name}>{category.main_category_name}</option>)}
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
              defaultValue={context.level}
              onChange={handleInputChange}>
              {level.map((level:any) => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <select 
              name ="status" 
              className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
              defaultValue = {context.status}
              onChange={handleInputChange}
              >
              {status.map((status:any) => <option key={status} value={status}>{status}</option>)}
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