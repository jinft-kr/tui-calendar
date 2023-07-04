import ToDoCalender from '../../components/ToDoCalender';
import KarbanBoard from '../../components/KarbanBoard';

const Calender = () => {
    return (
      <>
        <KarbanBoard/>
        <ToDoCalender view={'month'}/>
      </>
    )
}
export default Calender