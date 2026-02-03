import {useEffect,useState} from 'react'
import {useParams,useOutletContext} from 'react-router-dom'
import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go"
export default function(){
    const [repoData,setRepoData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    const params=useParams()
    const username=params.username
    const userData=useOutletContext()
    useEffect(()=>{
        setLoading(true)
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
            })
        .then(async res => {
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Something went wrong")
            }
            return res.json()
            })
        .then(data=>setRepoData(data))
        .catch(err=>{
            setError(err.message)
        })
        .finally(()=>setLoading(false))
    },[])
    if(error){
        return (<h1>{error}</h1>)
    }
    if(loading||!repoData){
        return (<h1>Loading...</h1>)
    }
    const AllRepoArray=repoData.map(repo=>{
        return(
            <a key={repo.id} href={repo.html_url} target="_blank">
                <div className="each-repo">
                    <p className="name">{repo.name}</p>
                    {repo.description?<p className="description">{repo.description}</p>:''}
                    <div>
                        <p className="language">{repo.language}</p>
                        <p className="stars">{<CiStar/>}{repo.stargazers_count}</p>
                        <p className="forks">{<GoRepoForked/>}{repo.forks_count}</p>
                    </div>
                </div>
            </a>
        )
    })
    return(
        <>
            <div className="repo-count">
                <p className="title">Public Repos:</p>
                <p className="count">{userData.public_repos}</p>
            </div>
            <div className="all-repos">
                {AllRepoArray}
            </div>
        </>
    )
}