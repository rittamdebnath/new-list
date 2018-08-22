const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

//models
const Todo = require('../models/todo')

router.post('/add', (req, res, next) => {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    description: req.body.description,
    completed: req.body.completed
  })
  todo.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.get('/list', (req, res, next) => {
  Todo.find()
    .select('_id description completed')
    .exec()
    .then((todo) => {
      res.status(200).json(todo)
    }).catch((err) => {
      res.status(500).json({
        error: err
      })
    });
})

router.get('/list/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findById({
      _id: todoId
    })
    .select('_id description completed')
    .exec()
    .then((todo) => {
      res.status(200).json({
        todo: todo
      })
    }).catch((err) => {
      res.status(404).json({
        message: 'todo not found'
      })
    });
})


router.patch('/list/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Todo.update({
      _id: todoId
    }, {
      $set: updateOps
    })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })

})

router.delete('/list/:todoId',(req,res,next)=>{
    const id = req.params.todoId;
    Todo.remove({
            _id: id,
        })
        .exec()
        .then(result => {
            // console.log(res);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router
