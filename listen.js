const express = require('express');
const app = express();
const { PORT = 9090 } = process.env;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
