# authentication

This project contains an Authentication server.


### Author: Marlene Rinker

- [Submission PR](https://github.com/marlenerinker-401-advanced-javascript/auth-server/pull/5)
- [Tests Report](https://github.com/marlenerinker-401-advanced-javascript/auth-server/actions)
<!-- - [Swagger Hub](https://app.swaggerhub.com/apis/marlene-rinker/api-server/0.1#/) -->
<!-- - [Heroku deployment](https://app-server-mr401.herokuapp.com/) -->



### Setup

#### `.env` requirements
PORT = <port> (will default to 3000 if you don't specify here)

MONGODB_ATLAS_URI=<route to mongo>

SECRET = <secret-string>

TOKEN_EXPIRATION = <when token should expire, for example: 1d>

#### Packages to Install
(see package.json)

dotenv
express
mongoose
bcrypt
cors
jsonwebtoken

For testing:
jest
cf-supergoose



#### Running the app
node index.js 
nodemon index.js


#### Tests
Unit Tests: `npm test server.test.js` (run from the `__tests__` folder) -->

- Assertions Made:

  - User can sign up
  - User gets message if already signed up
  - User can sign in
  - Can get all users
  - User can access /secret with token
  - User with "user" role can access /read, but not /add, /change, or /remove.
  - User with "writer" role can access /read and /add, but not /change or /remove.
  - User with "editor" role can access /read, /add, and /change, but not /remove.
  - User with "admin" role can access /read, /add, /change, and /remove.



#### UML
![UML Diagram](auth-server-uml.jpg)

#### Citations

