#!/bin/bash
curl -X POST http://0.0.0.0:3000/api/v1/public/session/login \
    -H "Content-Type: application/json" \
    -d '{"userHandle": "'"$handle"'", "userPassword": "'"$pass"'"}'