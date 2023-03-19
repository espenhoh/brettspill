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

export async function getSpillTyper() {
    return await get("/lobby/spill/get_alle_spill_typer/");
};

async function get(url) {
    try {
      const response = await axios.get(
        url,
        {
            headers: { Accept: "application/json" },
          }
        );
  
      if (!erOK(response)) {
        throw { message: "Failed to fetch.", status: response.status };
      }
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }