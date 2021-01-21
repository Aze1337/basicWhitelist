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


# DELETE /api/v1/removeUser
The body payload must contains the username required to be deleted




# To add list ;
- have a private password for creating account aswell (sent either as payload or header)
- have a private password to use the removeUser api (sent either as payload or maybe header)
- maybe add some cooldown if too many requests are being sent from same ip 
