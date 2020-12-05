const mongoose = require('mongoose');
const { mongoUserName, mongoPass } = require('../config.json');

mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPass}@cluster0.ecpxh.mongodb.net/fonhakaton?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});