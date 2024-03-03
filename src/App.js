// import logo from './logo.svg';
import "./App.css";
import { AuthProvider } from "oidc-react";
// import ApiData from "./components/auth/ApiData";
import { Products } from "./components/products";
// import { Bctrials } from "./components/bctrials";

const enableLogin = 0;

const oidcConfig = {
  clientId: "94883fe1-6f58-418c-91f0-3c85ae50e094",
  redirectUri: "http://localhost:3000/callback",
  // silentRedirectUri: 'http://localhost:3000/callback',
  scope: "m3p.f.pr.pro m3p.f.pr.inv m3p.f.pr.ros m3p.f.pr.act offline openid", // offline_access scope allow your client to retrieve the refresh_token
  authority: "https://hydra-public.prod.m3.scopelypv.com/",
  automaticSilentRenew: true,
  storage: "localStorage"
  // service_worker_relative_url:'/OidcServiceWorker.js',
  // service_worker_only:false,
};

function App() {
  if (enableLogin) {
    return (
      <AuthProvider {...oidcConfig}>
        <div className="App">
          <header className="App-header">
            {/* <Bctrials /> */}
            {/* <ApiData /> */}
            {/* <Products /> */}
          </header>
        </div>
      </AuthProvider>
    );
  } else
    return (
      <div className="App">
        <header className="App-header">
          {/* <Bctrials />  */}
          <Products />
        </header>
      </div>
    );
}

export default App;
