import React from 'react'
import EventItem from './EventItem'

function EventList (props) {
    return(
            <div>
                {props.events.map((event) => {
                    return <EventItem
                        key={event._id}
                        event={event}
                        container="event-item-container-page"
                        eventTitle="event-title-page"
                        contactBtn="contact-btn-page"
                        userPhoto="user-photo-page"
                        infoCont="info-container-page"
                        swipe="d-none"
                        icon="d-none"
                        icon2="d-none"
                        userName="user-name"
                    ></EventItem>
                })}
            </div>
    )
}

export default EventList