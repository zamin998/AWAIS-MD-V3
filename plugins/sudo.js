const fs = require("fs");

const sudoCommand = {
  pattern: "sudo",
  alias: ["owner", "root"],
  desc: "Owner-only command",
  category: "owner",
  use: ".sudo",
  filename: __filename
};

cmd(sudoCommand, async (sock, m, msg, {
  sender,
  reply,
}) => {
  try {
    const senderNum = sender.split('@')[0];

    const ownersFromFile = fs.existsSync("./lib/owner.json")
      ? JSON.parse(fs.readFileSync("./lib/owner.json"))
      : [];

    const allOwners = [...(global.owner || []), ...ownersFromFile].map(num => num.replace(/[^0-9]/g, ''));

    if (!allOwners.includes(senderNum)) {
      return reply("❌ You are not authorized to use this command.");
    }

    // If owner:
    return reply("✅ Hello Owner! You have access to sudo commands.");

  } catch (err) {
    console.error("Sudo command error:", err);
    reply("⚠️ An error occurred while processing your request.");
  }
});
