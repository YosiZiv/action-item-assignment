List of dependencies
1. axios for http request 
2. dotenv to store env variables
2. express server framework
3. express-async-errors package allow us to use throw error in express (alternative for next())
4. express-validator for data validation
5. mongoose orm package to database crud
6. ts-node-dev execute typescript project
7. typescript to use typescript

Project Start
1. npm install
2. npm start
attached .env file is in the project

API END POINT EXAMPLE 
1. Create User
@POST http://localhost:3000/api/users/ @BODY {
@BODY EXAMPLE {    
@REQUIRE "name": "yosi",
@REQUIRE "password": "password",
@REQUIRE "age": 32,
@REQUIRE "city": "gat"
} 

2. Create Task
@POST http://localhost:3000/api/workout/ 
@BODY EXAMPLE {
@REQUIRE "type": "cycling",
@REQUIRE "location": {
    "lat": "32.065830",
    "lon": "34.838560"
},
@REQUIRE  "duration": 40,
@REQUIRE "pollutionLevel": "test",
@OPTIONAL "comments": "test"
} 
* Require: Authorization Basic Auth

3. Update Task
@PUT http://localhost:3000/api/workout/ 
@BODY EXAMPLE {
@REQUIRE "workoutId": "60003d8e879db53a1ca9b6de",
@REQUIRE "type": "running",
@REQUIRE "location": {
    "lat": "48.856220",
    "lon": "2.293067 "
    },
@OPTIONAL "duration": 22
} 
* Require: Authorization Basic Auth

4. Delete Task
@DELETE http://localhost:3000/api/workout/ 
@BODY EXAMPLE {
@REQUIRE "workoutId": "60003d8e879db53a1ca9b6de",
}                                       
* Require: Authorization Basic Auth


5. Get tasks
@GET http://localhost:3000/api/workout/ 
@BODY EXAMPLE 
{
@OPTIONAL 
"pollutionLevelFilter": {
	"fromPollutionLevel":"40",
        "toPollutionLevel": "64"
},
@OPTIONAL 
"dateFilter": {
 	"fromDate": "2021-01-12",
        "toDate": "2021-01-15"
}
} 
* Require: Authorization Basic Auth

