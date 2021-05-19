import React from 'react'
import Navbar from "./Navbar";
import Event from "./events/Event";
import EventsPage from '../pages/EventsPage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import ProfilePage from '../pages/ProfilePage';
import ChatsPage from './Chats/ChatsPage';
import ChatPage from './Chats/ChatPage'
import '../css/MainComponent.css'

function MainComponent() {
    return (
        <div className="app" >
        <Router>
        <Navbar/>
        <Switch>
        <Route exact path ="/">
        <Event />
       </Route> 
       <Route exact path ="/events">
            <EventsPage />
        </Route> 
        <Route exact path ="/chats">
            <ChatsPage />
        </Route> 
        <Route exact path ="/chat/:chatId">
            <ChatPage />
        </Route> 
        <Route exact path ="/profile">
            <ProfilePage />
        </Route> 
        </Switch> 
        </Router>

    </div>

    )
}

export default MainComponent