#!/bin/bash
curl -X POST http://0.0.0.0:3000/api/v1/protected/friends/ \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token" \
    -d '{'\
'"handle": "'"$friend"'"'\
'}'