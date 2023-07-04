import CardList from "./CardList";
import categories from '../../assets/json/category_data.json';
import { contextState, modalState, toDoState } from "../../recoil/store";

import { useRecoilState } from "recoil";
import TodoModal from "./TodoModal";
import { ToDo } from "../../types/ToDo";

const KarbanBoard = () => {

    const TODO_STATUS = ['TODO', 'IN PROGRESS', 'DONE'];

    const [ toDo, setToDo ] = useRecoilState(toDoState);
    const [ isModal, setIsModal ] = useRecoilState(modalState);
    const [ context, setContext ] = useRecoilState<ToDo>(contextState);
    

    const onAddModal =  () => {
      setContext({
        ...context,
        id : toDo.length <= 0 ? 0 : toDo[toDo.length - 1].id + 1 
      });
      setIsModal(true);
    };

    return(
      <>
        <div>
          <section className="flex ml-2 mr-2 pl-3 pr-3">
            <input 
                className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
                type="date"
            />
            <h3 className="p-1 font-bold text-center">~</h3>
            <input 
                className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'
                type="date"
            />
            <select name ="category" className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 m-2 p-3 shadow-md'>
              <option disabled selected>ALL</option>
              {categories.map((category:any) => <option key={category.id} value={category.main_category_name}>{category.main_category_name}</option>)}
            </select>
            <button 
              className="font-bold rounded-lg border-2 hover:opacity-70 border-none h-11 m-2 p-2 bg-blue-500 shadow-md" 
              onClick={onAddModal}>
              +
            </button>
          </section>
          <div className="ml-2 mr-2 pl-3 pr-3">
          {isModal && <TodoModal/>} 
          </div>
    </div>
    <div className='flex flex-row flex-grow m-2 p-3'>
    {
      TODO_STATUS.map((todo_status : string) => 
      <CardList 
        key={todo_status}
        title={todo_status} 
        cards={toDo.filter((card) => card.status === todo_status)}>
      </CardList>)
    }
    </div>
    </>
    )
}
export default KarbanBoard