import { useState, useEffect } from 'react';
import twitch from '../util/twitch';

export default function useTwitchVisibilityChange() {
  const [isVisibile, setIsVisible] = useState(true);

  useEffect(() => {
    if (twitch) {
      twitch.onVisibilityChanged((visible, _c) => {
        setIsVisible(visible);
      });
    }
    return () => {};
  });

  return isVisibile;
}
