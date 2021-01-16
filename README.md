# basicWhitelist
basic whitelist system in node.js





# Features
- API to create account
- API to log into account




# POST /api/v1/signup
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}



# POST /api/v1/login
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}
If username and password matches , generate a random string "auth" which will be used as a cookie.


