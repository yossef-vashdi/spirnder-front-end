import React, { useState } from 'react'
import '../../css/CreateEventForm.css'
import { createEvent } from '../../lib/event'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

function CreateEventForm() {
    const auth = useAuth()
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [distance, setDistance] = useState('')
    const [location, setLocation] = useState('')
    const [speed, setSpeed] = useState('')
    const history = useHistory();

    const formSubmit = async (event) => {
        event.preventDefault()
        const notify = {
            running: {
                distance: distance,
                speed: speed,
                location: location,
                date: time
            },
            title: title
        }
        await createEvent(notify, auth.token)
        let path = '/events'
        history.push(path)
    }
    return (
        <div className="main-container2">
            <div className="title">Create new Event</div>
            <form onSubmit={formSubmit}>
                <label className="eventlabel">Title</label><br></br>
                <input type="text" onChange={e => setTitle(e.target.value)} required></input><br></br>
                <label className="eventlabel">Time</label><br></br>
                <input type="datetime-local" onChange={e => setTime(e.target.value)} required></input><br></br>
                <label className="eventlabel">Distance</label><br></br>
                <input type="number" onChange={e => setDistance(e.target.value)} required></input><br></br>
                <label className="eventlabel">Speed</label><br></br>
                <select value={speed} onChange={e => setSpeed(e.target.value)} className="smth">
                    <option value='slow' onChange={e => setSpeed(e.target.value)}>Slow</option>
                    <option value="normal" onChange={e => setSpeed(e.target.value)}>Normal</option>
                    <option value="fast" onChange={e => setSpeed(e.target.value)}>Fast</option>
                </select><br></br>
                <label className="eventlabel">Location</label><br></br>
                <input type="text" onChange={e => setLocation(e.target.value)} required></input><br></br>
                <button type="submit" className="create-event-btn">Create</button>
            </form>
        </div>
    )
}

export default CreateEventForm