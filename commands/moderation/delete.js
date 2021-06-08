

module.exports = {
  name: 'delete',
  description: 'delete message by ID',
  execute(message, args) {
    
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You do not have permission to delete messages`);

    if (!args) {
      return message.reply(`You need to type the id of the message you want to delete.`);
    }

    return message.reply(`this command is working`);

    
    

  }
}