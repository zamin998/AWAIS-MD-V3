const fs = require("fs");
const path = "./plugins/owners.json"; // owners file

const sudoCommand = {
  pattern: "sudo",
  alias: ["owner", "root"],
  desc: "Add/View owner numbers",
  category: "owner",
  use: ".sudo [number or @mention]",
  filename: __filename
};

const delSudoCommand = {
  pattern: "delsudo",
  desc: "Remove an owner number",
  category: "owner",
  use: ".delsudo [number or @mention]",
  filename: __filename
};

const ownersCommand = {
  pattern: "owners",
  desc: "Show all bot owners",
  category: "owner",
  use: ".owners",
  filename: __filename
};

const closeCommand = {
  pattern: "close",
  hidden: true,
  filename: __filename
};

// DEFAULT OWNER: Change this to your own number (without @s.whatsapp.net)
const defaultOwner = "923182832887";

// Ensure owner file exists
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([defaultOwner], null, 2));
}

let owners = JSON.parse(fs.readFileSync(path));

// ===== .sudo command =====
cmd(sudoCommand, async (sock, m, msg, {
  sender,
  args,
  reply,
}) => {
  const senderNum = sender.split('@')[0];
  if (!owners.includes(senderNum)) return reply("❌ You are not authorized to use this command.");

  if (!args[0]) {
    return reply("🧑‍💼 Current Owners:\n" + owners.map(o => `• ${o}`).join("\n"));
  }

  const newOwner = args[0].replace(/[^0-9]/g, '');
  if (owners.includes(newOwner)) return reply(`ℹ️ ${newOwner} is already an owner.`);

  owners.push(newOwner);
  fs.writeFileSync(path, JSON.stringify(owners, null, 2));
  return reply(`✅ ${newOwner} has been added as an owner.`);
});

// ===== .delsudo command =====
cmd(delSudoCommand, async (sock, m, msg, {
  sender,
  args,
  reply,
}) => {
  const senderNum = sender.split('@')[0];
  if (!owners.includes(senderNum)) return reply("❌ You are not authorized to use this command.");

  if (!args[0]) return reply("⚠️ Provide a number to remove.");

  const removeNum = args[0].replace(/[^0-9]/g, '');
  if (removeNum === defaultOwner) return reply("❌ You can't remove the default owner.");
  if (!owners.includes(removeNum)) return reply("❌ This number is not an owner.");

  owners = owners.filter(o => o !== removeNum);
  fs.writeFileSync(path, JSON.stringify(owners, null, 2));
  return reply(`✅ ${removeNum} has been removed from owners.`);
});

// ===== .owners command =====
cmd(ownersCommand, async (sock, m, msg, {
  reply,
}) => {
  const ownersList = owners.map(o => `• ${o}`).join("\n");

  const buttons = [
    {
      buttonId: ".close",
      buttonText: { displayText: "❌ Close" },
      type: 1
    }
  ];

  const buttonMessage = {
    text: `🧑‍💼 *Current Owners:*\n\n${ownersList}`,
    footer: "Bot Management Panel",
    buttons: buttons,
    headerType: 1
  };

  await sock.sendMessage(m.chat, buttonMessage, { quoted: m });
});

// ===== .close command =====
cmd(closeCommand, async (sock, m) => {
  await sock.sendMessage(m.chat, { delete: m.key });
});

//codes by Awais-xd 
