export const appFile =
  `const express = require('express');
const compression = require('compression');
const router = require('./router');
require('dotenv').config();

const app = express();

const { PORT } = process.env;
app.set('port', PORT || 3000);

app.disable('x-powered-by');
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  compression(),
]);

app.use('/', router);

module.exports = app;
`;

export const indexFile =
`const app = require('./app');

const port = app.get('port');

app.listen(port, () => {
  console.log(\`🚀 Server is running on http://localhost:\${port}\`);
});
`;

export const homeControllerFile =
`
const homeController = (req, res) => {
  res.json({
    error: false,
    data: {
      message: 'Happy Hacking! 🚀',
    }
  });
};

module.exports = homeController;
`;

export const controllerIndexFile =
`const homeController = require("./homeController");

module.exports = {
  homeController,
};`;

export const routerIndexFile =
`const { homeController } = require('../controller');

const router = require('express').Router();

router.get('/', homeController);

module.exports = router;
`;