import express from 'express';

import { getAllPersons, newForm, createPerson, getPerson, editForm, updatePerson, deletePerson} from '../controllers/persons.js';

const router = express.Router();

router.get('/', getAllPersons); //Displays all persons

router.get('/new', newForm); // Shows form for new person

router.post('/', createPerson); //Creates a new person

router.get('/:id', getPerson); //Shows one specified person

router.get('/:id/edit', editForm); //Shows edit form for one person

router.put('/:id', updatePerson); //Updates a particular person

router.delete('/:id', deletePerson); //Deletes a particular person

export default router;