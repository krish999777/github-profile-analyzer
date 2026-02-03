import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go"
export default function(){
    const [repoData,setRepoData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    const params=useParams()
    const username=params.username
    useEffect(()=>{
        setLoading(true)
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`)
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
    if(repoData.length===0){
        return (<h1>No repos found!</h1>)
    }
    let languageList={}
    repoData.forEach(repo=>{
        if(!Object.hasOwn(languageList,repo.language)){
            languageList[repo.language]=1
        }
        else{
            languageList[repo.language]+=1
        }
    })
    delete languageList.null
    const languageListArray=Object.entries(languageList)
    languageListArray.sort((a,b)=>b[1]-a[1])
    let topLanguages;
    if(languageListArray.length<5){
        topLanguages=[...languageListArray]
    }
    else{
        topLanguages=[...languageListArray].slice(0,4)
        const count=topLanguages.reduce((acc,val)=>{
            return acc+val[1]
        },0)
        topLanguages.push(['Other',repoData.length-count])
    }
    const topLanguagesDisplay=topLanguages.map((lang,index)=>{
        return(
            <div className="top-language-each" key={index}>
                <div>{`${index+1})${lang[0]}`}</div>
                <div>{lang[1]}</div>
            </div>
        )
    })
    const stars=repoData.reduce((acc,{stargazers_count})=>{
        return acc+stargazers_count
    },0)
    const forks=repoData.reduce((acc,{forks_count})=>{
        return acc+forks_count
    },0)
    let mostStarred=repoData[0]
    let mostForked=repoData[0]
    repoData.forEach((repo)=>{
        if(repo.stargazers_count>mostStarred.stargazers_count)
            mostStarred={...repo}
        if(repo.forks_count>mostForked.forks_count)
            mostForked={...repo}
    })
    return(
        <>
            <h4 style={{'marginTop':'25px'}}>Analysis based on the 100 most recently updated repositories.</h4>
            <div className="all-analysis">
                <div className="top-languages-container">
                    <h3>Top languages</h3>
                    {topLanguagesDisplay}
                </div>
                    <div className="both-analysis-container">

                        <div className="stars-analysis-container data-container-forks-stars">
                            <div className="stars-count">
                                <div className="title">Total Stars:</div>
                                <div className="count">{stars}</div>
                            </div>
                            <div className="stars-average">
                                <div className="title">Average Stars per Repo:</div>
                                <div className="count">{Math.round(stars/repoData.length)}</div>
                            </div>
                        </div>
                        <div className="forks-analysis-container data-container-forks-stars">
                            <div className="forks-count">
                                <div className="title">Total Forks:</div>
                                <div className="count">{forks}</div>
                            </div>
                            <div className="forks-average">
                                <div className="title">Average Forks per Repo:</div>
                                <div className="count">{Math.round(forks/repoData.length)}</div>
                            </div>
                        </div>
                    </div>
                <div className="most-repo-analysis">
                    <div className="most-starred analysis-repo-most">
                        <h3>Most Starred Repo</h3>
                        <a key={mostStarred.id} href={mostStarred.html_url} target="_blank">
                            <div className="each-repo">
                                <p className="name">{mostStarred.name}</p>
                                {mostStarred.description?<p className="description">{mostStarred.description}</p>:''}
                                <div>
                                    <p className="language">{mostStarred.language}</p>
                                    <p className="stars">{<CiStar/>}{mostStarred.stargazers_count}</p>
                                    <p className="forks">{<GoRepoForked/>}{mostStarred.forks_count}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="most-forked analysis-repo-most">
                        <h3>Most Forked Repo</h3>
                        <a key={mostForked.id} href={mostForked.html_url} target="_blank">
                            <div className="each-repo">
                                <p className="name">{mostForked.name}</p>
                                {mostForked.description?<p className="description">{mostForked.description}</p>:''}
                                <div>
                                    <p className="language">{mostForked.language}</p>
                                    <p className="stars">{<CiStar/>}{mostForked.stargazers_count}</p>
                                    <p className="forks">{<GoRepoForked/>}{mostForked.forks_count}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}