import React from 'react'
import MessageItem from './MessageItem'
import '../../css/MessageList.css'

function MessagesList (props) {
    const { messages } = props
    return(
        <div className="list">
            {messages.map(message => 
                <MessageItem message={message} key={message._id}/>
            )}
        </div>
    )
}

export default MessagesList