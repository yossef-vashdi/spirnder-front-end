import React from "react";
import ReactSwipeableViews from "react-swipeable-views";
import EventItem from "./EventItem";

const styles = {
  slide: {
    margin: "20px 50px",
    padding: 15,
    minHeight: 100,
    color: "#fff",
  },
  slide1: {
    background: "#FEA900",
    opacity: "0",
  },
  slide2: {
    background: "#422434",
  },
  slide3: {
    background: "#fff",
    opacity: "0",
  },
};

class SwipeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: this.props.slide,
    };
  }

  render() {
    return (
      <div style={{ position: "absolute", width: "100%", left: "0px" }}>
        <ReactSwipeableViews
          enableMouseEvents
          index={1}
          onChangeIndex={(e) => {
            this.props.Change(e, this.props.item);
          }}
        >
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            Swiped right
          </div>
          <EventItem
            key={this.props.item._id}
            event={this.props.item}
            container="event-item-container"
            eventTitle="event-title"
            contactBtn="contact-btn"
            userPhoto="user-photo"
            infoCont="info-container"
            swipe="swipe"
            icon="icon-swipe"
            icon2="icon-swipe-2"
            userName="d-none"
          ></EventItem>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            Swiped left
          </div>
        </ReactSwipeableViews>
      </div>
    );
  }
}

export default SwipeContainer;
