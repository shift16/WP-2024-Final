#!/bin/bash
curl -X POST http://localhost:3000/api/v1/public/session/signup \
    -H "Content-Type: application/json" \
    -d '{'\
'"picture": "default",'\
'"email": "ookook@gmail.com",'\
'"full_name": "Monke",'\
'"handle": "monkE"',\
'"password": "harambe"'\
'}'