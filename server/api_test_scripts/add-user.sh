#!/bin/bash
curl -X POST http://0.0.0.0:3000/api/v1/public/session/signup \
    -H "Content-Type: application/json" \
    -d '{'\
'"picture": "default",'\
'"email": "bigguy@gmail.com",'\
'"full_name": "Big Guy",'\
'"handle": "bigguy"',\
'"password": "jschlatt"'\
'}'