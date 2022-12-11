const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.listen(8080, function () {
  console.log('listening on 8080');
});

app.get('/api/comics/romance', (req, res) => {
  if (req.query.page < 6 && req.query.page > 0) {
    const dataBuffer = fs.readFileSync(__dirname + `/page_${req.query.page}.json`);
    const resJson = dataBuffer.toString();
    res.status(200).send(resJson);
  } else {
    res.status(404).json({ code: 404, status: 'fail', success: false });
  }
});
