#!/bin/bash
curl -X POST http://localhost:3000/api/v1/protected/posts/ \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token" \
    -d '{'\
'"content": "Ook!",'\
'"post_date": "2069-04-20",'\
'"steps_taken": 1,'\
'"distance_traveled": 100000,'\
'"calories_burned": 1,'\
'"active_minutes": 1,'\
'"workout_intensity": 0.2'\
'}'