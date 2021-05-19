import axios from "axios";
import { decodeToken } from "react-jwt";

export const BaseUrl = "http://127.0.0.1:4000";

export function getAuthConfig(token) {
  return {
    headers: {
      authorization: "Bearer " + token,
    },
  };
}

export async function signup(
  first_name,
  last_name,
  email,
  password,
  confirmPassword,
  telephone,
  speed,
  distance,
  location
) {
  const response = await axios.post(`${BaseUrl}/signUp`, {
    user: {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      telephone,
      sports: [
        {
          running: {
            speed,
            distance,
            location,
          },
        },
      ],
    },
  });
  return response.data;
}

export async function login(email, password) {
  const response = await axios.post(`${BaseUrl}/logIn`, {
    user: {
      email,
      password,
    },
  });

  return response.data;
}

export async function getUserInfo(token) {
  const myDecodedToken = decodeToken(token);

  const response = await axios.get(
    `${BaseUrl}/user/${myDecodedToken.uid}`,
    getAuthConfig(token)
  );
  return response.data;
}

export async function UpdateUser(
  first_name,
  last_name,
  email,
  password,
  confirmPassword,
  telephone,
  speed,
  distance,
  location,
  token
) {
  const myDecodedToken = decodeToken(token);
  const response = await axios.put(
    `${BaseUrl}/user/updateProfile/${myDecodedToken.uid}`,
    {
      user: {
        first_name,
        last_name,
        email,
        password,
        confirmPassword,
        telephone,
        sports: [
          {
            running: {
              speed,
              distance,
              location,
            },
          },
        ],
      },
    },
    getAuthConfig(token)
  );
  return response.data;
}

export async function getUserById(accepterId, token) {
  const myDecodedToken = decodeToken(token);
  const response = await axios.get(
    `${BaseUrl}/user/${accepterId}`,
    getAuthConfig(token)
  );
  return response;
}
