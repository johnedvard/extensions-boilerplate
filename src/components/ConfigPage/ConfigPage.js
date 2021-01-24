import React, { useEffect } from 'react';
import useTwitchContextUpdate from '../../hooks/useTwitchContextUpdate';
import useAuth from '../../hooks/useAuth';

import './Config.css';

const ConfigPage = () => {
  const auth = useAuth();
  const twitchContext = useTwitchContextUpdate();

  useEffect(() => {}, []);

  if (auth.token && auth.isModerator()) {
    return (
      <div className="Config">
        <div
          className={
            twitchContext.theme === 'light' ? 'Config-light' : 'Config-dark'
          }
        >
          There is no configuration needed for this extension!
        </div>
      </div>
    );
  } else {
    return (
      <div className="Config">
        <div
          className={
            twitchContext.theme === 'light' ? 'Config-light' : 'Config-dark'
          }
        >
          Loading...
        </div>
      </div>
    );
  }
};
export default ConfigPage;
