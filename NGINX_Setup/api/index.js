const express = require('express');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const util = require('util');
const bodyParser = require('body-parser');

console.log("Starting");

var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'mysql1',
    user: 'root',
    password: 'secret',
    database: 'DrinkChallengeApp',
    timezone: 'utc'
});

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Base route
app.get("/api/", (req, res) => {
    console.log("Responding to root")
    res.send("Hello from route")
});

//-------------------------------- DATA ------------------------------------------

// Gets all drink data
app.get('/api/drinks', function (req, res) {
    var queryString = "SELECT * FROM `challenge_drink_data`;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets drink named based on drink id
app.get('/api/drink/:id', function (req, res) {
    var queryString = "SELECT drink_name FROM `challenge_drink_data` WHERE drink_index = ?;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.id], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets all user data
app.get('/api/users', function (req, res) {
    var queryString = "SELECT * FROM `challenge_user_data`;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets all user data in order of user winning
app.get('/api/users/sorted', function (req, res) {

    /*
    
        Getting two sets of data:
            - Data sorted by drinks had
            - Data sorted by finish time
    

    */

    var queryString = "SELECT * FROM `challenge_user_data`;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets number of drinks had by all users
app.get('/api/users/drinks_finished', function (req, res) {
    var queryString = "SELECT user_index, user_name, number_of_drinks_finished FROM `challenge_user_data`;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets user data based on user index
app.get('/api/user/:id', function (req, res) {
    var queryString = "SELECT * FROM `challenge_user_data` WHERE user_index = ?;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.id], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Changes the drinks finished by certain user
app.get('/api/user/:user_index/drinks_finished/:drinks_finished_val', function (req, res) {
    var queryString = "UPDATE `challenge_user_data` SET `number_of_drinks_finished` = ? WHERE `challenge_user_data`.`user_index` = ?;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.drinks_finished_val, req.params.user_index], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Updates the finish time for a specific user
app.get('/api/user/:user_index/finish_time/:finish_time', function (req, res) {

    var inputTimestamp = req.params.finish_time;

    var splitArr = inputTimestamp.split('_');

    var date = splitArr[0];
    var time = splitArr[1].replace('-', ':').replace('-', ':');

    var finishTime = date + " " + time;

    var queryString = "UPDATE `challenge_user_data` SET `finish_time` = ? WHERE `challenge_user_data`.`user_index` = ?;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [finishTime, req.params.user_index], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets users that don't have any drink order data
app.get('/api/users/no_drink_order', function (req, res) {
    var queryString = "SELECT user_index, user_name FROM `challenge_user_data` WHERE user_drink_order = 'none';";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.id], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Adds all users to the database
app.get('/api/users/add/:names', function (req, res) {
    var names = req.params.names;
    var namesArr = names.split("_");
    var queryString = "INSERT INTO `challenge_user_data` (`user_index`, `user_name`, `user_drink_order`, `number_of_drinks_finished`, `finish_time`) VALUES ";

    var counter = 0;
    for (var i = 0; i < (namesArr.length - 2); i++) {
        queryString = queryString + "(NULL, '" + namesArr[i] + "', 'none', '0', NULL), ";
        counter = counter + 1;
    }
    queryString = queryString + "(NULL, '" + namesArr[namesArr.length - 2] + "', 'none', '0', NULL);";

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.id], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Submits user's drink order
app.get('/api/user/:user_id/:drink_order', function (req, res) {
    var userId = req.params.user_id;
    var drinkOrder = req.params.drink_order;

    var queryString = "UPDATE `challenge_user_data` SET `user_drink_order` = '" + drinkOrder + "' WHERE `challenge_user_data`.`user_index` = " + userId + ";"
    
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, [req.params.id], function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Will erase all user data and start time data for the new challenge
app.get('/api/new_challenge', function (req, res) {
    var queryString1 = "TRUNCATE TABLE `challenge_user_data`;";
    var queryString2 = "UPDATE `challenge_unique_data` SET `value` = 'YYYY-mm-dd HH:MM:SS' WHERE descriptor = 'challenge_start_time';";   

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString1, function (err2, records, fields) {
                conn.release();
            });

        }
    });

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString2, function (err2, records, fields) {
                if (!err2) {
                    res.send("DONE");
                }
                conn.release();
            });

        }
    });
});

// Gets all unique data
app.get('/api/unique', function (req, res) {
    var queryString = "SELECT * FROM `challenge_unique_data`;";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            })
        }
    })
});

// Gets challenge start time
app.get('/api/start_time', function (req, res) {
    var queryString = "SELECT value FROM `challenge_unique_data` WHERE descriptor = 'challenge_start_time';";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});

// Gets challenge start time
app.get('/api/set_start_time/:start_time', function (req, res) {
    var urlStartTime = req.params.start_time; //Will be in the form of YYYY-mm-dd_HHoMMoSS

    var splitArr = urlStartTime.split("_");
    var date = splitArr[0];
    var time1 = splitArr[1];

    var time2 = time1.replace("o", ":");
    var time3 = time2.replace("o", ":");

    var timestamp = date + " " + time3;

    var queryString = "UPDATE `challenge_unique_data` SET `value` = '" + timestamp + "' WHERE descriptor = 'challenge_start_time';";
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send('Error occured');
            console.log(err);
        } else {
            conn.query(queryString, function (err2, records, fields) {
                if (!err2) {
                    res.send(records);
                }
                conn.release();
            });
        }
    });
});


// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;

app.listen(8085, () => {
    console.log("Server is up and listening on 8085..");
});