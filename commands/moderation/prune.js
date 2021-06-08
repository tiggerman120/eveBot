

module.exports = {
  name: 'prune',
  description: 'prune x messages',
  execute(message, args) {
    args = message.content.split(' ').slice(1);
    const amount = args.join(' ');
    
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply(`you do not have permissions to delete messages`)
    }

    if (!amount) {
      return message.reply(`You haven't given an amount of messages to be deleted`);
    }
    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number');
    } else if (amount < 1 || amount > 100) {
      return message.reply('you need to input a number between 2 and 100.');
    }
    
    message.channel.bulkDelete(amount, true)
    return message.reply(`pruned ${args} messages!`)
      .catch(err => {
        console.error(err);
        message.channel.send('there was an error trying to prune messages in this channel!');
      });
  }
}