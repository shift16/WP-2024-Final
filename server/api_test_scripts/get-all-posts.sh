#!/bin/bash
curl -X GET http://0.0.0.0:3000/api/v1/protected/posts/all/$id \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token"