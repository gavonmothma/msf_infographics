# must specify bearer token in command line

cd ~/projects/msf/msf_infographics
cp ~/projects/msf/new/Config/combat_data/characters.json ~/projects/msf/msf_infographics/data/Config/combat_data/


# Pull new characters.json
echo "$1"

curl -X GET "https://api.marvelstrikeforce.com/game/v1/characters?status=playable" \
 -H "Accept: application/json" \
 -H "x-api-key: 17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw" \
 -H "Authorization: Bearer "$1"" -o characters.json

cp characters.json ~/projects/msf/msf_infographics/src/data/json/

python3 scraper.py "$1"

#exit 1

mv ./temp/* ./public/characters/

git add -A
git commit -am "Updated"
git push
