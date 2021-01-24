const jwt = require('jsonwebtoken');

/**
 * Helper class for authentication against an EBS service. Allows the storage of a token to be accessed across componenents.
 * This is not meant to be a source of truth. Use only for presentational purposes.
 */
export default class Authentication {
  constructor(token, opaque_id) {
    this.token = token;
    this.opaque_id = opaque_id;
    this.user_id = false;
    this.isMod = false;
    this.role = '';
  }

  isLoggedIn() {
    return this.opaque_id[0] === 'U' ? true : false;
  }

  // This does guarantee the user is a moderator - this is fairly simple to bypass - so pass the JWT and verify
  // server-side that this is true. This, however, allows you to render client-side UI for users without holding on a backend to verify the JWT.
  // Additionally, this will only show if the user shared their ID, otherwise it will return false.
  isModerator() {
    return this.isMod;
  }

  // similar to mod status, this isn't always verifiable, so have your backend verify before proceeding.
  hasSharedId() {
    return !!this.user_id;
  }

  getUserId() {
    return this.user_id;
  }

  getOpaqueId() {
    return this.opaque_id;
  }

  // set the token in the Authentication componenent state
  // this is naive, and will work with whatever token is returned. under no circumstances should you use this logic to trust private data - you should always verify the token on the backend before displaying that data.
  setToken(token, opaque_id) {
    let isMod = false;
    let role = '';
    let user_id = '';

    try {
      let decoded = jwt.decode(token);

      if (decoded.role === 'broadcaster' || decoded.role === 'moderator') {
        isMod = true;
      }

      user_id = decoded.user_id;
      role = decoded.role;
    } catch (e) {
      token = '';
      opaque_id = '';
    }

    this.token = token;
    this.opaque_id = opaque_id;
    this.isMod = isMod;
    this.user_id = user_id;
    this.role = role;
  }

  // checks to ensure there is a valid token in the state
  isAuthenticated() {
    if (this.token && this.opaque_id) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Makes a call against a given endpoint using a specific method.
   *
   * Returns a Promise with the Request() object per fetch documentation.
   *
   */

  makeCall(url, method = 'GET') {
    return new Promise((resolve, reject) => {
      if (this.isAuthenticated()) {
        let headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        };

        fetch(url, {
          method,
          headers,
        })
          .then((response) => resolve(response))
          .catch((e) => reject(e));
      } else {
        reject('Unauthorized');
      }
    });
  }
}
