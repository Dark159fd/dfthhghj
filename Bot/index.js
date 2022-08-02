const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Bot prendido!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
client.config = config;

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Evento cargado: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.on('ready', () => {
console.log(`Sesion iniciada ${client.user.tag}!`);
client.user.setPresence( {
  
activity: {name: `+help `, // Nombre del estado
type: "WATCHING"}, // Tipo (LISTENING, WATCHING, PLAYING).
status:"online"});})
client.setMaxListeners (200)

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Comando cargado con exito: ${commandName}`);
    });
});

// Login
client.login(config.token);
