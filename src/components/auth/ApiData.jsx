import React, { useState } from "react";
import { useAuth } from "oidc-react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

async function doGetRequest(token) {
  let res = await axios.get("https://api.marvelstrikeforce.com/game/v1/characters", {
    headers: {
      Accept: "application/json",
      "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
      Authorization: "Bearer " + token
    }
  });
  return res.data;
}

async function doGetInventory(token, item) {
  let res = await axios.get("https://api.marvelstrikeforce.com/player/v1/inventory?itemType=" + item, {
    headers: {
      Accept: "application/json",
      "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
      Authorization: "Bearer " + token
    }
  });
  console.log(res.data)

  // res.data.forEach( (item) => {
  //   item.picture = doGetISOPic(token, item.item)
  // })
  return res.data;
}

async function doGetISOPic(token, item) {
  let res = await axios.get("https://api.marvelstrikeforce.com/game/v1/items/" + item, {
    headers: {
      Accept: "application/json",
      "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
      Authorization: "Bearer " + token
    }
  });
  // console.log(res.data.data.icon)
  return res.data.data.icon;
}

const ISOTable = [];

// var tableData ;

const ApiData = () => {
  const { userData } = useAuth();
  const [isoTable, setIsoTable] = useState(0);
  if (userData?.access_token) {
    doGetRequest(userData.access_token)
      .then((num) => {
        console.log(num);
      })
      .catch((err) => {
        return <div>err</div>;
      });
    doGetInventory(userData.access_token, "ISOITEM")
      .then((num) => {
        num.data.forEach((inventory) => {
          ISOTable.push(
            <Row key={inventory.item}>
              {/* {console.log(doGetISOPic(userData.access_token, inventory.item))} */}
              <Col>{inventory.quantity}</Col>
              <Col>
                {/* <img src={doGetISOPic(userData.access_token, inventory.item)} alt='ISO'/> */}
              </Col>
            </Row>
          );
        });
        setIsoTable(ISOTable);
      })
      .catch((err) => {
        return <div>err</div>;
      });
  }
  return <Container>{ISOTable}</Container>;
};

export default ApiData;
