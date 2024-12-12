#!/bin/bash
curl -X POST http://0.0.0.0:3000/api/v1/public/session/signup \
    -H "Content-Type: application/json" \
    -d '{'\
'"picture": "default",'\
'"email": "ookook@gmail.com",'\
'"full_name": "Monke",'\
'"handle": "monkE"',\
'"password": "harambe"'\
'}'