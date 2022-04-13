const express = require("express"); // so we can use the express library
const app = express(); // so we can access the express library
const fetch = require('node-fetch');

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
var selected_ingredients = [];
var currentuser;

app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory
app.set("view engine", "ejs"); // to be able to view the ejs file


app.get("/users/home", (req, res) => {
  res.render("home.ejs",{currentuser:currentuser}); // to view the homepage inex is the name
});

// app.get("/users/signup", (req, res) => {
//   res.render("signup.ejs");
// });

app.get("/", (req, res) => {
  res.render("login.ejs"); // to view the login page
});

app.get("/users/favorite", (req, res) => {
  res.render("favorite",{currentuser:currentuser});
});


app.get("/users/logout", (req, res) => {
  req.logout();
  res.render("home", { message: "You have logged out successfully" });
});

// Jairo - signup
app.post("/users/signup", function (req, res) {
  var fname = req.body.fname;
	var lname = req.body.lname;
	var username = req.body.username;
  var birthyear = req.body.birthyear
  var password = req.body.password
  var password2 = req.body.password2
  var insert_statement = "INSERT INTO users(firstName, lastName, DOB, username, password) VALUES('" + fname + "','" + lname + "','" + birthyear +"','" + username +"','" + password +"');";

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
    res.render("signup", { errors, fname, lname, username});
  }

  else
  {
    db.task('get-everything', task => {
          return task.batch([
              task.any(insert_statement)
          ]);
      })
      .then(info => {
        res.render("login.ejs")
      })
      .catch(err => {
              console.log('error', err);
              res.render('/users/signup.ejs')
      });
  }
});

// Duncan - Login
app.post("/users/login.ejs", function(req, res) {
  var username = req.body.username;
	var password = req.body.password;
	//var query = 'select username, password from users;';
	var query = "select * from users where username = '" + username + "';";
	db.any(query)
        .then(function (rows) {
					console.log(rows);
					// if(rows.length == 0){
					// 	console.log('error', err);
					// 	return
					// }
      		if(rows[0].password == password){
						currentuser = rows[0];
						console.log(currentuser);
						return res.redirect("/users/home");
					}
					else{
						console.log({
					    username,
					   	password
					  });
					}
			})
        .catch(function (err) {
            console.log('error', err);
            res.render('login.ejs', {

        })
			})
});

// Dummy Load Database
// INSERT INTO users(firstName, lastName, DOB, username, password) VALUES('easy','checkc','20000101','user','pass');

// Access Database
//docker-compose exec db psql -U postgres


//ui
// emily
app.get('/users/ingredients', (req,res)=>{
  var empty = {};
	res.render('ingredients',{currentuser: currentuser, all_drinks: empty});
});


//api
app.post('/users/ingredients', async function(req,res){
  selected_ingredients = []
	const input_ingredients = req.body;
	for (var ingredient in input_ingredients){
		selected_ingredients.push(input_ingredients[ingredient]);
	}
  console.log(selected_ingredients);


	//search db call
  var result = await getDrinkNames(selected_ingredients);
  console.log(result);

  res.render('ingredients', {currentuser: currentuser, all_drinks: result}); 
});


//API CALLING CODE

var url = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=';
//var ingredients = [];
//var measurement = [];
urlTwo = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';


async function getDrinkIngredients(drink_name){

  var ingredients = [];
  var measurement = [];

	var main_promise = fetch(urlTwo + drink_name)
	.then(
		async function(response) {
			if (response.status !== 200){
			console.log('there was a problem fetching the API');
			return;
			}


			var promise = response.json().then(function(data)
			{
				console.log(data);
				  //console.log(data.drinks[0]["strDrink"]);

				for(var i = 1; i < 10; i++)
          {
            var ing = "strIngredient" +i;
					  var mes = "strMeasure" +i;
					  if(data.drinks[0][ing] == null)
					  {
						  return;
					  }
					  ingredients.push(data.drinks[0][ing]);
					  measurement.push(data.drinks[0][mes]);
					  //console.log(measurement[i-1], ingredients[i-1]);
          }
      }


			)
      await promise;
		}
	)
	.catch(function(err) {
		console.log('Fetch Error:-S', err);
    return {};
	});
  await main_promise;
  return {ingredients: ingredients, measurement: measurement};
}


async function getDrinkNames(selected_ingredients){

  var drink_names = [];
  var drinks = {};
	var main_promise = fetch(url + selected_ingredients)
	.then(
		async function(response) {
			if (response.status !== 200){
			console.log('there was a problem fetching the API');
			return;
			}


			var promise = response.json().then(async function(data)
      
			{

                for(var i = 0; i < data.drinks.length; i++)
                {
                    drink_names.push(data.drinks[i].strDrink);
                }
				for(var j = 0; j < drink_names.length; j++)
				{
          drinks[drink_names[j]] = await getDrinkIngredients(drink_names[j]);

				}
            })
      await promise
		}
	)
	.catch(function(err) {
		console.log('Fetch Error:-S', err);
	});
  await main_promise;
  return drinks;
}



app.listen(3000);
console.log('3000 is the magic port');
