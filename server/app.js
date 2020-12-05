const express = require('express');
const giverRouter = require('./routes/giverRouter.js');
const receiverRouter = require('./routes/receiverRouter.js');
require('./db/mongoose.js');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());
app.use(giverRouter);
app.use(receiverRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});