## Todo list

- [ ] React native -> save current screen on every page change (using useEffect on every page) and store it into global redux then in app.js load that global redux state to save screen on app exit

- [ ] edit reset password page add custom logo and style input fields, make better loading spinner
- [x] add cron jobs to backend to remove reset tokens after one hour
- [ ] make custom email templats for otp email, email verified, forgot password link, and password reset email
- [ ] !!! add all userInfo stuff to global userInfo state in redux
- [x] add username picking form before phone number form
- [ ] add redux states for all forms so that input field can be universal component rather than copy paste
- [x] make register form
- [ ] handle all form inputs so that it cant be skipped or entered with null or empty values
- [ ] make database that stores user ids (uids) from firebase and gives additional information about user such as userName, gender, country, age, dateofbrith, pictureUrl, coins ect
- [x] make register link in login screen link to register form
- [x] make enter birth date scroll input after first registration form to continue to rest of process
- [x] send verification emails on sign up
- [x] Make forgot password redirect to forgot password page
- [x] Make forgot password functional
- [ ] Make custom forgot password link and register verification email look
- [x] send verficication email for forgot password
- [ ] Make google login and sign up possible
- [ ] Make facebook login and sign up possible
- [ ] Make twitter login and sign up possible
- [ ] clean code (styleSheets, components), also try redux and useref for modular components
