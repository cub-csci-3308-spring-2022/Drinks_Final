const express = require("express"); // so we can use the express library
const app = express(); // so we can access the express library


var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'drinksdb',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);



app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory
app.set("view engine", "ejs"); // to be able to view the ejs file


app.get("/", (req, res) => {
  res.render("home"); // to view the homepage inex is the name
});

app.get("/users/signup", (req, res) => { 
  res.render("signup.ejs");
});

app.get("/users/login", (req, res) => { 
  res.render("login.ejs"); // to view the login page
});

app.get("/users/favorite", (req, res) => { 
  res.render("favorite"); 
});


app.get("/users/logout", (req, res) => {
  req.logout();
  res.render("home", { message: "You have logged out successfully" });
});

app.post("/users/signup", function (req, res) {
  var fname = req.body.fname;
	var lname = req.body.lname;
	var username = req.body.username;
  var birthyear = req.body.birthyear
  var password = req.body.password
  var password2 = req.body.password2
  var insert_statement = "INSERT INTO users(firstName, lastName, DOB, username, password) VALUES('" + fname + "','" + lname + "','" + birthyear +"','" + username +"','" + password +"');"; // Write a SQL statement to insert
	//var insert_statement2 = "SELECT * FROM users WHERE username = $1`,"

  let errors = [];

  console.log({
    fname,
    lname,
    username,
    birthyear,
    password,
    password2
  });

  if (!fname || !lname || !username ) {
    errors.push({ message: "Please enter all fields" });
  }

  if (errors.length > 0) {
    res.render("signup", { errors, fname, lname, username, birthyear, password, password2 });
  } else 
  
  {
    //db.task(
      //[username],
      (err, results) => {
        //if (err) {
          //console.log(err);
        //}
        //console.log(results.rows);

        //db.task('get-everything', task => {
          //return task.batch([
            //  task.any(insert_statement2)
          //]);
      //})
      //.then(results => {
        //console.log(results.rows);
      //})
      //.catch(err => {
        //      console.log('error', err);
      //});

        //if (results.rows.length > 0) {
          //return res.render("signup", {
            //message: "Username already registered"
          //});
        //} else {
          db.any(insert_statement)

        .then(results => {
          //console.log(res.rows);
          return res.redirect('pages/login');
        })
        .catch(err => {
                console.log('error', err);
        });
        }
     // }
    //);
  }
});
//ui
// emily 
app.get('/users/ingredients', (req,res)=>{
	res.render('ingredients');
});



//api
app.post('/users/ingredients/search', function(req,res){
	const selected_ingredients = []
	const input_ingredients = req.body;
	for (var ingredient in input_ingredients){
		selected_ingredients.push(input_ingredients[ingredient]);
	}
	console.log(selected_ingredients);
	//search db call

});

app.listen(3000);
console.log('3000 is the magic port');