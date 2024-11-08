import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import config from './config.ts';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';


const { clientId, domain } = config;

// if (!inDev) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <KindeProvider
        clientId={clientId}
        domain={domain}
        logoutUri={window.location.origin}
        redirectUri={window.location.origin}
      >
        <App />
      </KindeProvider>
    </React.StrictMode>
  );
// } else {
//   ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
