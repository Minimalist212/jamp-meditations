const axios = require('axios');

module.exports = async function (req, res) {
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.json({ error: 'Missing videoId' });
  }

  try {
    const response = await axios.get(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: process.env.VIMEO_TOKEN
      }
    });

    const embedUrl = `https://player.vimeo.com/video/${videoId}`;

    res.json({
      embedUrl,
      title: response.data.name,
      duration: response.data.duration
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
