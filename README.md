# BeKindlyTodayFrontend

The BeKindly.Today kindness challenge app.

## Developers

### Getting set up

### Environment Variables

Development environment variables should be stored in a file in the root directory named `.env.dev`.
This file will not be tracked by git and is unique to your local directory. There is an example file named `.env.example`. Dont change it,
it is here for your benefit.

The Kinde Stuff will not work without setting up an account, but if you make the VITE_NODE_ENV = development all the kinde stuff should be turned off

#### Environment Variables For Deployment

- FRONTEND_PORT
  - <span style="color:yellow;">**Required**</span>
  - Contains the port used for the frontend
- VITE_BACKEND_URL
  - <span style="color:yellow;">**Required**</span>
  - Contains the url of the backend (accessable in code)
- VITE_CLIENT_ID
  - <span style="color:yellow;">**Required**</span>
  - Contains the client ID from KINDE for auth
- VITE_DOMAIN
  - <span style="color:yellow;">**Required**</span>
  - The URL of the website on Kinde's subdomain
- VITE_NODE_ENV
  - <span style="color:yellow;">**Required**</span>
  - For development use `development`
  - For production, use `production`

### Starting the server

In a production environment, you must build the react app and then use
the `npm run preview` command to start serving the react app. When the build step is run, you must have the environment variables present in your system.

For development, run `npm run dev`
