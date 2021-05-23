const Discord = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  execute(member) {

      const channel = member.guild.channels.cache.find(channel => channel.name === "general")
      if (!channel) return;

      const joinembed = new Discord.MessageEmbed()
        .setTitle(`A new member just arrived!`)
        .setDescription(`Welcome ${member} we hope you enjoy your stay here!`)
        .setColor("#FF0000")

      channel.send(joinembed)
    }
}