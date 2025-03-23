import {registerUser, loginUser, refreshUsersSession, logoutUser} from '../services/auth.js';
import {THIRTY_DAYS} from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: user
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS)
  });
  res.cookie('sessionId', session._id, {httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS)});

res.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {accessToken: session.accessToken}
});
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
      });
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await refreshUsersSession({sessionId: req.cookies.sessionId, refreshToken: req.cookies.refreshToken});

setupSession(res, session);

res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {accessToken: session.accessToken}
});
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
