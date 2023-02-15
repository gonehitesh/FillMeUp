export const fetchCall = async (apiPath, reqMethod, formBody) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (!reqMethod && reqMethod !== "POST") {
    return await fetch(`http://localhost:3002/${apiPath}`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error fetching", error);
      });
  } else {
    if (formBody) {
      let fetchData = {
        method: reqMethod,
        body: JSON.stringify(formBody),
        headers: myHeaders,
      };
      return await fetch(`http://localhost:3002/${apiPath}`, fetchData)
        .then((response) => response.json())
        .catch((error) => {
          console.log("error fetching", error);
        });
    }
  }
};
export default fetchCall;
