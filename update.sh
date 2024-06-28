cd ~/projects/msf/msf_infographics
cp ~/projects/msf/new/Config/combat_data/characters.json ~/projects/msf/msf_infographics/data/Config/combat_data/


# Pull new characters.json

curl -X GET "https://api.marvelstrikeforce.com/game/v1/characters?status=playable" \
 -H "Accept: application/json" \
 -H "x-api-key: 17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw" \
 -H "Authorization: Bearer uLMBos9lsl_0c1ce3XhaefOnhcJ8YaY4168FA6G1NVo.7LX3akcwKcsAmy-GXWqFH3YKJvv0ZFrHs5PkLhMSd50" -o characters.json

cp characters.json ~/projects/msf/msf_infographics/src/data/json/

python3 scraper.py
mv ./temp/* ./public/characters/

git add -A
git commit -am "Updated"
git push
