const dotenv = require('dotenv');
dotenv.config()
const fs = require('fs');

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const cooldown = new Set();
const cdseconds = 5;

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

const newUser = [];

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command)
  }
}



client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply(`you have to wait 5 seconds between commands`)
  }
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    cooldown.add(message.author.id)
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`there was an error trying to execute that command!`);
  }
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});







client.login(token);
