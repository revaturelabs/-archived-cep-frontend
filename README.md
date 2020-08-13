# cep-frontend

react/redux frontend for the client engagement portal

# ALL DOCUMENTATION FOR ITERATION 1

https://drive.google.com/drive/folders/10wCBNKw3K1fegAQU771U0MYrsIdPa_fC?usp=sharing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

-------------------------------------------------------------------------------------------------------
ITERATION TWO README ADDITIONS: DEV-TREV - WRITTEN BY STEPHEN GRUVER AND ANTHONY GARCIA
-------------------------------------------------------------------------------------------------------

Our group (iteration dev-trev) google drive containing our resources/documents:
https://drive.google.com/drive/folders/1-d7pHLgduyssiRSsH3RK1GMEkvjIVtjk?usp=sharing 
How to Launch Application on a Local Machine
Have: STS3/4, Java8 JDK (x64 or whatever your STS xbit is), Git/Git Bash, VSCode, Node.js, Postman. Clone both repos and keep them in a folder somewhere
Checkout to the working branch as mentioned by product owner for both front and back end repos/projects
Front-End
Front end:
“npm install”, ignore the many vulnerabilities warning
Open the “.env.development” file and change the REACT_APP_ZUUL_ROUTE to: “REACT_APP_ZUUL_ROUTE=http://localhost:9015”
“npm start”
Back-End
Download Lombok: https://search.maven.org/remotecontent?filepath=org/projectlombok/lombok/1.18.4/lombok-1.18.4.jar
Run Lombok:
Specify Location: The folder containing your STS.exe. Click Install/Update.
Open STS and choose the Workspace to be:
Your repo folder > cep-engagement-service > Servers
With STS Open, click File > Open Projects from File System
Set Import Source Directory > {your file path}\cep-engagement-service\Servers
Deselect “Servers” (Imports as Eclipse Project)
Select only: “Servers\Zuul”, “Servers/Eureka”, “Servers/cep-engagement-service”, and “Servers/registerService”
Wait for the projects to build
You will get a ton of ERRORS because of Lombok. Don’t worry, we will fix this in the next step
Right click cep-engagement-service and do Maven>Update Project. Select all the services and proceed to update. This will make the errors go away.
CONFIGURING CORS FOR LOCALHOST:
In cep-engagement service AND registerService, go to src/main/resources/application.properties and change “frontend.uri” to “frontend.uri = http://localhost:3000”
In the Zuul service, go to src/main/java/com.example/ZuulApplication.java and add “http://localhost:3000” to the list of allowed origins in the @CrossOrigin annotation above the class
Also add a new line alongside the other allowedOrigins.add() method calls:
allowedOrigins.add("http://localhost:3000");
In the registerService, go to src/main/java/com/register/controller/PendingUserController.java and replace every instance of an ec-2 ip address in the restTemplates with localhost. For example:
"http://localhost:9015/users/add"
In the Boot Dashboard, expand Local to see all 4 services. Start them all
Wait 30+ seconds for the servers to register a heartbeat with Eureka before they can be hit
At the moment there is no way to create an admin account through frontend so you must do that in postman. This route is a post and you use http://localhost:9015/users/add to do that. An example JSON Body which you must pass would be:  
{
"user_id": 1,
"first_name": "John",
"last_name": "Doe",
"email": "fakegmail@gmail.com",
"password": "password",
"company": "Revature",
"role": "ROLE_ADMIN",
 "phone": "5555555555",
 "resetPassword": false,
 "profileDeadline": null,
 "profileCount": null
 }
The only allowed inputs for “role” are “ROLE_ADMIN” and “ROLE_CLIENT”
If you wish to view test coverage there is a separate google doc (see the group’s google drive, linked above) for how to do that. Otherwise you are now good to go!
You can login in on the front-end using the email and password you provided in the Postman request.

-------------------------------------------------------------------------------------------------------
ITERATION TWO README ENDS: DEV-TREV - WRITTEN BY STEPHEN GRUVER AND ANTHONY GARCIA
-------------------------------------------------------------------------------------------------------
