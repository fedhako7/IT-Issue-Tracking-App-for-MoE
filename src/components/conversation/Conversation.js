import React, { useState ,useEffect} from 'react'
import './conversation.css'
import axios from 'axios'
const Conversation = ({conversation,currentUser}) => {
    const [user,setUser]=useState(null)

    const baseUrl="https://it-issue-tracking-api.onrender.com/api"

    useEffect(()=>{
        const friendId=conversation.members.find((m)=>m!==currentUser._id)

     const getUser=async()=>{
        try {
            const res=await axios.get(`${baseUrl}/users/allUsers?userId=`+friendId)
            setUser(res.data)
        } catch (error) {     
        }
     }
     getUser()

    },[currentUser,conversation])
  return (
    <div className='conversation'>
        <div className='imgContainer'>
        <img
        className='conversationImg'
        src={user?.profileImg||"https://i.pinimg.com/564x/8a/9d/6e/8a9d6e85a93b8b3a8002896da71882a3.jpg"}
        />
        </div>  
        <span className='conversationName'>{user?.firstName}</span>
    </div>
  )
}

export default Conversation
