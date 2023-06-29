import CardList from "./CardList";
import cards from '../../assets/json/todo_data.json';

const KarbanBoard = () => {
    return(
        <div className='flex flex-row flex-grow m-2 p-3'>
            <CardList key='Todo' title={'ToDo'} cards={cards.filter((card) => card.status == 'ToDo')}></CardList>
            <CardList key='Doing' title={'Doing'} cards={cards.filter((card) => card.status == 'Doing')}></CardList>
            <CardList key='Done' title={'Done'} cards={cards.filter((card) => card.status == 'Done')}></CardList>
        </div>
    )
}
export default KarbanBoard