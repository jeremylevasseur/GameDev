var express = require('express'), router = express.Router();
const baseURL = "https://www.nautilusdevelopment.ca/api/";

const mysql = require('mysql');
const util = require('util');
const CryptoJS = require("crypto-js");
var crypto = require('crypto');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/api/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'text/plain') {
        cb(null, true);
    } else {
        cb(new Error('File type is not allowed.'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'mysql1',
    user: 'root',
    password: 'secret',
    database: 'base_db',
    timezone: 'utc'
});


/*
=========================== ENDPOINTS =============================

1)      GET    /api/general/v1

*/


// Base itad route

router.get("/v1/", (req, res) => {
    console.log("Responding to root");
    res.send("Hello from itad route");
});


// Example GET request
router.get("/v1/get_my_profile_data", (req, res) => {
    /*
        This endpoint is for requesting the data of the current user

        The JSON Web Token must be a query parameter in the url
            Example: /itad/api/v1/update_user_information?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfdXNlcm5hbWUifQ.xi2EmVoAIHkbvRLFHACpZYdFC1amcpMaezxCvG5BYGg

        
        The return object will contain the users data in JSON form:
        [
            {
                "user_index": 3,
                "group_code": "adskgjasd"
                "user_first_name": "Echo",
                "user_last_name": "Foxtrot",
                "user_email": "echo.foxtrot@gmail.com",
                "user_phone_number": "1234567890",
                "user_fax_number": "1234567890"
                "profile_picture_file_path": "http://192.168.1.16:8081/1597792652538_echofoxtrot.png",
                "account_creation_date": "2020-08-18T19:17:32.000Z"
            }
        ]

    */

    // Parameters
    var jwt = req.query.jwt;

    if (typeof jwt !== 'undefined') {
    
        var queryString = "SELECT user_index, group_code, type_of_account FROM `itad_user_data` WHERE user_token = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [jwt], function (err2, records1, fields1) {
                    
                    if (!err2) {

                        if (records1.length == 1) {
                            
                            var userIndex = records1[0]['user_index'];
                            var userGroupCode = records1[0]['group_code'];
                            var userAccountType = records1[0]['type_of_account'];

                            queryString = "SELECT user_index, group_code, type_of_account, username, user_first_name, user_last_name, user_email, user_phone_number, user_fax_number, profile_picture_file_path, account_creation_date FROM `itad_user_data` WHERE user_index = ? AND group_code = ?;";
                            
                            pool.getConnection(function(err3, conn2) {
                                if (err3) {
                                    res.send(err3);
                                    console.log(err3);
                                } else {
                                    conn2.query(queryString, [userIndex, userGroupCode], function (err4, records2, fields2) {
                                        if (!err4) {
                                            res.send(records2);
                                        }
                    
                                        conn2.release();
                                    });
                                }
                            });

                        } else {
                            
                            var error = {
                                "error": "Authentication failed. Please try a different JSON Web Token."
                            };
                    
                            res.send(error);

                        }
                    }

                    conn1.release();

                });
            }

            
        });

    } else {
        res.send("The JSON web token is not valid.");
    }
    

});

// Example POST request
router.post('/v1/create_new_user', function (req, res) {
    /*

        There are two types of accounts that are distinguishable by their `type_of_account` field:
        1 = regular user account

            Only able to see data relating to themselves. Able to write data to their account.
            All accounts will be initially created with these level of permissions.

        2 = admin user account

            Able to see data for all accounts. Able to write data to any account.
            
        
        The following fields will be generated by default within this block of code:
            
            type_of_account             ==>     1
            user_number_of_absences     ==>     0
            user_token                  ==>     A signed JSON Web Token (JWT)
        
        
        The post request body must be of the form:
        {
            "email": "example@email.com",
            "username": "Example Username",
            "password": "Example Password",
            "groupCode": "aposdjhgfaaasdf"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "jwt": signedToken
        }

    */

    var userEmail = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var groupCode = req.body.groupCode;

    if ((typeof userEmail !== 'undefined') && (typeof username !== 'undefined') && (typeof password !== 'undefined') && (typeof groupCode !== 'undefined') ) {

        // Generating the JWT
        var signedToken = generateJWT(username, password);

        var queryString = "SELECT * FROM `group_data` WHERE group_code = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [groupCode], function (err2, records1, fields1) {
                    if (!err2) {
                        if (records1.length == 1) {
                            queryString = "INSERT INTO `itad_user_data` (`user_index`, `group_code`, `type_of_account`, `username`, `password`, `user_first_name`, `user_last_name`, `user_email`, `user_phone_number`, `user_fax_number`, `profile_picture_file_path`, `user_token`, `account_creation_date`) VALUES (NULL, ?, '1', ?, ?, NULL, NULL, ?, NULL, NULL, 'https://www.nautilusdevelopment.ca/api/placeholder.png', ?, CURRENT_TIMESTAMP);";

                            pool.getConnection(function(err3, conn2) {
                                if (err3) {
                                    res.send(err3);
                                    console.log(err3);
                                } else {
                                    conn2.query(queryString, [groupCode, username, password, userEmail, signedToken], function (err4, records2, fields2) {
                                        if (!err4) {
                                            
                                            var returnData = {
                                                "jwt": signedToken
                                            };
                    
                                            res.send(returnData);

                                        } else if (err4['sqlMessage'].includes("Duplicate entry")) {
                                            
                                            var returnData = {
                                                "error": "The username is already taken."
                                            };
                    
                                            res.send(returnData);
                                        } else {
                                            console.log(err4);
                                        }
                                        
                                        conn2.release();
                                    });
                                }
                            });

                        } else {

                            var returnData = {
                                "error": "The group code is invalid."
                            };
                            res.send(returnData);
                        }
                    }

                    conn1.release();
                });
            }
        });

    } else {
        var returnData = {
            "error": "There is an error within the post request."
        };
        res.send(returnData);
    }

});


// ============================ HELPER FUNCTIONS =============================

/*
Purpose:
    Generates a signed 64 bit JSON Web Token

Inputs:
    username        =>      The username of the account
    password        =>      The password of the account

Outputs:
    signedToken     =>      The signed 64 bit JSON Web Token
*/
function generateJWT(username, password) {

    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };
      
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var data = {
        "username": username
    }

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);
      
    var token = encodedHeader + "." + encodedData;

    var signature = CryptoJS.HmacSHA256(token, password);
    signature = base64url(signature);

    var signedToken = token + "." + signature;

    return signedToken;

}

/*
Purpose:
    Ecodes a string into base 64

Inputs:
    source          =>      String to be encoded into base 64

Outputs:
    encodedSource   =>      The newly encoded base64 string
*/
function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}


function generateSessionToken() {
    return crypto.randomBytes(16).toString('base64');
}

pool.query = util.promisify(pool.query);

module.exports = pool;

module.exports = router;