module.exports = {
  name: 'kick',
  description: 'kick a user',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`you lack permissions to kick a user`);
    // console.log(message.guild.members.cache)
    let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    
    if (!User) return message.reply(`You need to tag a user in order to kick them!`);
    if (User.hasPermission('KICK_MEMBERS')) return message.reply(`cannot kick user with kick permissions`);
    let kickReason = args.join(' ').slice(22);
    if (!kickReason) {
      kickReason = 'none'
    };
    
    User.kick(kickReason)
    .then(() => {
      message.reply(`successfully kicked ${User.user.username}`)
    })
    .catch(err => {
      message.reply(`i was unable to kick the member`);
      console.error(err)
    })
    
        // const taggedUser = message.mentions.users.first();
        message.channel.send(`you want to kick: ${User.user.username}`);

  }
}