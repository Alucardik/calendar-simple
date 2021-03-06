import Pizzly from "pizzly-js";

const pizzly = new Pizzly({
  host: "https://psyc-calendar.herokuapp.com/",
  publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
});
const spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';
const authId = "accf2f70-cc3e-11eb-a6dc-577691cc197d";

function sendStats(csvData, sheetName) {
  return pizzly.integration("google-sheets")
    .auth(authId)
    .post(`${spreadsheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      body: JSON.stringify({
        "majorDimension": "ROWS",
        "values": [...csvData.split("\n").map((row) => row.split(","))]
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    });
}

export default sendStats;
