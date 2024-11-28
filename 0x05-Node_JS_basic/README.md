# Node JS Basics with Express

## Using `return` with `res.send()` in Express

To prevent the `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`, use `return` before `res.send()` to stop further code execution.

### Correct Usage:

```javascript
router.get('/', (req, res) => {
  if (someCondition) {
    return res.send('Condition met');  // Prevents further code execution
    // OR
    // res.send('Condition met');
    // return;
  }

  res.send('Fallback response');  // Only executed if condition is false
});
```

### Incorrect Usage (Without return):
```javascript
router.get('/', (req, res) => {
  res.send('First response');
  res.send('Second response');  // Causes error: headers already sent
});
```

## Using express.Router()
`express.Router()` helps modularize your routes, keeping your app organized.

Example:
```javascript
// routes.js
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

router.get('/about', (req, res) => {
  res.send('About us');
});

module.exports = router;
```

In your main server file:
```javascript
// server.js
const express = require('express');
const app = express();
const router = require('./routes');

app.use('/', router);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```