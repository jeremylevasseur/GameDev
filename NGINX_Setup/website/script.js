var api_url = "https://www.nautilusdevelopment.ca/dev_api/challenge/v1/users";
var drinks_api_url = "https://www.nautilusdevelopment.ca/dev_api/challenge/v1/drinks";
var start_time_data_url = "https://www.nautilusdevelopment.ca/dev_api/challenge/v1/start_time";

var new_api_url = "https://www.nautilusdevelopment.ca/dev_api/challenge/v1/get_user_drink_data";

var request = new Request(api_url);
TweenLite.defaultEase = Expo.easeOut;

var drinksData = [];
var userDrinksHadData = [];
var timeIntervals = [20, 20, 20, 20, 20, 20];

var userDict = {
    1: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    2: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    3: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    4: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    5: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    6: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    7: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    },
    8: {
        "Drink 1": "",
        "Drink 2": "",
        "Drink 3": "",
        "Drink 4": "",
        "Drink 5": "",
        "Drink 6": "",
    }
};

jQuery(document).ready(function ($) {

    // $.ajax({
    //     url: drinks_api_url,
    //     type: 'GET',
    //     success: function(res) {
    //         drinksData = res;
    //         console.log(drinksData);
    //     }
    // });

    $.ajax({
        url: new_api_url,
        type: 'GET',
        success: function(res) {
            drinksData = res;
            console.log("new");
            console.log(drinksData);

            for (var i = 0; i < drinksData.length; i++) {
                var tempUserId = drinksData[i]['user_id'];
                var tempDrinkId = drinksData[i]['drink_id'];

                if (tempDrinkId == '1') {
                    userDict[tempUserId]["Drink 1"] = drinksData[i]['drink_name']
                } else if (tempDrinkId == '2') {
                    userDict[tempUserId]["Drink 2"] = drinksData[i]['drink_name']
                } else if (tempDrinkId == '3') {
                    userDict[tempUserId]["Drink 3"] = drinksData[i]['drink_name']
                } else if (tempDrinkId == '4') {
                    userDict[tempUserId]["Drink 4"] = drinksData[i]['drink_name']
                } else if (tempDrinkId == '5') {
                    userDict[tempUserId]["Drink 5"] = drinksData[i]['drink_name']
                } else if (tempDrinkId == '6') {
                    userDict[tempUserId]["Drink 6"] = drinksData[i]['drink_name']
                }

            }
        }
    });


    initializeTimer();

    startLiveUpdate();

});

function startLiveUpdate () {
    setInterval(function () {
        fetch(api_url).then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log("old");
            // console.log(data);
            updateTable(data);
        }).catch(function (error) {
            console.log(error);
        });
    }, 1000);

}

function updateTable(data) {

    var leaderboardList = "";
    var userData = [];
    var drinksFinished = [];

    var timestamps = [];
    var timestampTracker = [];

    var orderedUserData = [];

    $('#leaderboard_ordered_list').empty()

    // Piping data into arrays
    for (var i = 0; i < data.length; i++) {
        var tempUserData = {};
        tempUserData['userIndex'] = data[i]['user_index'];
        tempUserData['userName'] = data[i]['user_name'];
        tempUserData['userDrinkOrder'] = data[i]['user_drink_order'];
        tempUserData['numberOfDrinksFinished'] = data[i]['number_of_drinks_finished'];
        tempUserData['finishTime'] = data[i]['finish_time'];

        if (data[i]['finish_time'] != null) {
            var finishTime = data[i]['finish_time'].replace("T", " ").replace(".000Z", "");
            var timestamp = ((new Date(finishTime)).getTime() / 1000);
            timestamps.push(timestamp);

            var trackerObj = {};
            trackerObj['userIndex'] = data[i]['user_index'];
            trackerObj['userName'] = data[i]['user_name'];
            trackerObj['userDrinkOrder'] = data[i]['user_drink_order'];
            trackerObj['numberOfDrinksFinished'] = data[i]['number_of_drinks_finished'];
            trackerObj['finishTime'] = data[i]['finish_time'];
            timestampTracker.push(trackerObj);

        }

        drinksFinished.push(data[i]['number_of_drinks_finished']);
        userData.push(tempUserData);
    }

    // Sort timestamps
    timestamps.sort(function(a, b){return a-b});

    // Looking for match
    var placeCounter = 0;
    for (var i = 0; i < timestamps.length; i++) {
        var tempOrderedTimestamp = timestamps[i];

        for (var j = 0; j < userData.length; j++) {
            if (userData[j]['finishTime'] != null) {

                var tempFinishTime = userData[j]['finishTime'].replace("T", " ").replace(".000Z", "");
                var tempTimestamp = ((new Date(tempFinishTime)).getTime() / 1000);

                if (tempOrderedTimestamp === tempTimestamp) {
                    // Match found
                    var tempUserCurrentDrink = getDrinkNameBasedOnInterval(1, drinksData, userData[j]['userDrinkOrder'], parseInt(userData[j]['numberOfDrinksFinished'], 10));
                    var tempUserNextDrink = getDrinkNameBasedOnInterval(1, drinksData, userData[j]['userDrinkOrder'], parseInt(userData[j]['numberOfDrinksFinished'], 10) + 1);

                    var listBackgroundColorString = "";
                    if (placeCounter == 0) {
                        // First place
                        listBackgroundColorString = listBackgroundColorString + "background-color: #7a6805;";
                    } else if (placeCounter == 1) {
                        // Second place
                        listBackgroundColorString = listBackgroundColorString + "background-color: #4f4e4e;";
                    } else if (placeCounter == 2) {
                        // Third place
                        listBackgroundColorString = listBackgroundColorString + "background-color: #7a4612;";
                    }

                    if (leaderboardList.length === 0) {
                        leaderboardList = leaderboardList + "<li style=\"border-top: 2px solid gray;" + listBackgroundColorString + "\"><mark>" + userData[j]['userName'] + "</mark><div class=\"current_drink_value\">" + tempUserCurrentDrink + "</div> <div class=\"next_drink_value\">" + tempUserNextDrink + "</div><small>" + userData[j]['numberOfDrinksFinished'] + "</small> </li>"
                    } else {
                        leaderboardList = leaderboardList + "<li style=\"" + listBackgroundColorString + "\"><mark>" + userData[j]['userName'] + "</mark><div class=\"current_drink_value\">" + tempUserCurrentDrink + "</div> <div class=\"next_drink_value\">" + tempUserNextDrink + "</div><small>" + userData[j]['numberOfDrinksFinished'] + "</small> </li>"
                    }

                    placeCounter = placeCounter + 1;

                    userData.splice(j, 1);
                }
            }
        }
    }
    
    // Sort drinks
    drinksFinished.sort(function(a, b){return b-a});
    
    for (var i = 0; i < drinksFinished.length; i++) {
        var tempDrinksFinishedVal = drinksFinished[i];
        for (var j = 0; j < userData.length; j++) {
            var tempUserDataDrinksFinishedVal = userData[j]['numberOfDrinksFinished']
            // Looking for match
            if (tempDrinksFinishedVal === tempUserDataDrinksFinishedVal) {
                var tempOrderedUserData = {};
                tempOrderedUserData['userIndex'] = userData[j]['userIndex'];
                tempOrderedUserData['userName'] = userData[j]['userName'];
                tempOrderedUserData['userDrinkOrder'] = userData[j]['userDrinkOrder'];
                tempOrderedUserData['numberOfDrinksFinished'] = userData[j]['numberOfDrinksFinished'];
                tempOrderedUserData['finishTime'] = userData[j]['finishTime'];
                orderedUserData.push(tempOrderedUserData);
                userData.splice(j, 1);
                break;
            }
        }
    }

    for (var i = 0; i < orderedUserData.length; i++) {

        var tempUserIndex = orderedUserData[i]['userIndex'];

        var tempUserCurrentDrink = getDrinkNameBasedOnInterval(tempUserIndex, drinksData, orderedUserData[i]['userDrinkOrder'], parseInt(orderedUserData[i]['numberOfDrinksFinished'], 10));
        var tempUserNextDrink = getDrinkNameBasedOnInterval(tempUserIndex, drinksData, orderedUserData[i]['userDrinkOrder'], parseInt(orderedUserData[i]['numberOfDrinksFinished'], 10) + 1);
        if (leaderboardList.length === 0) {
            leaderboardList = leaderboardList + "<li style=\"border-top: 2px solid gray;\"><mark>" + orderedUserData[i]['userName'] + "</mark><div class=\"current_drink_value\">" + tempUserCurrentDrink + "</div> <div class=\"next_drink_value\">" + tempUserNextDrink + "</div><small>" + orderedUserData[i]['numberOfDrinksFinished'] + "</small> </li>"
        } else {
            leaderboardList = leaderboardList + "<li><mark>" + orderedUserData[i]['userName'] + "</mark><div class=\"current_drink_value\">" + tempUserCurrentDrink + "</div> <div class=\"next_drink_value\">" + tempUserNextDrink + "</div><small>" + orderedUserData[i]['numberOfDrinksFinished'] + "</small> </li>"
        }
        
    }

    $('#leaderboard_ordered_list').append(leaderboardList);

}

function getDrinkNameBasedOnInterval(userId, drinkData, userDrinkOrder, drinksHad) {

    var drinkName = "";
    var drinkNumber = "";

    if (drinksHad == 1) {
        drinkNumber = "Drink 1";
    } else if (drinksHad == 2) {
        drinkNumber = "Drink 2";
    } else if (drinksHad == 3) {
        drinkNumber = "Drink 3";
    } else if (drinksHad == 4) {
        drinkNumber = "Drink 4";
    } else if (drinksHad == 5) {
        drinkNumber = "Drink 5";
    } else if (drinksHad == 6) {
        drinkNumber = "Drink 6";
    }

    if (drinksHad >= 6) {
        drinkName = "Water";
    } else {
        // var splitArray = userDrinkOrder.split("_");
        // drinkName = drinkData[splitArray[drinksHad] - 1]['drink_name'];
        drinkName = userDict[userId][drinkNumber];
    }

    return drinkName;

}

function initializeTimer() {
    var ret = $.ajax({
        url: start_time_data_url,
        type: 'GET',
        success: function(res) {
            configureTime(res[0]['value']);
        }
    });
}


function configureTime(startTime) {
    // Start Date
    console.log(startTime);
    var startDate = new Date(startTime).getTime() / 1000;

    // Get current time in seconds
    var currentSeconds = new Date().getTime() / 1000;

    var differenceInSeconds = currentSeconds - startDate; // Difference in seconds between start time and now.
    var finalSeconds = -1; // Will contain the number of seconds that need to be up on the clock.
    var currentInterval = 0;

    for (var i = 0; i < timeIntervals.length; i++) {
        
        var tempInterval = timeIntervals[i] * 60; // Putting in seconds instead of minutes.

        if (differenceInSeconds < tempInterval) {
            finalSeconds = tempInterval - differenceInSeconds;
            currentInterval = i + 1;
            break;
        } else {
            differenceInSeconds = differenceInSeconds - tempInterval;
        }
    }

    if (finalSeconds === -1) {
        // Game has finished.
        alert("Game Has Completed.");
    } else {
        // Update clock.
        var minutes = Math.floor(finalSeconds / 60);
        var seconds = Math.round(finalSeconds % 60);
        var timeString = minutes + ":" + seconds;
        console.log(timeString);

        if (timeString === "0:0") {
            initializeTimer();
        } else {
            initTimer(timeString);
        }

    }

}


// initTimer("00:11"); // other ways --> "0:15" "03:5" "5:2"

var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');

function initTimer (t) {
   
   var self = this,
       timerEl = document.querySelector('.timer'),
       minutesGroupEl = timerEl.querySelector('.minutes-group'),
       secondsGroupEl = timerEl.querySelector('.seconds-group'),

       minutesGroup = {
          firstNum: minutesGroupEl.querySelector('.first'),
          secondNum: minutesGroupEl.querySelector('.second')
       },

       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };

   var time = {
      min: t.split(':')[0],
      sec: t.split(':')[1]
   };

   var timeNumbers;

   function updateTimer() {

      var timestr;
      var date = new Date();

      date.setHours(0);
      date.setMinutes(time.min);
      date.setSeconds(time.sec);

      var newDate = new Date(date.valueOf() - 1000);
      var temp = newDate.toTimeString().split(" ");
      var tempsplit = temp[0].split(':');

      time.min = tempsplit[1];
      time.sec = tempsplit[2];

      timestr = time.min + time.sec;
      timeNumbers = timestr.split('');
      updateTimerDisplay(timeNumbers);

      if (timestr === '0200') {
        var audio = new Audio('assets/sound/deez_nuts.mp3');
        audio.play();
      }

      if (timestr === '0006') {
        var audio = new Audio('assets/sound/alarm1.wav');
        audio.play();
      }

      if(timestr === '0000')
         countdownFinished();

      if(timestr != '0000')
         setTimeout(updateTimer, 1000);

   }

   function updateTimerDisplay(arr) {

      animateNum(minutesGroup.firstNum, arr[0]);
      animateNum(minutesGroup.secondNum, arr[1]);
      animateNum(secondsGroup.firstNum, arr[2]);
      animateNum(secondsGroup.secondNum, arr[3]);

   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }
   
   setTimeout(updateTimer, 1000);

}

function countdownFinished() {
    initializeTimer();
}

reloadBtn.addEventListener('click', function () {
   TweenMax.to(this, 0.5, { opacity: 0, onComplete:
      function () { 
         reloadBtn.style.display= "none";
      } 
   });
   TweenMax.to(timerEl, 1, { opacity: 1 });
   initTimer("12:35");
});