import React, { useEffect } from 'react';
import useTwitchContextUpdate from '../../hooks/useTwitchContextUpdate';
import useTwitchVisibilityChange from '../../hooks/useTwitchVisibilityChange';
import useAuth from '../../hooks/useAuth';
import twitch from '../../util/twitch';

import './App.css';

const App = () => {
  const auth = useAuth();
  const twitchContext = useTwitchContextUpdate();
  const isVisible = useTwitchVisibilityChange();

  useEffect(() => {
    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null.
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

  if (auth.token && isVisible) {
    return (
      <div className="App">
        <div
          className={twitchContext.theme === 'light' ? 'App-light' : 'App-dark'}
        >
          <p>Hello world!</p>
          <p>My token is: {auth.token}</p>
          <p>My opaque ID is {auth.getOpaqueId()}.</p>
          <div>
            {auth.isMod ? (
              <p>
                I am currently a mod, and here's a special mod button
                <input value="mod button" type="button" />
              </p>
            ) : (
              'I am currently not a mod.'
            )}
          </div>
          <p>
            I have
            {auth.hasSharedId()
              ? `shared my ID, and my user_id is ${auth.getUserId()}`
              : 'not shared my ID'}
            .
          </p>
        </div>
      </div>
    );
  } else {
    return <div className="App"> asdasd </div>;
  }
};
export default App;
