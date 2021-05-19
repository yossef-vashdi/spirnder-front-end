import React, { useEffect, useState } from 'react'
import '../../css/NewMessageForm.css'
import { useAuth } from '../../context/AuthContext'
import {
    decodeToken
} from "react-jwt";
import { getUserById } from '../../lib/api'
import { postNewMessage } from '../../lib/chat'

function NewMessageForm(props) {
    const auth = useAuth()
    const [text, setText] = useState('')
    const [user, setUser] = useState('')
    const chatId = props.chatId

    const getSender = async () => {
        const myDecodedToken = decodeToken(auth.token);
        const response = await getUserById(myDecodedToken.uid, auth.token)
        setUser(response.data)
    }
    useEffect(() => {
        getSender()
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const post = {
            creator_id: user._id,
            creator_name: user.first_name,
            content: text
        }
        await postNewMessage(chatId, auth.token, post)
        props.onNewMessage(post)
        setText('')
    }
    return (
        <div>
            <hr className="line"></hr>
            <form className="message-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message here"
                    value={text}
                    onChange={e => setText(e.target.value)}></input>
                <button type="submit" className='message-button'></button>
            </form>
        </div>

    )
}

export default NewMessageForm