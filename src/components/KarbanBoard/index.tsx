import CardList from "./CardList";
import cards from '../../assets/json/todo_data.json';
import categories from '../../assets/json/category_data.json';

const KarbanBoard = () => {

    const TODO_STATUS = ['TODO', 'IN PROGRESS', 'DONE'];

    return(
      <>
        <div>
          <section className="flex ml-2 mr-2 pl-3 pr-3" id="button_part">
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
              {categories.map((category:any) => <option value={category.main_category_name}>{category.main_category_name}</option>)}
            </select>
          </section>
    </div>
    <div className='flex flex-row flex-grow m-2 p-3'>
        {TODO_STATUS.map((todo_status : string) => <CardList key={todo_status} title={todo_status} cards={cards.filter((card) => card.status === todo_status)}></CardList>)}
    </div>
    </>
    )
}
export default KarbanBoard