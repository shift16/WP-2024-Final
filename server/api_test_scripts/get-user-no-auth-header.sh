#!/bin/bash
curl -X GET http://localhost:3000/api/v1/protected/users/$id \
    -H "Content-Type: application/json"