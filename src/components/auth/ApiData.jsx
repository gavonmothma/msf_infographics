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
//hello
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
        for (let iso of num.data) {
          const quantity = iso.item.id.split("_").pop()
          iso.item.slot = iso.item.id.split("_")[iso.item.id.split("_").length - 2]
          iso.item.isoclass = iso.item.id.split("_")[iso.item.id.split("_").length - 3]
          iso.item.color = iso.item.id.split("_")[iso.item.id.split("_").length - 4]
          quantity === "6" ? iso.item.subquantity=1
            : quantity === "7" ? iso.item.subquantity=3
            : quantity === "8" ? iso.item.subquantity=9
            : quantity === "9" ? iso.item.subquantity=27
            : iso.item.subquantity=81
        }
        var blasters = num.data.filter(subline=>{
          return subline.item.isoclass === "BLASTER"
        })
        var blueblasters = blasters.filter(subline=>{
          return subline.item.color === "BLUE"
        })
        var greenblasters = blasters.filter(subline=>{
          return subline.item.color === "GREEN"
        })
        console.log(blasters)
        console.log(blueblasters)
        console.log(greenblasters)
        console.log(num.data);

        greenblasters.forEach((inventory) => {
          ISOTable.push(
            <Row key={inventory.item.id}>
              <Col>
                <Row>{Math.floor(inventory.quantity/81)}{" characters "}</Row>
                <Row>{(inventory.quantity>80? 81-(inventory.quantity-(Math.floor(inventory.quantity/81)*81)) : 81-inventory.quantity)}{" iso for additional character"}</Row>
              </Col>
              <Col>
                <img src={inventory.item.icon} alt="ISO"></img>{" "}{inventory.quantity}
              </Col>
            </Row>
          );
        });
        blueblasters.forEach((inventory) => {
          ISOTable.push(
            <Row key={inventory.item.id}>
              <Col>
                <Row>{Math.floor(inventory.quantity/81)}{" characters "}</Row>
                <Row>{(inventory.quantity>80? 81-(inventory.quantity-(Math.floor(inventory.quantity/81)*81)) : 81-inventory.quantity)}{" iso for additional character"}</Row>
              </Col>
              <Col>
                <img src={inventory.item.icon} alt="ISO"></img>{" "}{inventory.quantity}
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
