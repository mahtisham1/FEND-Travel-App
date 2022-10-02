# FEND-Travel-App

# Webpack Express Travel App

This web app is used to provide the information to user who is planning a trip to somewhere. This travel app takes two input from user:
- Destination City
- Departing Date

This Travel app gives weather data, city picture and Number of Days left for the trip to a user

## Get Up and Running
1. Install all the necessary plugings and commands
2. There are two modes set 'development' and 'production
3. There are three js files in the js folder
 - formHandler(to fetch the data + updating UI)
 - tripDuration (to calculate the number of days left)
 - removeTrip (to remove the data)
4. Enter the command npm start to start the local server
5. Enter the command npm run build when whole project sets up, after succussfull build a dist folder will be created in the directory
6. Two tests files(testForHandler and testForTripDuration) are added in the __test__ folder to be tested
7. Ensure that you have installed jest dependencies and added script "test":"jest"
7. run command npm run test and check if this test passes the files or not

