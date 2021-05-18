import Pizzly from "pizzly-js";

const pizzly = new Pizzly({
  host: "https://psyc-calendar.herokuapp.com/",
  publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
});
const spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';
const authId = "6cd51f80-b7f1-11eb-88ce-f3631f229918";

const sendStats = (csvData) => {
  pizzly.integration("google-sheets")
    .auth(authId)
    .post(`${spreadsheetId}:batchUpdate`,{
      body: JSON.stringify({
        "requests": [
          {
            "pasteData": {
              "coordinate": {
                "sheetId": 0,
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
        window.alert("Data was successfully retrieved");
        return response.json();
      }
      // return response.status;
      return Promise.reject(response.status);
    })
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      window.alert(`API encountered error with status:\n${err}`);
    });
}

export default sendStats;
