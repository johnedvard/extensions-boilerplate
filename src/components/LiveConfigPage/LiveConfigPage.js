import React, { useEffect } from 'react';
import useTwitchContextUpdate from '../../hooks/useTwitchContextUpdate';
import useAuth from '../../hooks/useAuth';
import twitch from '../../util/twitch';
import './LiveConfigPage.css';

const LiveConfigPage = () => {
  const auth = useAuth();

  const twitchContext = useTwitchContextUpdate();

  useEffect(() => {
    if (twitch) {
      twitch.listen('broadcast', (target, contentType, body) => {
        twitch.rig.log(
          `New PubSub message!\n${target}\n${contentType}\n${body}`
        );
        // now that you've got a listener, do something with the result...

        // do something...
      });
    }
    return () => {
      if (twitch) {
        twitch.unlisten('broadcast', () =>
          console.log('successfully unlistened')
        );
      }
    };
  }, []);

  if (auth.token) {
    return (
      <div className="LiveConfigPage">
        <div
          className={
            twitchContext.theme === 'light'
              ? 'LiveConfigPage-light'
              : 'LiveConfigPage-dark'
          }
        >
          <p>Hello world!</p>
          <p>This is the live config page! </p>
        </div>
      </div>
    );
  } else {
    return <div className="LiveConfigPage"> </div>;
  }
};
export default LiveConfigPage;
