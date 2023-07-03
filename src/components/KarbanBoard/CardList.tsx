import { ToDo } from "../../types/ToDo";

import { useCallback } from "react";

import Card from "./Card";
import { useRecoilState } from "recoil";
import { toDoState } from "../../recoil/store";


const CardList = ({title, cards}:any) => {

    const [ toDo, setToDo ] = useRecoilState(toDoState);
  
    const onDelete = useCallback((id: number) => {
      // 매개변수로 받은 id와 동일하지 않는 객체들만 필터링
      setToDo(toDo.filter((todo: ToDo) => todo.id !== id));
    }, [setToDo, toDo]);

    return (
      <div className='m-2 p-3flex-column flex-1 border-2 border-gray rounded-lg shadow-md'>
        <h1 className='m-2 p-3 font-bold text-white bg-blue-500 text-center rounded-lg' >{title}</h1>
        <div>
          {cards.map((card:any) => <Card 
                                      key={card.id}
                                      id={card.id}
                                      title={card.title}
                                      category={card.category}
                                      start_date={card.start_date}
                                      end_date={card.end_date}
                                      level={card.level}
                                      onDelete={onDelete}
          />)}
        </div>
      </div>
    )
  }
  export default CardList