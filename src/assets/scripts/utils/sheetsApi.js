import Pizzly from "pizzly-js";

const pizzly = new Pizzly({
  host: "https://psyc-calendar.herokuapp.com/",
  publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
});
const spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';
const authId = "f9580380-be2e-11eb-8bd0-9ff158aa406e";

// TODO append values with ranges []: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
const sendStats = (csvData, sheetId) => {
  return pizzly.integration("google-sheets")
    .auth(authId)
    .post(`${spreadsheetId}:batchUpdate`,{
      body: JSON.stringify({
        "requests": [
          {
            "pasteData": {
              "coordinate": {
                "sheetId": sheetId,
                "rowIndex": 0,
                "columnIndex": 0
              },
              "data": csvData,
              "type": "PASTE_VALUES",
              "delimiter": ",",
            }
          }
        ],
        "includeSpreadsheetInResponse": false,
        "responseRanges": [],
        "responseIncludeGridData": false
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // return response.status;
      return Promise.reject(response.status);
    });
}

export default sendStats;
