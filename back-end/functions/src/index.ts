import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const cors = require('cors')
const app = express();
app.use(cors());

app.use('/api/v1', app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const todosCollection = 'todos';
export const webApi = functions.https.onRequest(app);

// Add new todo
app.post('/todos', (req, res) => {
    firebaseHelper.firestore
        .createNewDocument(db, todosCollection, req.body);
    res.send('Create a new todo');
})

// Update new todo
app.patch('/todos/:todoId', (req, res) => {
    firebaseHelper.firestore
        .updateDocument(db, todosCollection, req.params.id, req.body);
    res.send('Update a new todo');
})

// View a todo
app.get('/todos/:todoId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, todosCollection, req.params.id)
        .then(doc => res.status(200).send(doc));
})

// View all todos
app.get('/todos', (req, res) => {
    firebaseHelper.firestore
        .backup(db, todosCollection)
        .then(data => res.status(200).send(data))
})

// Delete a todo 
app.delete('/todos/:todoId', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, todosCollection, req.params.id);
    res.send('todo is deleted');
})
