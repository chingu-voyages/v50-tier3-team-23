import { UserType } from "./types";

//@ts-ignore
const baseUrl = import.meta.env.VITE_APP_PUBLIC_SERVER_URL;

export const getAllUsers = async (): Promise<UserType> => {
  const url = `${baseUrl}/getAllUsers`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Response status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
    return [""];
  }
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const url = `${baseUrl}/signup`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR CREATING USER");
    return error;
  }
};

export const checkOut = async (quantity : number) => {
  const url = `${baseUrl}/create-checkout-session`;
  try {
    const response = await fetch('http://localhost:8000/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })
    return response;
  } catch (error) {
    console.error(error);
  }
}