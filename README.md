# Web Dev Image Hosting
An app to upload any image you want and get a shareable link to send to your
friends. Will work similarly to Imgur.

| Student A       | Student B       |
|-----------------|-----------------|
| Simon Rodriguez | Gerry Fernandez |
| srodrig9@nd.edu | gfernan2@nd.edu |


# Running the Dev Server

Simply run `npm start`. If you are missing dependencies, make sure you run
`npm i` as well.

# Feature 4 Notes
Because we haven't implemented user switching yet, we cycle by default between
two user, Simon and Gerry. Note that you can change users by clicking on the 
user profile at the top right of the page. You'll see that Gerry has pictures of
sea turtles and no folders, while Simon has a folder called "Beavers" with the
corresponding pictures. To navigate between our two pages, click on the chevron
button at the top and bottom of this page. 

Note that in the Photo Library, you can click on "Your Library" to switch go 
back out of a folder into the original view.

You can click on an image to copy it to your clipboard.

# Diagrams

## UML Diagram
![uml](docs/UML_Diagram.png)

## Component Tree
![component-tree](docs/ComponentTreeDiagram.png)

# Environment Variables
To run the program, you need to make sure you set the correct environment
variables. The easiest way to do this is to create a `.env` file. We've
provided a `.template.env` to give you an idea on what needs to be set. Simply
replace the `<YOUR_VALUE_HERE>` sections with the correct API keys. For
submission, we've already included a preconfigured .env file.