import { Link } from 'react-router-dom';

const Header = () => {
  const menuList = ["Calender","Chart","Follower","Setting","Log-out"]
  return(<>
    <header>
      <h3>DoneList</h3>
      <div>
        {menuList.map((item,index)=>{
          return(<Link to={item} key={index}>{item}</Link>)
        })}
      </div>
    </header>
  </>)}
export default Header