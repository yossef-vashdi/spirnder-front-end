import React from 'react'
import ChatItem from './ChatItem'

function ChatsList (props) {
    const {chats} = props
    return (
        <div className="chats-container">
            {chats.map(chat => 
                <ChatItem chat={chat} key={chat._id}/>
            )}
        </div>
    )
}

export default ChatsList