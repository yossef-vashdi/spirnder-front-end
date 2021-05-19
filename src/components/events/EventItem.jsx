import React, {useEffect, useState} from 'react'
import '../../css/EventItem.css'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {creatChat} from '../../lib/chat'
import {getUserById} from '../../lib/api'

function EventItem (props) {
    const [user, setUser] = useState('')
    const auth = useAuth()
    const accepterId = props.event.userId
    const history = useHistory();

    const creatChatwithUser = async () => {
        const response = await creatChat(auth.token, accepterId)
        let path = `/chat/${response.data._id}`
        history.push(path)
    }

    const getUser = async () => {
        const response = await getUserById(props.event.userId, auth.token)
        setUser(response.data)
    }

    useEffect(() => {
        getUser()
        console.log(props.event)
    }, [])
    return (
        <div className={props.container}>
            <div className='d-flex'>
            <img src={user.picture} alt="" className={props.userPhoto}></img>
            <div className={props.userName}>{user.first_name} {user.last_name}</div>
            </div>
    <div className={props.eventTitle}>{props.event.title}</div>
    <div className={props.infoCont}>
    <div className="">Time: {props.event.running.date}</div>
    <div>Speed: {props.event.running.speed}</div>
    <div className="">Distance: {props.event.running.distance} km</div>
    <div>Place: {props.event.running.location}</div>
    </div>
    <button className={props.contactBtn} onClick={creatChatwithUser}>Contact user</button>
    <div className='d-flex'>
    <div className={props.swipe}>Swipe right to join</div>
    <div className={props.icon}></div>
    <div className={props.icon2}></div>
    <div className={props.icon2}></div>
    </div>
    </div>
    )
}

export default EventItem