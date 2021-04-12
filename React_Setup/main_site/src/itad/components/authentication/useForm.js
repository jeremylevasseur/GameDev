import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

// This file is used to validate the data that is entered into the register input fields.
// It makes sure the username, passwords, email, and group code are of the form that they should be.

const useForm = (callback, validate, loginVisible, handleSwitchToLogin) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    groupCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var errorStatus = { status: false };
    
    setErrors(validate(values, loginVisible, errorStatus));
    setIsSubmitting(true);

    if (!errorStatus.status) {
      if (loginVisible) {
        console.log("Submit Log In Post Request");
        const authenticateURL = "https://www.nautilusdevelopment.ca/api/itad/v1/authenticate";
        var enteredUsername = values.username;
        var enteredPassword = values.password;

        const res = fetch(authenticateURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: enteredUsername,
                password: enteredPassword,
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            try {
                if (data['error'] === "The username or password is incorrect.") {
                    toast.error('The username or password is incorrect.', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                } else {
                    // User has successfully logged in
                    var userSessionToken = data['session_token'];
                    localStorage.setItem('user_session_token', userSessionToken);
                    
                    toast.success('Logged In', {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                }
            } catch (error) {
                console.log(error);
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
  
      } else {
        console.log("Submit Sign Up Post Request");
        const createNewUserURL = "https://www.nautilusdevelopment.ca/api/itad/v1/create_new_user";
        var enteredUsername = values.username;
        var enteredEmail = values.email;
        var enteredPassword = values.password;
        var enteredGroupCode = values.groupCode;

        const res = fetch(createNewUserURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: enteredEmail,
                username: enteredUsername,
                password: enteredPassword,
                groupCode: enteredGroupCode
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            try {
                if (data['error'] === "The group code is invalid.") {
                    toast.error('Group code is invalid.', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                } else if (data['error'] === "The username is already taken.") {
                    toast.error('The username is already taken.', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                } else {
                  toast.success('Account created successfully. Please log in.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  handleSwitchToLogin()
                }

            } catch (error) {
                console.log(error);
            }
            
        })
        .catch((error) => {
            alert(error);
        });

      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
