#!/bin/bash
curl -X GET http://0.0.0.0:3000/api/v1/protected/users/all \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token"