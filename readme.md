<h2>start mongodb container</h2>
<code>mkdir ~/mongodb-data<br>
docker run -d -p 27017:27017 -v ~/mongodb-data:/data/db mongo</code>
<br>

<h2>start api</h2>
<code>npm i<br>
npm run start:watch</code>
<br>

<h2>start client</h2>
<code>npm i<br>
npm start</code>