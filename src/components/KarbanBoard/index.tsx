import CardList from "./CardList";
import { contextState, modalState, toDoState } from "../../recoil/store";

import { useRecoilState } from "recoil";

import Header from "./Header";

const KarbanBoard = () => {

    const TODO_STATUS = ['TODO', 'IN PROGRESS', 'DONE'];

    const [ toDo, setToDo ] = useRecoilState(toDoState);
    
  return(
    <>
      <div className='flex flex-col m-2 p-3'> 
        <Header/>
        <div className="flex flex-row">
        {
          TODO_STATUS.map((todo_status : string) => 
          <CardList 
            key={todo_status}
            title={todo_status} 
            cards={toDo.filter((card) => card.status === todo_status)}>
          </CardList>)
        }
        </div>
      </div>
  </>
  )
}

export default KarbanBoard