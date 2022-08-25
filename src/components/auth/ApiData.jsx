import React from 'react';
// import { useAuth } from 'oidc-react';
import axios from 'axios';

async function doGetRequest(token) {
  let res = await axios.get("https://api.marvelstrikeforce.com/game/v1/characters", {
    headers: {
      "Accept": "application/json",
      "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
      "Authorization": "Bearer " + token
    }
  }

  );

  let data = res.data;
  // console.log(data)
  return (data);
}

var tableData;


const ApiData = () => {
  // const { userData } = useAuth();
  // if (userData?.access_token)
  // {
  //   doGetRequest(userData.access_token)
  //     .then(num => {console.log(num)})
  //     .catch(err => {return <div>err</div>})
  
  // }
  // return (
  //   <p>Hello {console.log(userData)}!</p>
  // );
}

export default ApiData;

