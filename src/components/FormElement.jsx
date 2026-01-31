import {} from 'react'
import { useNavigate } from 'react-router-dom'
export default function(){
    const navigate=useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        const formEl=event.currentTarget
        const formData=new FormData(formEl)
        const username=formData.get("username")
        navigate(`/user/${username}`)
    }
    return(
        <div className="username-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" name="username" placeholder="joe123"/>
                <button>Search</button>
            </form>
        </div>
    )
}