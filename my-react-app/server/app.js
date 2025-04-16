const chatController = require('./controllers/chat');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
app.use('/api', authRouter);

app.use((req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded;
  next();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
app.use('/chat', chatController.init(app));