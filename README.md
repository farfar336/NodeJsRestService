# NodeJsRestService

**About**

Technologies used: JavaScript, Node.js, VS code, Postman, Microsoft Azure

A Node.js server that uses RESTful Routes in 7 different ways:

NAME      |     PATH                 |   HTTP VERB     |            PURPOSE 
Index       | /persons               |      GET                | Displays all persons
New         | /persons/new      |      GET                | Shows new form for new person 
Create     | /persons               |      POST              | Creates a new person
Show       | /persons/:id         |      GET                | Shows one specified person
Edit          | /persons/:id/edit |      GET                | Shows edit form for one person
Update    | /persons/:id         |      PUT                | Updates a particular person
Destroy   | /persons/:id         |      DELETE         | Deletes a particular person

**Instructions on how to run**
1. Run npm start
2. Go to http://localhost:5000/persons
