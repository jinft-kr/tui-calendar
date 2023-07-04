import follwer_data from '../../../assets/json/follower_data.json';
import category_data from '../../../assets/json/category_data.json';

import { useState } from 'react';

const Navbar = () => {
  // 카테고리 state
  const [category, setCategory] = useState(category_data);
  // 팔로워 state
  const [ follower, setFollwer] = useState(follwer_data);

  return (
    <>
      <div className='mr-4'>
        <div className='border-2 border-gray-300 p-4 my-3 rounded-lg shadow-md'>
          <h1 className='text-center font-bold text-blue-700'>카테고리</h1>
          {
            category.map(category => (
              <h3 key={category.id}>{category.main_category_name}</h3>
            ))
          }
        </div>
        <div className='border-2 border-gray-300 p-4 my-5 rounded-lg shadow-md'>
          <h1 className='text-center font-bold text-blue-700'>팔로워</h1>
          {
          follower.map(follower => (
            <h3 key={follower.id}>{follower.user_name}</h3>
          ))
          }
        </div>
      </div>
    </>
  )
}

export default Navbar;