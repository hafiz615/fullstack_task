const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
app.use('/jobs', jobRoutes); 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
