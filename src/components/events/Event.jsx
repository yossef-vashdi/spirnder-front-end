import React, { useEffect, useState } from "react";
import "../../css/Event.css";
import Modal from "react-modal";
import CreateEventForm from "./CreateEventForm";
import { getAllEventsFromDB, addUserIdResponse } from "../../lib/event";
import { useAuth } from "../../context/AuthContext";
import SwipeList from "./SwipeList";
import { creatChat } from "../../lib/chat";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgb(224, 106, 189)"
  },
};

function Event() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const auth = useAuth();
  const getEventsOfUser = async () => {
    const response = await getAllEventsFromDB(auth.token);
    const result = response.data.filter((item) => {
      return (
        item.response.find((item) => item === decodeToken(auth.token).uid) !==
        decodeToken(auth.token).uid
      );
    });
    setEvents(result);
  };
  const history = useHistory();
  useEffect(() => {
    getEventsOfUser();
  }, []);

  const onCreateEvent = () => {
    setIsOpen(true);
  };

  const closeModal = async () => {
    setIsOpen(false);
  };

  const Change = async (index, info) => {
    const swipe = index === 2 ? "Swiped left" : "Swiped right";

    setEvents(events.slice(1));

    const creatChatwithUser = async () => {
      const response = await creatChat(auth.token, info.userId);
      let path = `/chat/${response.data._id}`;
      history.push(path);
    };

    await addUserIdResponse(auth.token, info._id);
    if (index === 0) {
      await creatChatwithUser();
      window.alert("congratulation ! you created a new chat !");
    }
  };

  return (
    <div className="main-container-event">
      <SwipeList
        events={events}
        Change={(i, info) => {
          Change(i, info);
        }}
      />

      <button className="button-2" onClick={onCreateEvent}>
        Create new event
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CreateEventForm></CreateEventForm>
      </Modal>
    </div>
  );
}

export default Event;
