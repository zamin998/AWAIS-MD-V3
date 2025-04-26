const fs = require('fs');
const ownerPath = './plugins/owner.json';

cmd({
  pattern: "sudo",
  desc: "Add user to owner list",
  category: "owner",
  use: ".sudo (reply to a user's message)",
  filename: __filename,
}, async (conn, mek, m, { reply }) => {
  if (!m.quoted) return reply("Please reply to a user's message.");

  const target = m.quoted.sender;

  let ownerList = [];
  if (fs.existsSync(ownerPath)) {
    ownerList = JSON.parse(fs.readFileSync(ownerPath, 'utf-8'));
  }

  if (ownerList.includes(target)) return reply("This number is already in the owner list.");

  ownerList.push(target);
  fs.writeFileSync(ownerPath, JSON.stringify(ownerList, null, 2));
  reply(`✅ Added to owner list:\n${target}`);
});