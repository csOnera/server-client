This is a template for server-client communication without showing the key to connection of mongodb.
It should work after creating a .env file with a variable named DB_URI, which is the key obtained from your mongodb account.
Simple UI.
In client side, react was used as the front-end framework and axios was used to fetch data by calling the specific uri according to the server routing (GET method).
In server side, express was used as the back-end framework while mongodb was used as the online database.

client (react) run command
=> npm start

server (express) run command
=> npm run mongo
