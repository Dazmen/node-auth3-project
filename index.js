const express = require('express');
const server = express();

const authRouter = require('./api/authRouter.js');
const userRouter = require('./api/usersRouter.js');
const { restricted_mw, verify_department } = require('./utils/middleware.js');

server.use(express.json());


server.use('/api/auth', authRouter);
// server.use('/api/users', restricted_mw,  userRouter);
server.use('/api/users', restricted_mw, verify_department('default'), userRouter);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`)
});