cmd({
  pattern: "delsudo",
  desc: "Remove user from owner list",
  category: "owner",
  use: ".delsudo (reply to a user's message)",
  filename: __filename,
}, async (conn, mek, m, { reply }) => {
  if (!m.quoted) return reply("Please reply to a user's message.");

  const target = m.quoted.sender;

  if (!fs.existsSync(ownerPath)) return reply("owner.json file not found.");

  let ownerList = JSON.parse(fs.readFileSync(ownerPath, 'utf-8'));

  if (!ownerList.includes(target)) return reply("This number is not in the owner list.");

  ownerList = ownerList.filter(item => item !== target);
  fs.writeFileSync(ownerPath, JSON.stringify(ownerList, null, 2));
  reply(`❌ Removed from owner list:\n${target}`);
});