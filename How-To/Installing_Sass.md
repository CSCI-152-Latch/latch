# Installing Sass
### Brought to you by James Hernandez

## Lets Start by Setting Up Your Evironment First
* First Create a separate folder on your **DESKTOP** called *152 Latch Design* <br>
this is where we will be placing our templates.

* Awesome now within the folder *152 Latch Design* create 3 folders called: <br>
**html**, **css**, **sass**, **img**.

## Installing SASS
 Now that we have our folder evironment set up lets now open visual studio code. <br>

* Inside the HTML folder create an html document
* Inside the CSS folder create an CSS document called style.css
* Inside the SASS folder creat an SASS document called main.scss
* Inside the IMG folder is where we put our images and other media sources *If Any*

#### Now Open up your Terminal in VS Code.
Make sure you are in the folder that you created on your DESKTOP *152 Latch Design* <br>
if you are it should say so in your terminal

* On terminal type in command **npm init** follow the steps that prompt up --for most steps just hit ENTER until finished.

* Now you should have the package.json file in your computer

* On terminal type in command **npm install node-sass --save-dev** hit ENTER

#### Awesome now you have sass on your compter

## Compiling Your Sass
* Open your package.json file and find the part where it says "scripts"
* delete the test command part inside the "scripts" { }
* Replace it with "compile:sass": "node-sass sass/main.scss css/style.css -w"
* On terminal type in command npm run compile:sass

## You should now be able to compile sass
## To test this out copy the test files that I will have in a folder templates.
The templates will be nothing more than a skeleton for you to start out with. <br>
Make sure to copy and paste the template files into the **RIGHT** files.


#### If this does not work, message me on discord and hit the talk on server "the little phone icon" 

# Extra Help
* download the npm live-server it helps with real time editing,, but make sure to look up on the npm website to make sure that its the write command to enter.
* side note you can run npm live-server and npm run compile:sass at the same time but in two separte terminals, VS code allows you to have multiple terminals open for a single project.


