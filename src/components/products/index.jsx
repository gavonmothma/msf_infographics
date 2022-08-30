import React, { useMemo } from "react";
import { useTable } from "react-table";
// import { Typography } from "@mui/material";
var characters = require("../../data/json/characters.json");
characters = characters.data;
const requiredCharacters = require("../../data/json/requiredCharacters.json");
const isoClasses = require("../../data/json/isoClasses.json");
const origins = require("../../data/json/origins.json");
const miniUniques = require("../../data/json/miniUniques.json");
// const iso8Abilities = require("../../data/json/iso8Abilities.json");

//num is the current trait (Darkhold, Gamma, etc) for which we are searching
var characterList = {};
var textList = [];
requiredCharacters.teams.forEach((num) => {
  characterList[num] = [];
  characters.forEach((char) => {
    char.traits.forEach((trait) => {
      if (trait.id === num) {
        textList.push(char.id);
        characterList[num].push(char);
      }
    });
  });
});
console.log(characterList);
// console.log(textList.sort());

for (let character in characterList) {
  for (let char of characterList[character]) {
    let chargear;
    try {
      chargear = require("../../data/json/characters/" + char.id + ".json");
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
      }
    }

    char.gearTiers = chargear?.data?.gearTiers;
  }
}

for (let character in characterList) {
  for (let char of characterList[character]) {
    for (let trait of char.traits) {
      for (let iso in isoClasses.classes) {
        if (isoClasses.classes[iso] === trait.id) {
          char.isoClass = trait.id;
        }
      }
    }
  }
}

for (let character in characterList) {
  for (let char of characterList[character]) {
    for (let trait of char.traits) {
      for (let iso in origins.origin) {
        if (origins.origin[iso] === trait.id) {
          char.origin = trait.id;
        }
      }
    }
  }
}

var newCharacterList = [];

//puts all teams into one big object, not separated by team. Will need to change approach in future
for (let team in characterList) {
  characterList[team].forEach((actualTeam) => {
    newCharacterList.push(actualTeam);
  });
}

// console.log(newCharacterList);

// const searchString = "GEAR_ORANGE_MYSTIC_MAT_C5";
// var pieceCount = 0;
// console.log(characterList.Darkhold[0].gearTiers)

// const pieceFinder = (pieceId, gearObject, subTotal) => {
//   if(gearObject.id === pieceId) {
//     console.log(gearObject)
//     pieceCount += subTotal;
//   }

//   if (gearObject.hasOwnProperty('directCost')) {
//     gearObject.directCost.forEach((subPiece) => {
//       pieceFinder(pieceId, subPiece.item, subPiece.quantity)
//     })

//   }
// }

// const countPiece = (searchString, searchObject) => {
//   // console.log(searchString, searchObject)
//   for (let topPiece in searchObject) {
//     if (searchObject[topPiece].hasOwnProperty('slots')) {
//       searchObject[topPiece].slots.forEach((midPiece) => {
//         if(midPiece.piece.hasOwnProperty('directCost')) {
//           pieceFinder(searchString, midPiece.piece, 0)
//         }
//       })
//     }
//   }
// }

// countPiece(searchString, characterList.Darkhold[0]?.gearTiers);
// console.log(pieceCount)

const COLUMNS = [
  {
    Header: "Portrait",
    accessor: "portrait",
    Cell: (props) => {
      // console.log(props);
      return (
        <span>
          <div>
            <img src={props.row.original.portrait} alt="Portrait"></img>
          </div>
          <div>{props.row.original.name}</div>
        </span>
      );
    }
  },
  {
    Header: "ISO-8 Class",
    accessor: "isoClass"
  },
  {
    Header: "ISO-8 Icon",
    accessor: "isoIcon",
    Cell: (props) => {
      return (
        <div>
          <img src={require("../../img/" + isoClasses.classIcons[props.row.original.isoClass])} alt="isoIcon"></img>
        </div>
      );
    }
  },
  {
    Header: "Unique Quantity",
    accessor: "uniqueQuantity",
    Cell: (props) => {
      return (
        <div>
          {props?.row?.original?.gearTiers[12]?.slots[1]?.piece?.directCost[2]?.quantity +
            props?.row?.original?.gearTiers[13]?.slots[1]?.piece?.directCost[2]?.quantity +
            props?.row?.original?.gearTiers[14]?.slots[1]?.piece?.directCost[2]?.quantity}
        </div>
      );
    }
  },
  {
    Header: "Unique",
    accessor: "unique",
    Cell: (props) => {
      return (
        <div>
          <div>
            {<img src={props.row.original.gearTiers[12].slots[1].piece.directCost[2].item.icon} alt="13Unique" />}
            {<img src={props.row.original.gearTiers[15].slots[1].piece.directCost[2].item.icon} alt="16Unique" />}
          </div>
          <div>{props.row.original.gearTiers[12].slots[1].piece.directCost[2].item.name}</div>
        </div>
      );
    }
  },
  {
    Header: "Mini Uniques",
    accessor: "miniunique",
    Cell: (props) => {
      return (
        <div>
          {Object.keys(miniUniques[props.row.original.origin]).map((piece) => {
            // console.log(miniUniques[props.row.original.origin][piece]);
            return (
              <img
                src={miniUniques[props.row.original.origin][piece].icon}
                alt={miniUniques[props.row.original.origin][piece].id}
                key={miniUniques[props.row.original.origin][piece].id}
              />
            );
          })}
        </div>
      );
    }
  }
];

export const Products = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => newCharacterList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
