const express = require('express');
const router = express.Router();

// Create a new follow
router.post('/follows', async (req, res) => {
  try {
    const follow = await req.models.Follow.create(req.body);
    return res.status(201).json(follow);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all follows
router.get('/follows', async (req, res) => {
  try {
    const follows = await req.models.Follow.findAll();
    return res.status(200).json(follows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all followers of player ID
router.get('/followings/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const follows = await req.models.Follow.findAll({
        where: {
          follower_id: id
        }
      });
      return res.status(200).json(follows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get all followings by player ID
router.get('/followers/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const follows = await req.models.Follow.findAll({
        where: {
          following_id: id
        }
      });
      return res.status(200).json(follows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Delete a follow by ID
router.delete('/follows/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const follow = await req.models.Follow.findByPk(id);

    if (!follow) {
      return res.status(404).json({ error: 'Follow not found' });
    }

    await follow.destroy();

    return res.status(204).send(); // No content for successful deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
