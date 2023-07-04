import { useRecoilState } from "recoil";
import { contextState, modalState, toDoState } from "../../recoil/store";
import { useCallback } from "react";
import { ToDo } from "../../types/ToDo";

const Card = ({id, title, category, status, start_date, end_date, level}:any) => {

  const [isModal, setIsModal] = useRecoilState(modalState);
  const [context, setContext] = useRecoilState(contextState);
  const [ toDo, setToDo ] = useRecoilState(toDoState);
  
  const onDelete = useCallback((id: number) => {
    // 매개변수로 받은 id와 동일하지 않는 객체들만 필터링
    setToDo(toDo.filter((todo: ToDo) => todo.id !== id));
  }, [setToDo, toDo]);
  
  const onUpdate =  () => {
    setContext({
      id: id,
      title: title,
      category: category,
      sub_category: '',
      description: '',
      level: level,
      status: status,
      start_date: start_date,
      end_date: end_date,
      date_pattern: '',
      repeat: false,
      follwer: [],
      location: '',
      feedback: ''
    });
    setIsModal(true);
  }

  return (
    <div className='flex-column flex-1 p-3 m-2 border-2 border-gray rounded-lg hover:bg-gray-100'>
      <div className='font-bold'>
        {title}
      </div>
      <div className='flex flex-row text-sm font-bold'>
        <div className='pl-2 pr-2 mr-2 bg-blue-500 border-none text-white rounded-lg'>{category}</div>
        {/* <div>{start_date} ~ {end_date}</div> */}
        <div 
          className='pl-2 pr-2 ml-2 border-none text-white rounded-lg' 
          style={{backgroundColor: level === "HIGH" ? "red" : level == "MEDIUM" ? "green" : level == "LOW" ? "yellow" : "transparent"}}
        >
        {level}
        </div>
        <button 
          className='pl-2 pr-2 mr-2 bg-blue-500 border-none text-white rounded-lg' 
          onClick={()=>onDelete(id)}>
          삭제
        </button>
        <button 
          className='pl-2 pr-2 mr-2 bg-blue-500 border-none text-white rounded-lg' 
          onClick={onUpdate}>
          수정
        </button>
      </div>
    </div>
  )
}
export default Card