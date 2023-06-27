import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import DoneCalender from './pages/calender';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([{
  path:"/", element:<App/>,
  children: [
    { path:"/calender", element:<DoneCalender view={'month'}/> },
    { path:"*", element:<NotFound/>}
  ]
}])
export default router