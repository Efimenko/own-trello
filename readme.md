<h2>1. Configurate enviroment (should be run one)</h2>
<h3>Start mongodb container</h3>
<code>mkdir ~/mongodb-data<br>
docker run -d -p 27017:27017 -v ~/mongodb-data:/data/db mongo</code>
<br>
<h3>Create .env file in api</h3>
<code>
cd api<br>
node scripts/generate-env.js
</code>

<h2>2. Start api</h2>
<code>
cd api<br>
npm i<br>
npm run start:watch</code>
<br>

<h2>3. Start client</h2>
<code>
cd client<br>
npm i<br>
npm start
</code>