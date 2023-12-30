const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = await req.models.User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {

    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        return res.status(400).json({ error: 'Validation Error', details: validationErrors });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    let { id, name, email, birthday, bio, is_admin, limit = 0, offset = 0 } = req.query;
    let users;
    limit = parseInt(limit);
    offset = parseInt(offset);
    
    const whereClause = {};
    if (id) whereClause.id = id;
    if (name) whereClause.name = name;
    if (email) whereClause.email = email;
    if (birthday) whereClause.birthday = { [Op.eq]: new Date(birthday) };
    if (bio) whereClause.bio = bio;
    if (is_admin !== undefined) whereClause.is_admin = is_admin;

    if (limit <= 0 && offset <= 0) {
        users = await req.models.User.findAll({
          where: whereClause,
        });
    } else {
        users = await req.models.User.findAll({
          where: whereClause,
          limit: limit,
          offset: offset,
        });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await req.models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await req.models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);

    return res.status(200).json(user);
  } catch (error) {

    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        return res.status(400).json({ error: 'Validation Error', details: validationErrors });
    }
    
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await req.models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
