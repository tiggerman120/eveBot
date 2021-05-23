const Discord = require("discord.js");
const client = new Discord.Client()
module.exports = {
  name: 'avatar',
  description: 'display user avatar',
  execute(message, args) {
    console.log(client)
    try {
      if (!message.mentions.users.size) {
        if (message.channel.guild.id) {

            
      
        
          const avatarEmbed = new Discord.MessageEmbed()
            .setTitle(`Your avatar.`)
            .setDescription(`Your profile picture.`)
            .setImage(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))

          return message.reply(avatarEmbed)
        }
      }


      const avatarList = message.mentions.users.map(user => {
        const avatarEmbed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s avatar picture`)
          .setDescription(`${user.username}'s pfp`)
          .setImage(user.displayAvatarURL({ format: "png", dynamic: true, size: 512 }));



      });
      message.channel.send(avatarList)
    } catch (err) {
      console.error(err.message);
    }
  }
}