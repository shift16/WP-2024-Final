#!/bin/bash
curl -X DELETE http://localhost:3000/api/v1/protected/users/$ID \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $TOKEN"