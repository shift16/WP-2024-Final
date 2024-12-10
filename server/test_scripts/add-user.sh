#!/bin/bash
curl -X POST http://localhost:3000/api/v1/protected/users/ \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token" \
    -d '{'\
'"picture": "default",'\
'"email": "e@gmail.com",'\
'"full_name": "Testing Tester",'\
'"is_admin": false,'\
'"total_steps_taken": 3,'\
'"total_calories_burned": 10,'\
'"total_active_minutes": 100,'\
'"average_intensity": 0.6,'\
'"handle": "testeRr"',\
'"password": "12345"'\
'}'