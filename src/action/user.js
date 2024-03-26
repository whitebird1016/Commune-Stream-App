const API_URL = "https://podocast-api.onrender.com/";
export const getUser = async () => {
  await fetch(API_URL + "api/users")
    .then((res) => res.json())
    .then((response) => console.log("Current User: " + response.length));
};
export const addUser = async (address) => {
  await fetch(API_URL + "api/users/adduser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ address: address }),
  })
    .then((res) => res.json())
    .then((response) => console.log(response));
};
