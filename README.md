# BackEnd_Server

## To start setting up the project
Step 1: Clone the repo

```bash
git clone git@gitlab.com:YamenGM/backend_server.git
git clone git@gitlab.com:YamenGM/client.git
git@gitlab.com:YamenGM/server.git
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
REFRESH_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
```

Step 4: To generate 256-bit keys for JWT

```bash
node ./helpers/generate_keys.js
```

Step 5: Install Redis and it will run automatic

<https://github.com/microsoftarchive/redis/releases>  ----> .msi


Step 6: Install MongoDB 

See <https://docs.mongodb.com/manual/installation/> for more infos

Step 7: Run Mongo daemon

Step 8: Start the API by

```bash
npm start
```