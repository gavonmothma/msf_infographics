import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import { Typography } from "@mui/material";
var characters = require("../../data/json/characters.json");
characters = characters.data;
const requiredCharacters = require("../../data/json/requiredCharacters.json");
const isoClasses = require("../../data/json/isoClasses.json");
const iso8Abilities = require("../../data/json/iso8Abilities.json");

//num is the current trait (Darkhold, Gamma, etc) for which we are searching
var characterList = {};
requiredCharacters.teams.forEach((num) => {
  characterList[num] = [];
  characters.forEach((char) => {
    char.traits.forEach((trait) => {
      if (trait.id === num) {
        characterList[num].push(char);
      }
    });
  });
});

for (let character in characterList) {
  for (let char of characterList[character]) {
    let chargear = require("../../data/json/characters/" + char.id + ".json");
    char.gearTiers = chargear.data.gearTiers;
  }
}

for (let character in characterList) {
  for (let char of characterList[character]) {
    for (let trait of char.traits) {
      for (let iso in isoClasses.classes) {
        console.log(isoClasses.classes[iso], trait.id);
        if (isoClasses.classes[iso] === trait.id) {
          char.isoClass = trait.id;
        }
      }
    }
  }
}

console.log(characterList);

const COLUMNS = [
  {
    Header: "Portrait",
    accessor: "portrait",
    Cell: (props) => {
      console.log(props);
      return (
        <span>
          <div>
            {props.row.original.gearTiers[12].slots[1].piece.directCost[2].quantity +
              props.row.original.gearTiers[13].slots[1].piece.directCost[2].quantity +
              props.row.original.gearTiers[14].slots[1].piece.directCost[2].quantity}
            <img src={props.row.original.gearTiers[12].slots[1].piece.directCost[2].item.icon} alt="Unique" />
            <img src={props.row.original.portrait} alt="Portrait"></img>
          </div>
        </span>
      );
    }
  },
  {
    Header: "isoClass",
    accessor: "isoClass"
  }
];

export const Products = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => characterList.Unlimited, []);

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()}>
      {/* <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th></th>
          </tr>
        ))}
      </thead> */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <span {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </span>
          );
        })}
      </tbody>
    </table>
  );
};
