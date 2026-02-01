import {useParams,NavLink,Outlet} from 'react-router-dom'
import {useEffect,useState} from 'react'
export default function(){
    const [userData,setUserData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const params=useParams()
    const username=params.username
    useEffect(()=>{
        setError(null)
        setLoading(true)
        fetch(`https://api.github.com/users/${username}`)
        .then(res=>{
            if(!res.ok){
                throw new Error('User not found!')
            }
            return res.json()
        })
        .then(data=>setUserData(data))
        .catch(error=>{
            setError(error.message)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[username])
    if(error){

        return(
        <div className="user-data-container">
            <h1>{error}</h1>
        </div>
    )
    }
    if(loading||!userData){
        return(<h1>Loading...</h1>)
    }
    const activeStyle={
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }
    return(
        <div className="user-data-container">
            <h1>Overview for {userData.login}</h1>
            <div className="data-navbar">
                <NavLink 
                    style={({isActive})=>isActive?activeStyle:{}}
                    end
                    className="data-navbar-links"to=".">Details</NavLink>
                <NavLink 
                    style={({isActive})=>isActive?activeStyle:{}}
                    className="data-navbar-links"to="repo">Repos</NavLink>
            </div>
            <Outlet context={userData}/>
        </div>
    )
}