# basicWhitelist
basic whitelist system in node.js





# Features
- API to create account
- API to log into account
- API to delete account
- Global password to add account to whitelist or remove account
- Passwords are hashed with bcrypt


# POST /api/v1/signup
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}. 
- Header "key" is required to use.


# POST /api/v1/login
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}
If username and password matches , generate a random string "auth" which will be used as a cookie.


# DELETE /api/v1/removeUser
The body payload must contains the username required to be deleted. 
- Header "key" is required to use.



# To add list ;
- add some cooldown if too many requests are being sent from same ip (prevent people from spamming with one ip to slow down the server) 
- add api to update password rather than having to delete and create a new account with the same username (less bandwith usage if one request rather than two)
- save ip's logs of each user with date time 
