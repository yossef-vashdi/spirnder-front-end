import React, { useEffect, useState } from 'react'
import EventList from '../components/events/EventList'
import '../css/EventsPage.css'
import { useAuth } from '../context/AuthContext'
import { getAllEventsFromDB, getAllEventsOfUser } from '../lib/event'

function EventsPage() {
    const auth = useAuth()
    const [events, setEvents] = useState([])
    const [myEvents, setMyEvents] = useState(true)
    const [btnValue, setBtnValue] = useState('See all events')

    const getEventsOfUser = async () => {
        const response = await getAllEventsOfUser(auth.token)
        setEvents(response.data)  
    }

    useEffect(() => {
        getEventsOfUser()
    }, []) 

    const onChangeEvents = async () => {
        if (myEvents) {
            setBtnValue('See my events')
            setMyEvents(false)
            const response = await getAllEventsFromDB(auth.token)
            setEvents(response.data)
        }
        if (!myEvents) {
            setBtnValue('See all events')
            getEventsOfUser()
            setMyEvents(true)
        }
    }
    return (
        <div className="container">
            <button className="toggle-btn" onClick={onChangeEvents}>{btnValue}</button>
            <EventList events={events}></EventList>
        </div>
    )
}

export default EventsPage