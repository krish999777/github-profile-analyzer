import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
export default function(){
    const [userData,setUserData]=useState(null)
    const params=useParams()
    const username=params.username
    useEffect(()=>{
        fetch(`https://api.github.com/users/${username}`)
        .then(res=>res.json())
        .then(data=>setUserData(data))
    },[username])
    return(
        userData?
        <div className="user-data-container">
        <img className="avatar-img" src={userData.avatar_url} alt="avatar image"/>
        <div className="username">{userData.login}</div>
        <div className="user-bio">{userData.bio}</div>
        </div>
        :<h1>Loading...</h1>
    )
}