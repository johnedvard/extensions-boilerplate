import { useState, useEffect } from 'react';
import twitch from '../util/twitch';

export default function useTwitchContextUpdate() {
  const [context, setContext] = useState({});

  useEffect(() => {
    if (twitch) {
      twitch.onContext((newContext, delta) => {
        setContext(newContext);
      });
    }
    return () => {};
  }, []);

  return context;
}
