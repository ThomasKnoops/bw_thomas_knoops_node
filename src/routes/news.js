const express = require('express');
const router = express.Router();

// Create a new news post
router.post('/news', async (req, res) => {
  try {
    const newNews = await req.models.News.create(req.body);
    return res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all news posts
router.get('/news', async (req, res) => {
  try {
    const allNews = await req.models.News.findAll();
    return res.status(200).json(allNews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific news post by ID
router.get('/news/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const news = await req.models.News.findByPk(id);

    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a news post by ID
router.put('/news/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Request Body:', req.body); // Log the request body

  try {
    const news = await req.models.News.findByPk(id);

    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    await news.update(req.body);

    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a news post by ID
router.delete('/news/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const news = await req.models.News.findByPk(id);

    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    await news.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
