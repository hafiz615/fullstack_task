const axios = require('axios');

const getRandomPhoto = async () => {
    try {
        const randomPage = Math.floor(Math.random() * 346) + 1;
        const response = await axios.get(`${process.env.UNSPLASH_IMAGE_URL}`, {
            params: { page: randomPage, per_page: 10 },
            headers: {
                'Authorization': `Client-ID ${process.env.UNSPLASH_AUTHORIZATION_KEY}` 
            }
        });

        const photos = response.data;
        const randomIndex = Math.floor(Math.random() * photos.length);
        return photos[randomIndex]; 
    } catch (error) {
        console.error('Error fetching photos from Unsplash:', error);
        throw error; 
    }
};

module.exports = { getRandomPhoto };
