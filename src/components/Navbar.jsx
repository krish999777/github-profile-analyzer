import {} from 'react'
import {Outlet,Link} from 'react-router-dom'
import FormElement from './FormElement'
import { FaGithub } from "react-icons/fa";
export default function(){
    return(
        <>
        <nav>
            <Link className="logo-link"to="/">
                <div className="logo"><FaGithub/>Github Analyzer</div>
            </Link>
            <FormElement/>
        </nav>
        <Outlet/>
        </>
    )
}