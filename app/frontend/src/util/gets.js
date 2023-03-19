import axios from "axios";

function erOK(response) {
  return response.status >= 200 && response.status < 300;
}

export async function getSpillListe() {
  const data = await get(`/lobby/spill/`);
  return data;
}

export async function getSpill(id) {
  const data = await get(`/lobby/spill/${id}`);
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

export async function getSpillTyper() {
  try {
    const response = await axios.get(
      "/lobby/spill/get_alle_spill_typer/",
      {
        headers: { Accept: "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};