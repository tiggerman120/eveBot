const Discord = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  execute(member) {

    const goodbyeEmbed = new Discord.MessageEmbed()

    goodbyeEmbed.setColor('#f00000')
    goodbyeEmbed.setTitle(`${member.user.username} has been kicked from the server`)
    goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')

    member.guild.channels.cache.find(i => i.name === 'general').send(goodbyeEmbed)
  }
}