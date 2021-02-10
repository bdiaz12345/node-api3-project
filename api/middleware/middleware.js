const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')

function logger(req, res, next) {
  // do your magic!
  console.log(req)
  next()
}

const validateUserId = async (req, res, next) => {
  // do your magic!
  const {id} = req.params
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(400).json({message: 'No user with that id'})
    } else {
      req.user = user
      next()
    }
  } catch (e) {
    res.status(500).json({message: `Server error: ${e}`})
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body.name) {
    res.status(400).json({message: 'name required'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body || !req.params.id) {
    res.status(400).json({message: 'body and id need to be correct'})
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
