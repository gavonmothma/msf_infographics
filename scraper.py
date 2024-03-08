import requests
import json

with open('./characters.json', 'r') as openfile:
  characters = json.load(openfile)

headers = {
    'Accept': 'application/json',
    'x-api-key': '17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw',
    'Authorization': 'Bearer LF_8OX0465awZBSlh-doRseHMGyU9ULxUwPfEbHu2yk.Rn4-xxxx3m32QDbUIwLhEEMHTwtpfxZH2V0O3O20tlA',
}

params = {
    'costumes': 'none',
    'pieceDirectCost': 'full',
    'subPieceInfo': 'full',
}

for toon in characters['data']:
    response = requests.get('https://api.marvelstrikeforce.com/game/v1/characters/' + toon['id'], params=params, headers=headers)

    json_object = json.dumps(response.json())

    with open("./temp/" + toon['id'] + ".json", "w") as outfile:
        outfile.write(json_object)

print ("Now run mv ./temp/* ./public/data/json/characters/")