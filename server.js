//libraries nad variables
const express = require('express');
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex') //to connect server with database

const register = require('./register');
const signin = require('./signin');
const profile = require('./profile');
const image = require('./image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0000',
    database : 'face_brain_api'
  }
});

//to use get body of the request
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
	//res.send("this is working")
	res.json("Working")
})

//signin
app.post('/signin', (req,res) => { signin.makeSignin(req,res,db,bcrypt) })
	

//register
app.post('/register', (req,res) => { register.makeRegister(req,res,db,bcrypt) })


//ID checking
app.get('/profile/:id', (req,res) => { profile.makeProfile(req,res,db)});


//to count entries of a user using inputted ID
app.put('/image', (req,res) => { image.makeImage(req,res,db)});
app.post('/imageurl', (req,res) => { image.makeApiCall(req,res)});


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})

