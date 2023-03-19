import axios from "axios";

function erOK(response) {
  return response.status >= 200 && response.status < 300;
}

export async function postNyttSpill(payload) {
  return await post('/lobby/spill/', payload);
}

async function post(url, payload) {
  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (!erOK(response)) {
      throw { message: "Failed to post", status: response.status };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
