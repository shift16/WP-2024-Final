#!/bin/bash
curl -X GET http://localhost:3000/api/v1/protected/posts/friends \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token"