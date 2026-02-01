import {} from 'react'
import {useOutletContext} from 'react-router-dom'
import { CiLocationOn ,CiMail} from "react-icons/ci";
import { IoMdBusiness } from "react-icons/io";
import { MdArticle } from "react-icons/md";
export default function(){
    const userData=useOutletContext()
    const time=userData.created_at
    const formattedTime=new Date(time).toLocaleDateString()
    return(
        <>
            <div className="avatar-name-container">
                <img className="avatar-img" src={userData.avatar_url} alt="avatar image"/>
                <div className="name">{userData.name}</div>
                <div className="options-stats">
                    {userData.location?<div className="location"><CiLocationOn/>{userData.location}</div>:''}
                    {userData.company?<div className="company"><IoMdBusiness/>{userData.company}</div>:''}
                    {userData.blog?<div className="blog"><MdArticle/>{userData.blog}</div>:''}
                    {userData.email?<div className="email"><CiMail/>{userData.email}</div>:''}
                </div>
            </div>
            <div className="date-info">Created on {formattedTime}</div>      
            {userData.bio?<div className="user-bio">{userData.bio}</div>:''}
            <a href={userData.html_url} target="_blank">Follow</a>
            <div className="all-stats-container">
                <div className="details-stats-container">
                    <div>PUBLIC REPOS</div> 
                    <div className="count">{userData.public_repos}</div> 
                </div>
                <div className="details-stats-container">
                    <div>PUBLIC GISTS</div> 
                    <div className="count">{userData.public_gists}</div> 
                </div>
                <div className="details-stats-container">
                    <div>FOLLOWERS</div> 
                    <div className="count">{userData.followers}</div> 
                </div>
                <div className="details-stats-container">
                    <div>FOLLOWING</div> 
                    <div className="count">{userData.following}</div> 
                </div>
            </div>
        </>
    )
}