# Backend.

1. npm init : npm init is used to initialize a new Node.js project by creating a package.json file.
2. package.json : stores the metadata and configuration required my npm and nodejs.
   > package.json => scripts -> "dev" : "node index.js"
3. npm run dev : to start the project.
   > this is package.json folder.

```
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A simple Node project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Shivansh",
  "license": "ISC"
}
```

- "type":module or common js use whatever suits your code.

  4.Prettier: for better format of code to ensure readability of others too

```
npm install --save-dev --save-exact prettier
npx prettier . --write
```

- create .prettierrc file in project, and write json code

```
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- create another file with .prettierignore , add files which u want dont touch with prettier example : node_module , env

5. .gitignore : mention the files which u dont want to push to github example : .env file , node_module.

### Auto Start Of SERVER.

6. install nodemon : automatically restart the server when any change detected in the directory.

```
npm install --save-dev nodemon
npm run dev
```

- go to package.json => scripts => "dev" : "nodemon index.js" => "start" : "node index.js".

7. Install dotenv,make a file with name .env

- go to index.js or mainfile write

```
import dotenv from "dotenv";
dotenv.config ({
    path : "./.env",
});
let myusername = process.env.database;
```

### Project STRUCTURE.

- public - images
- src - controllers , db , middlewares , models , routes , utils, validators, index.js
  > also go and change package.json => "main" : src/index.js

8. dont push anything to github rightnow because these are empty files so git will remove them while pushing. secret of this to push make a file name inside empty folder with name .gitkeep

## Express && Mongo

> npm install express

```
const express = require('express')// instead of this use import statement.
const app = express()
const port = process.env.PORT ||3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

- req => request what u will get back from server
- res => response what u are sending.
- once it listen successfully it will print in app.listen

### POSTMAN

9. it is api development and testing tool.

- collection => make new and test your API.

10. Now create a new file inside src folder with name app.js which will hold all express code to make index.js file more readable and short.

    > export defaull app; // below app.js file and import in index.js

11. EXPRESS: app.use=> middleware(frontend-backend)

### CORS

CORS is a browser security mechanism that controls whether a web page can request resources from a different origin (domain, protocol, or port).

- cross origin resource sharing.
  > npm install cors
- ALL these codes inside app.js(or where express code is present)
  > basic configuration

```
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded ({extended: true, limit:"16kb"}));
app.use(express.static("public"));
```

> cors configuration

```
app.use(cors({
  origin : process.env.CORS_ORIGIN?.spilit(",") || "http://localhost:5173",
  credentials : true,
  methods : ["GET","POST",... CHATGPT],
  allowedHeaders : ["Content-Type","Authorization","X-Requested-With","Accept"],
}));
```

## WHEN CLIENT TALK TO SERVER THERE ARE 2 POSSIBILTES

- get response successfully
- get error

#### ERROR RESPONSE : status code , data , message

#### RESPONSE : status code , data , message

> create them in utils.

> for this we will make standard responses for both error and success response.

1. error are presend in nodejs we can change and use them.
2. but response we have to craft by ourself.
3. Also create constants.js in utils where u can keep all your constants which u have to use multiple times.

## Connect to Mongo (ATLAS)

Our server can connect to database directly but we add additional layer of mongoose between them for better.
Mongoose are ODM(object database mapper) or ORM(object relational mapper).

> npm install mongoose

- create a file inside db folder index.js(can take any filename)

```
import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection Error", error)
        process.exit(1);
    }
}
export default connectDB;
```

> import index.js from db and to mainfile(index.js), to check weather mongoDB is working or not if yes then only port works.

```
// only listen to port when database is connected.
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
```

/////////////////////////////////////////////////////////////////////////////////////////////

### Creating HealthCheck API

1. Controllers : write the logic (function), i.e 200, message : server running okay...
   > instead of try catch method prefer higher order function.

```
import {ApiResponse} from '../utils/api-response.js';
const healthCheck = (req,res) => {
    try {
        res
        .status(200)
        .json(new ApiResponse(200,{message : "Server is running"}));
    } catch (error) {
    }
};
export {healthCheck};
```

2. routes : path towares app.js
   > basic route u have to write everytime..

```
import { Router } from "express";

const router = Router();

export default router;


```

3. HOW HIGHER ORDER FUNCTION
   > create this in controller , which goes to asyncHandler for taking response

```
const healthCheck = asyncHandler(async(req , res)=>{
    res
    .status(200)
    .json(new ApiResponse(200, {message : "Server is Running Fine!"}));
});

export {healthCheck};

```

> After it create a asyncHandler in utils which gives response and written response with error define in nodejs with NEXT method that is use as middleware and handle errors.

- u can use this template for using other alsp it can handle other response as well and better part is u dont have to mention about errors..

```
const asyncHandler = (requestHandler) => {
    return (req , res , next) => {
        Promise.resolve(requestHandler(req , res , next))
        .catch((err)=> next(err));
    };
};
export {asyncHandler};
```

## API ENDPOINTS

1. models : where u keep structure or Schema

- so created :- user.models.js

> we have created a model for user in user.models it also give us to attach some of the methods to attach with it

- SCHEMA (USER MODEL) ==> WRITE METHODS + HOOKS

### pre SAVE post (mongoose)

- anything u want to do before saving of data is known as pre hooks
- anything after it saving data is post hooks.

2. To encrypt any field use :
   > node.bcrypt.js or npm i bcrypt.

- in this case we want to hash the password before saving the password into SAVE or we can say we use in pre hook phase.

```
// this will hash the password again n again so if condn is required to check

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await brcypt.hash(this.password, 10);
    next();
});

// this is the method present with schema to check the password weather it is true or false.

userSchema.methods.isPasswordCorrect = async function (password){
    return await brcypt.compare(password , this.password);
};

```

3. JWT: JSON WEB TOKEN, when client or brower send multiple request on server to respond u immediately that u are registered user we use JWT . they are string format that u send everytime u send request.

### JSON WEB TOKEN

> cjerbc.jrehfbeujw.wjbciuw

- Authorization : Bearer <token>
- consist of three parts

1. header
2. payload
3. signature

- what are access token and what are refresh token.

---

Token are long string like
fjbiwrbiruwb.fwbeiywfi.wchbiwubicb

- they are 2 types,

1. with data : they have string + some data not readable, are of 2 types

- access token : 1day validity or short lived, they are not stored in database, this token is used to check weather u are logged in or not if till the time access token is expired it will refresh the token and new access token is send to client
- refresh token : 10days validity, they are stored in database.
- both the tokens are created in server.

---

2. without data : generate a long string , use for one time or very less time
   client send this data to server they matches with server and server looks into database if matches they send back what they want.

- jsonwebtoken npm this is used to create with data token
  > npm i jsonwebtoken

### GO TO .env file n save

- ACCESS_TOKEN_SECRET = shivi
- ACCESS_TOKEN_EXPIRY = 1d

- REFRESH_TOKEN_SECRET = shivi
- REFRESH_TOKEN_EXPIRY = 10d

---

// go to https://github.com/vercel/ms and check ways to define these variables.

```
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expireIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}
```

1. userSchema.methods.generateAccessToken = function() :- This adds a custom instance method to your Mongoose model,Every user document can call this function.
2. jwt.sign(payload, secret, options)

- {
  \_id : this.\_id,
  email : this.email,
  username : this.username
  }
- It contains user information that will be encoded inside the token.
- process.env.ACCESS_TOKEN_SECRET

2. refreshtoken

- The refresh token only stores the user id.
  refresh tokens should contain minimal information
  reduces security risk if leaked

---

```
User Login
   ↓
Server verifies password
   ↓
generateAccessToken()
generateRefreshToken()
   ↓
Send tokens to client
   ↓
Client uses Access Token for API requests
   ↓
Access Token expires
   ↓
Client sends Refresh Token
   ↓
Server issues new Access Token
```

- crypto nodejs built in node library use to make without data token,This method creates a temporary verification/reset token for a user. Such tokens are commonly used in flows like password reset, email verification, or account activation.
  The function generates a random token, hashes it for secure storage, and sets an expiration time.

```
userSchema.methods.generateTemporaryToken = function (){
    // generates a 20 bytes random and convert them to hex

    const unHashedToken = crypto.randomBytes(20).toString("hex");

    //Creates a secure hash of the token using the SHA-256.

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) // 20 mins
    return {unHashedToken , hashedToken , tokenExpiry}
};
```

> Instead of storing the actual token in the database, you store only the hash.

Access Token
→ authenticate API requests

Refresh Token
→ maintain login sessions

Temporary Token
→ verify sensitive actions (reset password, verify email)

# Register the user

- take some data
- validate the data
- check in DB if user already exists
- saved the new user(AT,RT,GT,sendmail)
- user verification => email
- send response back to the request

1. install mailgen npm
   > npm install mailgen --save

- go to utils, mail.js , and generate a email
  > Nodemailer npm
  > npm i nodemailer
- this is the template of creating emailverification mail with the help of nodemailer check in docs for more example, create same for forgotmailcontent.

```
const emailVerificationMailgenContent = (username,verificationUrl) => {
    return {
        body : {
            name : username,
            intro : "welcome to our app! we're excited to have you on board.",
            action : {
                instructions : "to verify your email please click on the following button",
                button : {
                    color : "#22BC66",
                    text : "verify your email",
                    link : verificationUrl
                },
            },
            outro : "need help, or have question? just reply to this email, we'd love to help",
        },
    };
};
```

- use mailtrap to send and test mails

```
// this function sends and generate mail
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme : "default",
        product : {
            name : "Task Manager",
            link : "https://taskmanagelink.com"
        }
    })
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const transporter = nodemailer.createTransport({
        host : process.env.MAILTRAP_SMTP_HOST,
        port : process.env.MAILTRAP_SMTP_PORT,
        auth : {
            user: process.env.MAILTRAP_SMTP_USER,
            pass : process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from : "mail.taskmanager@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHtml
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Service Failed silently. make sure that you have provided your mailtrap credentials in the .env file")
        console.error("Error: ", error);
    }
}

```

2. auth.controllers.js

- check database user already exist with same email or username or not.
- if user exist with same email and username throw the error
- if user is not existed , then save it using User.create(
)
- generates refresh and accesstoken, and send to server by client.

> Register the user 
- now create routes :- auth.routes.js

## Validation.

- libraries : zod , yup , express-validator.
- middleware => validation => routes.
  > npm i express-validator

## LOGIN

- take data from user
- validate
- if user exists
- is password is correct
- generate - TOKENS
- send tokens in cookies
> express dont have directly access to cookies or they dont have, but there is COOKIE-PARSER who can do it for express
npm i cookie-parser

- in auth.controllers.js => write function for login, take email pass and password from user or frontend body 
- after successfully , give them access and refresh token. and and send response 
- also update auth.routes.js , also write custom validation and check response.

## write auth middleware 
means to check inbetween sending from client to server and check weather they are going with accesstoken or not 
- every contollers has to check weather they have accesstoken or not , repeated task thats why we will check in between of response with one single file
- it also has access to req.user
>auth.middleware.js
-- steps 
1. intercept the reqeust in between (client to server)
2. and access the ACCESS-TOKEN 
3. decode the information from access-token
4. inject the information in request


# logout
client sends reqeust to server for logout, auth.middleware intercepts inbetween and checks if they are registered user or not , having accesstoken if yes then logged out successfully.