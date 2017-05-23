var express    = require("express");
var mysql      = require('mysql');
var cors      = require('cors');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'userdb'
});
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));

// these statements config express to use these modules, and only need to be run once
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Add headers
//app.options('*',cors())
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
// 	//res.setHeader('Access-Control-Allow-Origin', '*');

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

/*get all users*/ 
app.get("/",function(req,res){
    console.log("Inside get api");
    //console.log(req);
//connection.query('SELECT * from allusers', function(err, rows, fields) {
	connection.query('SELECT u.*, r.name from allusers u JOIN roles r ON (u.roleid = r.id)', function(err, rows, fields) {
//connection.end();
  if (!err){
    console.log('The solution is: ');
    console.log(rows);
    res.json(rows);
   // res.send(rows);
  }
  else
    console.log('Error while getting data for allusers.');
  });
});

//getadmin
app.get("/admins",function(req,res){
    //console.log(req);
//connection.query('SELECT * from allusers', function(err, rows, fields) {
connection.query('SELECT * from allusers where roleid = 2', function(err, rows, fields) {
//connection.end();
  if (!err){
    console.log('The solution is: ');
    console.log(rows);
    res.json(rows);
   // res.send(rows);
  }
  else
    console.log('Error while getting data for admin');
  });
});

//getusersofdistinctadmin
//getadmin
app.post("/admin_users/:id",function(req,res){
	var reqObj = req.body;
	var id = req.params.id;	
	connection.query('SELECT * from allusers where roleid = 3 AND created_by = ' + id, function(err, rows, fields) {
	//connection.end();
	if (!err){
		console.log('The solution is: ');
		console.log(rows);
		res.json(rows);
	// res.send(rows);
	}
	else
		console.log('Error while getting data for admin');
	});
});


/*get users by id*/ 
app.post("/getUsersById",function(req,res){
var reqObj = req.body;
    console.log(req.body);
connection.query('SELECT * from allusers where id = ' + reqObj.rowId, function(err, rows, fields) {
//connection.end();
  if (!err){
    console.log('The solution is: ');
    console.log(rows);
    res.json(rows);
   // res.send(rows);
  }
  else
    console.log('Error while performing Query.');
  });
});

/* Register user. */
app.post('/RegisterUser', function(req,res,next){
try{
   	var reqObj = req.body;	
	console.log(reqObj);
			var insertSql = "INSERT INTO allusers SET ?";
			var insertValues = {
 			"firstname" : reqObj.firstname,
			"lastname" : reqObj.lastname,
			"username" : reqObj.username,
			"email" : reqObj.email,
			"password" : reqObj.password,
			"roleid" : reqObj.role,
			"created_date" : reqObj.created_date,
			"created_by" : reqObj.created_by,
        };
			var query = connection.query(insertSql, insertValues, function (err, result){
				if(err){
				console.error('SQL error: ', err);
				return next(err);
				}
		
				 res.json({"status":true});
			});

	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

//update data
app.post('/RegisterUser/:id', function(req,res,next){
try{
   	var reqObj = req.body;
	var id = req.params.id;	
	console.log(reqObj);

			var insertSql = "UPDATE allusers SET ? WHERE id = " + id;
			var insertValues = {
 			"firstname" : reqObj.firstname,
			"lastname" : reqObj.lastname,
			"username" : reqObj.username,
			"email" : reqObj.email,
			"password" : reqObj.password,
			"roleid" : reqObj.roleid,
			"created_date" : reqObj.created_date,
			"created_by" : reqObj.created_by,
        };
			var query = connection.query(insertSql, insertValues, function (err, result){
				if(err){
				console.error('SQL error: ', err);
				return next(err);
				}
				//console.log(result);
				// var Employee_Id = result.insertId;
				 res.json({"status":true});
			});
		// }
		// });
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

app.post('/loginUsers', function(req,res,next){
try{
	var reqObj = req.body;
	console.log(req.body);	
	connection.query('SELECT * from allusers where username = ' + '\"'+ reqObj.username  + '\"' + 'AND password = ' + '\"'+ reqObj.password + '\"' , function(err, rows, fields) {
	  if (!err){
  		  console.log('The solution is: ');
  	 	  console.log(rows);
			if(!rows.length>0)
				{
				res.send({status:false})
				}
			else
  				  res.json(rows);			
 				 }
 		 else{
	 	 console.log(err);
  		 res.json({status:false});
    	 console.log('Error while performing Query.');
 		 }
  		});
	}catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
 });

app.post('/deleteUser/:id', function(req,res,next){
try{
   	var reqObj = req.body;
	var id = req.params.id;		
	console.log("inside delete")
	connection.query('DELETE from allusers WHERE id =  ? ', [id], function(err, rows, fields) {
	  if (!err){
  				  res.send({status:true})		
 				 }
 		 else{
	 	
  		 res.json({status:false});
    	 console.log('cannot delete row.');
 		 }
  		});
	}catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
 });

app.post("/userCount/:id",function(req,res){
	var reqObj = req.body;
	var id = req.params.id;	
	connection.query('SELECT COUNT(created_by) FROM allusers where created_by =' + id, function(err, rows, fields) {
	//connection.end();
	if (!err){
		console.log('oount ');
		console.log(rows);
		res.json(rows);
	// res.send(rows);
	}
	else
		console.log('Error while getting data for admin');
	});
});


app.listen(3081);