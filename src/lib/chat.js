import axios from "axios"
import {getAuthConfig, BaseUrl} from './api'
import {
    decodeToken
} from "react-jwt";

export async function creatChat (token, accepterId) {
    const myDecodedToken = decodeToken(token);
    const response = await axios.post(`${BaseUrl}/chat/createChat/${myDecodedToken.uid}/${accepterId}`, getAuthConfig(token))
    return response
}

export async function getAllChatsOfUser (token) {
    const myDecodedToken = decodeToken(token);
    const response = await axios.get(`${BaseUrl}/chat//all/${myDecodedToken.uid}`, getAuthConfig(token)) 
    return response
}

export async function getChatById (chatId, token) {
    const response = await axios.get(`${BaseUrl}/chat/${chatId}`, getAuthConfig(token))
    return response
}

export async function postNewMessage (chatId, token, post) {
    const myDecodedToken = decodeToken(token);
    const response = await axios.post(`${BaseUrl}/chat/createPost/${myDecodedToken.uid}/${chatId}`, post, getAuthConfig(token)) 
    return response
}