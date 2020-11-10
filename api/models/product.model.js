const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);