import React, { useState } from "react";
import { useAuth } from "oidc-react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
// import { useSortBy } from "react-table";
const enableLogin = 0;

async function doGetRequest(token) {
  console.log("DoGetRequest");
  let res = await axios.get("https://api.marvelstrikeforce.com/game/v1/characters?status=playable", {
    headers: {
      Accept: "application/json",
      "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
      Authorization: "Bearer " + token
    }
  });
  return res.data;
}

async function doGetCharacter(token, character) {
  let res = await axios.get(
    "https://api.marvelstrikeforce.com/game/v1/characters/" + character + "?costumes=none&abilityKits=none&pieceDirectCost=full",
    {
      headers: {
        Accept: "application/json",
        "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
        Authorization: "Bearer " + token
      }
    }
  );
  return res.data;
}

async function doGetInventory(token, item) {
  console.log("DoGetInventory");
  let res = await axios.get(
    "https://api.marvelstrikeforce.com/player/v1/inventory?itemFormat=object&itemType=" + item,
    {
      headers: {
        Accept: "application/json",
        "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
        Authorization: "Bearer " + token
      }
    }
  );
  return res.data;
}

const ISOTable = [];

// var tableData ;

const ApiData = () => {
  console.log("ApiData");
  const { userData } = useAuth();
  console.log("useAuth", userData);
  const [isoTable, setIsoTable] = useState(0);
  var charMasterList = [];
  if (userData?.access_token) {
    console.log("access_token");
    doGetRequest(userData.access_token)
      .then((num) => {
        console.log(num.data);
        if (enableLogin) {
          num.data.forEach((character) => {
            doGetCharacter(userData.access_token, character.id)
              .then((res) => {
                charMasterList.push(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
          console.log(charMasterList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    doGetInventory(userData?.access_token, "ISOITEM")
      .then((num) => {
        num.data.sort((a, b) => {
          if (a.item.id < b.item.id) {
            return -1;
          }
          return 0;
        });
        console.log(num.data);
        num.data.forEach((inventory) => {
          if (inventory.item.id === 'ISOITEM_BLUE_CONTROLLER_ARMOR_6') {
            console.log(inventory.quantity)
          }
          ISOTable.push(
            <Row key={inventory.item.id}>
              <Col>{inventory.quantity}{" "}{Math.floor(inventory.quantity/81)}{" characters "}{(inventory.quantity>80? inventory.quantity-(Math.floor(inventory.quantity/81)*81) : 81-inventory.quantity)}</Col>
              <Col>
                <img src={inventory.item.icon} alt="ISO"></img>
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
