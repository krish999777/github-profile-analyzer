import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {} from 'react'
import Navbar from './components/Navbar'
import DisplayData from './components/DisplayData'
import Details from './components/Details'
import Repo from './components/Repo'
import Analysis from './components/Analysis'
export default function(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path=":username" element={<DisplayData/>}>
                        <Route index element={<Details/>}/>
                        <Route path="repo" element={<Repo/>}/>
                        <Route path="analysis" element={<Analysis/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}