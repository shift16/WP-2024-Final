#!/bin/bash
curl -X DELETE http://localhost:3000/api/v1/protected/users/$id \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token"