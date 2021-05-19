import React, { useEffect, useState } from 'react'
import '../../css/MessageItem.css'
import {
    decodeToken
} from "react-jwt";
import { useAuth } from '../../context/AuthContext'

function MessageItem(props) {
    const auth = useAuth()
    const {message} = props
    const [messStyle, setMessStyle] = useState('')
    const myDecodedToken = decodeToken(auth.token);
    const senderId = myDecodedToken.uid

    useEffect(() => {
        if(message.creator_id === senderId) {
            setMessStyle('message-container')
        } else {
            setMessStyle('message-container-2')
        }
    }, [])

            return(
        <div className={messStyle}>
            <div className="user-icon">
            {message.creator_name ? message.creator_name.substr(0, 1) : ''}
            </div>
            <div className="message-body">
                <div className="message-date">{message.date}</div>
                <div className="message-text">{message.content}</div>
            </div>
        </div>
    )
}

export default MessageItem