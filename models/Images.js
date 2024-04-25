const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: { type: Buffer, required: true }, // Binary image data (e.g., file buffer)
    contentType: { type: String, required: true }, // MIME type (e.g., 'image/jpeg')
    // Add any other relevant fields (e.g., user ID, timestamp, etc.) as needed
});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;