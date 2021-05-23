module.exports = {
  name: 'server',
  description: 'server info',
  execute(message, args) {
    message.channel.send(`this server's name is: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
  }
}