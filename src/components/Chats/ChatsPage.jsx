import React, {useEffect, useState} from 'react'
import ChatsList from './ChatsList'
import { useAuth } from '../../context/AuthContext'
import {getAllChatsOfUser} from '../../lib/chat'
import '../../css/ChatsPage.css'

function ChatsPage() {
    const auth = useAuth()
    const [ chats, setChats ] = useState([])

    const getAllChats = async () => {
        const response = await getAllChatsOfUser(auth.token)
        const arr = response.data
        const arrReverse = arr.reverse()
        setChats(arrReverse)
    }
    useEffect(() => {
        getAllChats()
    }, [])
    return (
        <div className="chats-container">
            <ChatsList chats={chats}></ChatsList>
        </div>
    )
}

export default ChatsPage