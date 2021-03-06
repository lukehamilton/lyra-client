import {setSecret} from './auth';

import uuid from 'uuid';

const getLock = options => {
  const config = require('../../config.json');
  const Auth0Lock = require('auth0-lock').default;
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options);
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = container => {
  const config = require('../../config.json');
  const secret = uuid.v4();
  setSecret(secret);
  return {
    oidcConformant: true,
    autoclose: true,
    auth: {
      sso: false,
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      audience: `${config.AUTH0_API_AUDIENCE}`,
      params: {
        scope: `openid profile email user_metadata app_metadata picture`
        // scope: 'openid profile email'
        // state: secret
      }
    }
  };
};

export const show = container => getLock(getOptions(container)).show();
export const logout = () => getLock().logout({returnTo: getBaseUrl()});
