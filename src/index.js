import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*const oidcConfig = {
  onSignIn: () => {
    // Redirect?
  },
  authority: 'https://hydra-public.prod.m3.scopelypv.com',
  clientId: '94883fe1-6f58-418c-91f0-3c85ae50e094',
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'token',
  scope: 'm3p.f.pr.pro m3p.f.pr.ros m3p.f.pr.inv m3p.f.pr.act offline'
};
*/
// const configuration = {
//   client_id: '94883fe1-6f58-418c-91f0-3c85ae50e094',
//   redirect_uri: 'http://localhost:3000/callback',
//   silent_redirect_uri: 'http://localhost:4200/authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
//   scope: 'm3p.f.pr.pro m3p.f.pr.ros m3p.f.pr.inv m3p.f.pr.act offline',
//   authority: 'https://hydra-public.prod.m3.scopelypv.com',
//   service_worker_relative_url:'/OidcServiceWorker.js',
//   service_worker_only:true,
//   silent_login_uri:"http://localhost:3000",
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
