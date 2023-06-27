import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import NotFound from './pages/NotFound';
import Calendar from './pages/calender/index';

const router = createBrowserRouter([{
  path:"/", element:<App/>,
  children: [
    { path:"/calender", element:<Calendar/> },
    { path:"*", element:<NotFound/>}
  ]
}])
export default router