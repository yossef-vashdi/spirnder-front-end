import React from 'react'
import { useState } from "react";
import MySignUpModal from "../components/ModalSignUp"
import MyLogInModal from "../components/ModalLogIn"
import '../css/HomePage.css'

export default function Homepage() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowLogIn, setModalShowLogIn] = useState(false);

        return (
            <div className="">
                {/* <h1 className="title t-homepage">Welcome to Tinder Sport Page</h1> */}
                <div className="main-container">
                <button className="log-btn" onClick={() => setModalShowLogIn(true)}>Log In</button>{' '}
                <button  className="sign-btn" onClick={() => setModalShow(true)}>New? Sign Up</button>
                </div>
                <MySignUpModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <MyLogInModal
                    show={modalShowLogIn}
                    onHide={() => setModalShowLogIn(false)}
                />
            </div>
        )
    

}

