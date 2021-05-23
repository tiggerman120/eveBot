module.exports = {
  name: 'remove',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You do not have permission to delete messages`);

    if (!args) {
      return message.reply(`You need to say the id of the message you want to delete.`);
    }

    message.channel.delete

  }
}