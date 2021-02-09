# basicWhitelist
basic whitelist system in node.js





# Features
- API to create account
- API to log into account
- API to delete account
- Global password to add account to whitelist or remove account



# POST /api/v1/signup
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}



# POST /api/v1/login
The body payload must be in JSON and have the username and password . eg  - {"username":"username", "password":"pwhere"}
If username and password matches , generate a random string "auth" which will be used as a cookie.


# DELETE /api/v1/removeUser
The body payload must contains the username required to be deleted




# To add list ;
- maybe add some cooldown if too many requests are being sent from same ip 
- add bcrypt
- add api to update password rather than having to delete and create a new account with the same username
- save ip's logs of each user with date time
