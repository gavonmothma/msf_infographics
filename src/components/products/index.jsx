import React, { useMemo } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

//import static data
import characters from      "../../data/json/characters.json";
// import requiredCharacters from "../../data/json/requiredCharacters.json";
import isoClasses from      "../../data/json/isoClasses.json";
import origins from         "../../data/json/origins.json";
import miniUniques from     "../../data/json/miniUniques.json";
import combatData from "../../../data/Config/combat_data/characters.json";
import { useState } from "react";
import { useEffect } from "react";

export const Products = () => {
  const [fullCharacterList, setFullCharacterList] = useState(() => {
    if (characters == null) return [];
    let characterList = [];
    //Seed characterList
    for (let char of characters.data) {
      characterList.push(char);
    }

    //Adds ISO class to characters
    for (let char of characterList) {
      for (let trait of char.traits) {
        for (let iso in isoClasses.classes) {
          if (isoClasses.classes[iso] === trait.id) {
            char.isoClass = trait.id;
          }
        }
      }
    }

    //Adds traits to characters
    for (let char of characterList) {
      for (let trait of char.traits) {
        for (let iso in origins.origin) {
          if (origins.origin[iso] === trait.id) {
            char.origin = trait.id;
          }
        }
      }
    }

    //Adds safetyAttacks to characters
    // for (let char of characterList) {
    //   for (let toon in combatData.Data) {
    //     console.log(toon)
    //     // for (let iso in origins.origin) {
    //     //   if (origins.origin[iso] === trait.id) {
    //     //     char.origin = trait.id;
    //     //   }
    //     // }
    //   }
    // }
    for (let char of characterList) {
      for (let toon of Object.keys(combatData.Data)) {
        // console.log(combatData.Data[toon].safety);
        if (char.id === toon) {
          char.safety = combatData.Data[toon].safety.actions;
        }
      }
    }
    return characterList;
  });

  useEffect(() => {
    const fetchGearData = (characterList) => {
      return new Promise((resolve, reject) => {
        for (let char of characterList) {
          let chargear;
          if (char.id === "Hawkeye") return;
          fetch("/characters/" + char.id + ".json")
            .then((response) => response.json())
            .then((data) => {
              chargear = data;
              char.gearTiers = chargear?.data?.gearTiers;
              setFullCharacterList((currentCharacterList) => {
                return currentCharacterList.map((chars) => {
                  if (chars?.id === chargear?.data?.id) {
                    const temp = chargear.data.gearTiers;
                    return { ...chars, gearTiers: temp };
                  }
                });
              });
            })
            .catch((error) => reject(error));
        }
      });
    };

    fetchGearData(characters.data)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  var pieceCount = 0;

  const pieceFinder = (pieceId, gearObject, subTotal) => {
    if (gearObject.id === pieceId) {
      pieceCount += subTotal;
    }

    if (gearObject.hasOwnProperty("directCost")) {
      gearObject.directCost.forEach((subPiece) => {
        pieceFinder(
          pieceId,
          subPiece.item,
          subPiece.quantity * (subTotal || 1)
        );
      });
    }
  };

  const countPiece = (searchString, searchObject) => {
    for (let topPiece in searchObject) {
      if (searchObject[topPiece].hasOwnProperty("slots")) {
        searchObject[topPiece].slots.forEach((midPiece) => {
          if (midPiece.piece.hasOwnProperty("directCost")) {
            pieceFinder(searchString, midPiece.piece, 0);
          }
        });
      }
    }
  };

  const COLUMNS = [
    {
      Header: "Portrait",
      accessor: "portrait",
      Cell: (props) => {
        return (
          <span>
            <div>
              <img src={props.row.original.portrait} alt="Portrait"></img>
            </div>
            <div>{props.row.original.name}</div>
          </span>
        );
      },
    },
    {
      Header: "ISO Attack",
      accessor: "safety",
      className: "safetyAttack",
      Cell: (props) => {
        return (
          <div className="safetyAttack">
            <JsonView
              src={props?.row?.original?.safety}
              displaySize='collapsed'
              collapsed={1}
              
            />
          </div>
        );
      },
    },
    {
      Header: "ISO-8 Class",
      accessor: "isoClass",
    },
    {
      Header: "ISO-8 Icon",
      accessor: "isoIcon",
      Cell: (props) => {
        return (
          <div>
            <img
              src={"/img/" + isoClasses.classIcons[props.row.original.isoClass]}
              alt="isoIcon"
            ></img>
          </div>
        );
      },
    },
    {
      Header: "Unique",
      accessor: "unique",
      Cell: (props) => {
        return (
          <div>
            <Container>
              <Row>
                {/* <Col md="auto">
                  <figure className="position-relative">
                    {
                      <img
                        src={
                          props?.row?.original?.gearTiers
                            ? props?.row?.original?.gearTiers[12]?.slots[1]
                                ?.piece?.directCost[2]?.item?.icon
                            : "loading"
                        }
                        alt="13Unique"
                      />
                    }
                    <figcaption>
                      {props?.row?.original?.gearTiers
                        ? props?.row?.original?.gearTiers[12]?.slots[1]?.piece
                            ?.directCost[2]?.quantity +
                          props?.row?.original?.gearTiers[13]?.slots[1]?.piece
                            ?.directCost[2]?.quantity +
                          props?.row?.original?.gearTiers[14]?.slots[1]?.piece
                            ?.directCost[2]?.quantity
                        : "loading"}
                    </figcaption>
                  </figure>
                </Col> */}
                <Col md="auto">
                  <figure className="position-relative">
                    {
                      <img
                        src={
                          props?.row?.original?.gearTiers
                            ? props.row.original.gearTiers[15].slots[1].piece
                                .directCost[2].item.icon
                            : "loading"
                        }
                        alt="16Unique"
                      />
                    }
                    {/* <figcaption>
                      {props?.row?.original?.gearTiers
                        ? props?.row?.original?.gearTiers[15]?.slots[1]?.piece
                            ?.directCost[2]?.quantity +
                          props?.row?.original?.gearTiers[16]?.slots[1]?.piece
                            ?.directCost[2]?.quantity
                        : "loading"}
                    </figcaption> */}
                  </figure>
                </Col>
                {/* <Row>
                  <Col md="auto">
                    {props?.row?.original?.gearTiers
                      ? props.row.original.gearTiers[12].slots[1].piece
                          .directCost[2].item.name
                      : "loading"}
                  </Col>
                </Row> */}
              </Row>
            </Container>
          </div>
        );
      },
    },
    // {
    //   Header: "Mini Uniques",
    //   accessor: "miniunique",
    //   Cell: (props) => {
    //     return (
    //       <div>
    //         <Container>
    //           <Row>
    //             {Object.keys(miniUniques[props.row.original.origin]).map(
    //               (piece) => {
    //                 pieceCount = 0;
    //                 countPiece(
    //                   miniUniques[props.row.original.origin][piece].id,
    //                   props.row.original.gearTiers
    //                 );
    //                 return (
    //                   <Col
    //                     md="auto"
    //                     key={miniUniques[props.row.original.origin][piece].id}
    //                   >
    //                     <figure className="position-relative">
    //                       <img
    //                         src={
    //                           miniUniques[props.row.original.origin][piece].icon
    //                         }
    //                         alt={
    //                           miniUniques[props.row.original.origin][piece].id
    //                         }
    //                         key={
    //                           miniUniques[props.row.original.origin][piece].id
    //                         }
    //                       />
    //                       <figcaption>{pieceCount}</figcaption>
    //                     </figure>
    //                   </Col>
    //                 );
    //               }
    //             )}
    //           </Row>
    //         </Container>
    //       </div>
    //     );
    //   },
    // },
  ];

  if (!fullCharacterList) return;
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => fullCharacterList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return fullCharacterList ? (
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
  ) : (
    "loading"
  );
};
