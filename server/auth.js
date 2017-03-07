import basicAuth from 'basic-auth';
import { users } from './users';

export default function(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  const storedUser = users.find(u => u.name === user.name);
  if (storedUser && storedUser.pass === user.pass) {
    return next();
  } else {
    return unauthorized(res);
  };
}