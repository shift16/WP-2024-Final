#!/bin/bash
curl -X DELETE http://0.0.0.0:3000/api/v1/protected/posts/$id \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token"