import {} from 'react'
import {Outlet} from 'react-router-dom'
import FormElement from './FormElement'
export default function(){
    return(
        <>
        <nav>
            <div className="logo">Github Analyzer</div>
            <FormElement/>
        </nav>
        <Outlet/>
        </>
    )
}