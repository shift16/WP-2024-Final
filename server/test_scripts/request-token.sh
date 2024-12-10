#!/bin/bash
curl -X POST http://localhost:3000/api/v1/public/session/request-token \
    -H "Content-Type: application/json" \
    -d '{"userHandle": "'"$HANDLE"'", "userPassword": "'"$PASSWORD"'"}'