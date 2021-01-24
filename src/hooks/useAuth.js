import { useState, useEffect } from 'react';
import Authentication from '../util/Authentication/Authentication';
import twitch from '../util/twitch';

export default function useAuth() {
  const [auth, setAuth] = useState(new Authentication());

  useEffect(() => {
    if (twitch) {
      twitch.onAuthorized((a) => {
        const newAuth = new Authentication();
        newAuth.setToken(a.token, a.userId);
        setAuth(newAuth);
      });
    }
    return () => {
      setAuth(new Authentication());
    };
  });

  return auth;
}
