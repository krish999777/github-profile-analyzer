import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
export default function(){
    const [repoData,setRepoData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    const params=useParams()
    const username=params.username
    useEffect(()=>{
        setLoading(true)
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(res=>{
            if(!res.ok){
                throw new Error('User not found!')
            }
            return res.json()
        })
        .then(data=>setRepoData(data))
        .catch(err=>{
            setError(err)
        })
        .finally(()=>setLoading(false))
    },[])
    if(loading||!repoData){
        return (<h1>Loading...</h1>)
    }
    if(error){
        return (<h1>{error}</h1>)
    }
    return(
        <>
            <div className="repo-count">
                <p>Public Repos:</p>
                <p>{repoData.length}</p>
            </div>
        </>
    )
}