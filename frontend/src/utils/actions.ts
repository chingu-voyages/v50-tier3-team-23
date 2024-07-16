const baseUrl = import.meta.env.VITE_APP_PUBLIC_SERVER_URL;

export const getAllUsers = async () => {
  const url = `${baseUrl}/getAllUsers`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return console.log(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (email: string, name: string) => {
  const url = `${baseUrl}/createUser`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: email,
        name: name,
      }),
    });
    console.log("SUCCESS CREATING USER: ", response);
    return response;
  } catch (error) {
    console.log("ERROR CREATING USER");
    console.log(error);
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