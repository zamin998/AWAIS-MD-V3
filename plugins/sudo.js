const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

// Path to owner.json
const ownerFile = path.join(__dirname, '../owner.json');

cmd({
  pattern: 'sudo',
  alias: ['addsudo', 'addowner'],
  desc: 'Add a new number to owner list',
  category: 'owner',
  use: '<number>',
  react: '✅'
}, async (conn, m, { args, reply, isOwner }) => {
  if (!isOwner) return reply('Only current owners can use this command.');

  if (!args[0]) return reply('Please provide a number. Example: .sudo 923001234567');

  const number = args[0].replace(/[^0-9]/g, '');
  const jid = `${number}@s.whatsapp.net`;

  // Read current owner list
  let owners = [];
  if (fs.existsSync(ownerFile)) {
    owners = JSON.parse(fs.readFileSync(ownerFile));
  }

  if (owners.includes(jid)) return reply('This number is already an owner.');

  owners.push(jid);
  fs.writeFileSync(ownerFile, JSON.stringify(owners, null, 2));

  await reply(`Added @${number} as a new owner.`);
  await conn.sendMessage(m.chat, {
    text: `@${number} has been added to the owner list.`,
    mentions: [jid]
  });
});
