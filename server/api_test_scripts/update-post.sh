#!/bin/bash
curl -X PATCH http://localhost:3000/api/v1/protected/posts/$id \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer $token" \
    -d '{'\
'"content": "Goodbye, world!",'\
'"post_date": "2070-04-20",'\
'"steps_taken": 12,'\
'"distance_traveled": 100,'\
'"calories_burned": 300,'\
'"active_minutes": 20,'\
'"workout_intensity": 0.2'\
'}'