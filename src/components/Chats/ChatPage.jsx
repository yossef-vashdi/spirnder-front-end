import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import NewMessageForm from "./NewMessageForm";
import "../../css/Chat.css";
import { useAuth } from "../../context/AuthContext";
import { getChatById } from "../../lib/chat";
import { withRouter } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { getUserById } from "../../lib/api";

function ChatPage(props) {
  const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const {
    match: { params },
  } = props;

  const getChat = async () => {
    let accepterId = "";
    const response = await getChatById(params.chatId, auth.token);
    setMessages(response.data.posts);
    if (decodeToken(auth.token).uid === response.data.send_user_id) {
      accepterId = response.data.accept_user_id;
    }
    if (decodeToken(auth.token).uid !== response.data.send_user_id) {
      accepterId = response.data.send_user_id;
    }
    const userResponse = await getUserById(accepterId, auth.token);
    setUser(userResponse.data);
  };

  useEffect(() => {
    let id = setInterval(() => {
      getChat();
    }, 5000);
    return () => clearInterval(id);
  });

  useEffect(() => {
    getChat();
  }, []);

  const handleonNewMessage = (post) => {
    getChat();
  };
  return (
    <div className="chat">
      <div className="accepter">
        {user.first_name} {user.last_name}
      </div>
      <hr></hr>
      <MessagesList messages={messages} />
      <NewMessageForm
        onNewMessage={handleonNewMessage}
        chatId={params.chatId}
      ></NewMessageForm>
    </div>
  );
}

export default withRouter(ChatPage);
