import React, { useEffect, useState, useMemo } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
// import { useAuth } from 'oidc-react';
import axios from 'axios';
import tw from 'twin.macro';

var characters = require('../../data/json/characters.json');
characters = characters.data;
const requiredCharacters = require('../../data/json/requiredCharacters.json');
const isoClasses = require('../../data/json/isoClasses.json');
const iso8Abilities = require('../../data/json/iso8Abilities.json');

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`;


//num is the current trait (Darkhold, Gamma, etc) for which we are searching
var characterList = {};
requiredCharacters.teams.forEach(num => {
  characterList[num] = [];
  characters.forEach(char => {
    char.traits.forEach(trait => {
      if (trait.id === num) {
        characterList[num].push(char)
      }
    })
  })
})


for (let character in characterList) {
  for (let char of characterList[character]) {
    let chargear = require('../../data/json/characters/'+ char.id +'.json')
    char.gearTiers = chargear.data.gearTiers
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

console.log(characterList)

async function doGetRequest(token) {
    let res = await axios.get("https://api.marvelstrikeforce.com/game/v1/characters/Abomination", {
      headers: {
        "Accept": "application/json",
        "x-api-key": "17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw",
        "Authorization": "Bearer " + token
      }
    }
  
    );
  
    let data = res.data;
    console.log(data)
    return (data);
  }

export function Products(props) {
    const [products, setProducts] = useState([]);

    // const { userData } = useAuth();

    // const fetchProducts = () => {
    //     if (userData?.access_token) {
    //         doGetRequest(userData.access_token)
    //             .then(response => {
    //                 const products = response.data;
    //                 setProducts(products);
    //             })
    //             .catch(err => console.log(err))
    //     }

    // };

    // useEffect(() => {
    //     fetchProducts();

    // }, []);

    const data = characterList.Darkhold;
    console.log(data)

    const columns = (([
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      }

    ]))
    // const tableInstance = useTable({ columns, data});

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    // return <Table {...getTableProps()}>
    //   <TableHead>
    //     {headerGroups.map((headerGroup) => (
    //       <TableRow {...headerGroup.getHeaderGroupProps()}>

    //       </TableRow>
    //     ))}
    //   </TableHead>
    // </Table>
    return <div className = "Darkhold">
            {characterList.Darkhold.map((character) => 
              <div className='character.name'>
                <img src={character.portrait} alt="Logo" />
                {character.gearTiers[12].slots[1].piece.directCost[2].quantity + character.gearTiers[13].slots[1].piece.directCost[2].quantity + character.gearTiers[14].slots[1].piece.directCost[2].quantity}
                <img src={character.gearTiers[12].slots[1].piece.directCost[2].item.icon} alt="Unique" />
                    {character.gearTiers[14]?.slots?.map((piece) => 
                      <img src={piece.piece.icon} alt="gearicon" />
                    )}
              </div>
            )}
          </div>

};