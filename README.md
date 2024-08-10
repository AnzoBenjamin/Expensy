A simple expense tracker with login, signup and data visualisation and data persistence.

Steps to rebuild.

/////////////////////
Some key requirements.
Create a mongodb atlas account, get the mongodb uri,  and create a .env file in the backend folder and add environment variable MONGO_URI.

```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.2lcjpfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
If you intend to use this in production, change the URL in the main.jsx of the frontend folder to match your backend URL.
/////////////////

1. Download zipped project or clone the project
```
  git clone https://github.com/AnzoBenjamin/Expensy
```

2. Download the dependencies for the server.
   ```
     npm install
   ```
3. Run the server in the watch mode.
   ```
   npm run watch
   ```
4. Download the dependencies for the client.
   ```
   npm install
   ```
5. Run the frontend in development mode.
   ```
   npm run dev
   ```

NOTE: The above is entirely for development purposes.
If you want to run it in production, make sure you are in the root directory and run:

```
npm run build
npm run start
```

The frontend is served with the backend. So paste the url of your backend and the application should be working.
