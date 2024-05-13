import requests
import json

with open('./characters.json', 'r') as openfile:
  characters = json.load(openfile)

headers = {
    'Accept': 'application/json',
    'x-api-key': '17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw',
    'Authorization': 'Bearer Ta5dZEdbwBrzNeauv0IkiyYTWCF-LjIXOJg5Zyy1v68.2unchiUqxG6lQdbzqdYRfKm0ggWmhnnsJaw2vBoOoLc',
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

print ("Now run mv ./temp/* ./public/characters/")



# cd ~/projects/msf/msf_infographics
# cp ~/projects/msf/new/Config/combat_data/characters.json ~/projects/msf/msf_infographics/data/Config/combat_data/


# Pull new characters.json

# curl -X GET "https://api.marvelstrikeforce.com/game/v1/characters?status=playable" \
# -H "Accept: application/json" \
# -H "x-api-key: 17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw" \
# -H "Authorization: Bearer Ta5dZEdbwBrzNeauv0IkiyYTWCF-LjIXOJg5Zyy1v68.2unchiUqxG6lQdbzqdYRfKm0ggWmhnnsJaw2vBoOoLc"
# -o characters.json

# cp characters.json ~/projects/msf/msf_infographics/src/data/json/

# python3 scraper.py
# mv ./temp/* ./public/characters/

# git add -A
# git commit -am "Updated"
# git push