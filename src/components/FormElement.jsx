import {} from 'react'
import { useNavigate } from 'react-router-dom'
export default function(){
    const navigate=useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        const formEl=event.currentTarget
        const formData=new FormData(formEl)
        const username=formData.get("username")
        if(username===""){
            navigate('/')
            return
        }
        formEl.reset()
        navigate(`/${username}`)
    }
    return(
        <div className="username-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <div className="search-field-container">
                    <input id="username" type="text" name="username" placeholder="joe123"/>
                    <button>Search</button>
                </div>
            </form>
        </div>
    )
}