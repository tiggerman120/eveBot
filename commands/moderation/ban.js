module.exports = {
  name: 'ban',
  description: 'ban a user',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`you do not have permission to ban members`)

    if (!message.guild) return;

    try {
      const user = message.mentions.users.first();
      if (user) {
        console.log(user);
        const member = message.guild.members.resolve(user);
        if (member) {
          console.log(member);
          member.ban({
            days: args[1],
            reason: args[2]
          })
          .then(() => {
            message.channel.send(`successfully banned ${user.tag} for ${args[1]} days`);
          })
          .catch(err => {
            message.reply(`i was unable to ban ${user.tag}`);
            console.error(err);
          })
        } else {
          message.reply(`that user isn't in the guild`);
        }
      } else {
        message.reply(`You didn't enter a user to ban`)
      }
    } catch (err) {
      message.reply(`I could not ban the user`);
      console.error(err)
    }

  }
}