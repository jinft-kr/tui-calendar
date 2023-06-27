import DoneCalender from '../../components/DoneCalender';
import KarbanBoard from '../../components/KarbanBoard/index';

const Calender = () => {
    return (
      <>
        <KarbanBoard/>
        <DoneCalender view={'month'}/>
      </>
    )
}
export default Calender