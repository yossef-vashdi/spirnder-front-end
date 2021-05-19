import React, { useContext, useState, useEffect } from "react"
import localforage from 'localforage';



export const AuthContext = React.createContext({
  isInitiallyLoaded: false,
  user: '',
  token: '',
  saveToken: async (token) => { },
  removeToken: async () => { }
})


export function useAuth() {
  return useContext(AuthContext)
}

const tokenKey = 'userToken';


export default function AuthProvider(props) {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState("")
  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token);
  }
 
  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  }
useEffect(() => {

    localforage.getItem(tokenKey)
      .then(token => {
        if (token) {
          setToken(token);
        }
        setIsInitiallyLoaded(true);

      });
  }, []);

  const value = {
    isInitiallyLoaded,
    token, saveToken, removeToken
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

