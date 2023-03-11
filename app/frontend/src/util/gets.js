import axios from "axios";

function erOK(response) {
  return response.status >= 200 && response.status < 300;
}

export async function getSpillListe() {
  const data = await get(`https://brettspill.localhost/lobby/spill/`);
  return data;
}

export async function getSpill(id) {
  const data = await get(`https://brettspill.localhost/lobby/spill/${id}`);
  return data;
}

async function get(url) {
  try {
    const response = await axios.get(url);

    if (!erOK(response)) {
      throw { message: "Failed to fetch spill.", status: response.status };
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}