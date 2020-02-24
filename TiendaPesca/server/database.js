const mongoose = require ('mongoose');
const URI = 'mongodb://localhost/TIENDAPESCA';

mongoose.connect(URI)
    .then(db => console.log('DATABASE is connect'))
    .catch(err => console.log(err));

module.exports = mongoose;