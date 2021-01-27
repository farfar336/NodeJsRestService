import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

// Code related to directory pathing
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = require('path')
const fs = require('fs')
let reqPath = path.join(__dirname, '../');

let persons = [];

//Read json file
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

/**
 * @typedef {Object} Person
 * @property {number} id id of the person
 * @property {string} name name of person
 * @property {number} age age of person
 */

/**
 * 
 * @param {Person} person 
 * @returns {Person}
 */
function parsePerson(person) {
    const newPerson = { ...person };
    newPerson.id = parseInt(newPerson.id);
    newPerson.age = parseInt(newPerson.age);
    return newPerson;
}

jsonReader('./person.json', (err, content) => {
    if (err) {
        console.log(err)
        return
    }
    persons = content;
})

export const getAllPersons = (req, res) => {
    res.send(persons);
}

// Shows new form for new person
export const newForm = (req, res) => {
    res.sendFile(reqPath + "html/new.html");
}

export const createPerson = (req, res) => {
    const newPerson = parsePerson(req.body); //req.body contains name, age, id
    const foundPerson = persons.find((person) => person.id === newPerson.id); //Find the person with the corresponding ID

    if (foundPerson) {
        res.status(400).send(`Person with id ${newPerson.id} already exists.`);
    }
    else {
        if (newPerson.name === undefined) res.status(400).send(`No name provided`);
        else if (newPerson.age === undefined) res.status(400).send(`No age provided`);
        else if (newPerson.id === undefined) res.status(400).send(`No Id provided`);
        else {
            // persons.push(newPerson);
            res.status(201).send(`Person with the name ${newPerson.name} added to the database`);
        }
    }
}

export const getPerson = (req, res) => {
    const { id } = req.params; // req.params contains the ID. This is from the path: persons/[ID]
    const intID = parseInt(id)
    const foundPerson = persons.find((person) => person.id === intID); //Find the person with the corresponding ID

    if (foundPerson) res.send(foundPerson);
    else res.status(404).send(`Person with id ${intID} does not exist.`);
}

// To do: Shows edit form for one person
export const editForm = (req, res) => {
    const { id } = req.params; // req.params contains the ID. This is from the path: persons/[ID]
    const intID = parseInt(id)
    const foundPerson = persons.find((person) => person.id === intID); //Find the person with the corresponding ID

    if (foundPerson) res.sendFile(reqPath + "html/edit.html");
    else res.status(404).send(`Person with id ${id} does not exist.`);
}

export const updatePerson = (req, res) => {
    const { id } = req.params; // req.params contains the ID. This is from the path: persons/[ID]
    const intID = parseInt(id)
    const { name, age } = req.body; //Gets the name and age from req.body. This info will replace the old info in the database
    const foundPerson = persons.find((person) => person.id === intID); //Find the person with the corresponding ID

    if (foundPerson) {
        if (name) foundPerson.name = name; //If name has a value, then we want to change that variable in the database
        if (age) foundPerson.age = age; //If age has a value, then we want to change that variable in the database
        res.send(`Person with id ${id} has been updated`);
    }
    else res.status(404).send(`Person with id ${id} does not exist.`);
}

export const deletePerson = (req, res) => {
    const { id } = req.params; // req.params contains the ID. This is from the path: persons/[ID]
    const intID = parseInt(id)
    const foundPerson = persons.find((person) => person.id === intID); //Find the person with the corresponding ID

    if (foundPerson) {
        persons = persons.filter((person) => person.id !== intID); //Deletes person from database if the ID matches
        res.send(`Person with id ${id} deleted from the database.`);
    }
    else res.status(404).send(`Person with id ${id} does not exist.`);
}