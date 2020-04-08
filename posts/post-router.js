const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select().from("posts")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({err})
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params
    db.select().from("posts").where({id}).first()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({err})
        })

});

router.post('/', (req, res) => {

    const postData = req.body;

    db("posts")
        .insert(postData)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({err})
        })

});

router.put('/:id', (req, res) => {

    const {id}  = req.params;

    const changes =  req.body;

    db("posts")
        .where({id})
        .update(changes)
        .then(count => {
            res.status(201).json({count})
        })
        .catch(err => res.status(500).json({err}));

});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db("posts")
        .where({id})
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json({count})
            } else {
                res.status(404).json({message: "No post found"})
            }
        })
        .catch(err => res.status(500).json({err}))
});

module.exports = router;