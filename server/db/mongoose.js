const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cba:cba@cluster0.ecpxh.mongodb.net/hack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});