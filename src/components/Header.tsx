import { Link } from 'react-router-dom';

const Header = () => {
  const MENU_LIST = ["Calender","Chart","Follower","Setting","Log-out"]
  return(<>
    <header>
      <h3>DoneList</h3>
      <div>
        {MENU_LIST.map((item,index)=>{
          return(<Link to={item} key={index}>{item}</Link>)
        })}
      </div>
    </header>
  </>)}
export default Header