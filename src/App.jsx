import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {} from 'react'
import Navbar from './components/Navbar'
import DisplayData from './components/DisplayData'
export default function(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path="user/:username" element={<DisplayData/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}