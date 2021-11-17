const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post('/create', function (req, res) {
  var strings = [];
  var result;
  if (req) {
    const newStrings = {
      str1: req.body.str1,
      str2: req.body.str2,
    };

    strings.push(newStrings);
    const string1 = strings[0].str1;
    const string2 = strings[0].str2;

    result = levDist(string1, string2);
    console.log(result);
    res.send({ result: result.distance, arr: result.matrix });
  } else {
    res.send('Invalid request data');
  }
});

app.listen(port, () => {
  console.log(`Listen to port ${port}`);
});

function levDist(str1, str2) {
  const grid = [];

  for (let i = 0; i < str1.length + 1; i++) {
    const row = [];
    for (let j = 0; j < str2.length + 1; j++) {
      row.push(j);
    }
    row[0] = i;
    grid.push(row);
  }
  for (let i = 1; i < str1.length + 1; i++) {
    for (let j = 1; j < str2.length + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        grid[i][j] = grid[i - 1][j - 1];
      } else {
        grid[i][j] =
          1 + Math.min(grid[i - 1][j - 1], grid[i - 1][j], grid[i][j - 1]);
      }
    }
  }
  const newResult = {
    distance: grid[str1.length][str2.length],
    matrix : grid
  }
  return newResult;
}
