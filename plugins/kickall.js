const {
  cmd,
  commands
} = require('../command');
const sleep = _0x2b6a08 => new Promise(_0x3265f9 => setTimeout(_0x3265f9, _0x2b6a08));
cmd({
  'pattern': "kickall",
  'desc': "Kicks all non-admin members from the group.",
  'react': '👏',
  'category': "group",
  'filename': __filename
}, async (_0x56bac9, _0x551326, _0x31544f, {
  from: _0x5ab954,
  quoted: _0x24d541,
  body: _0x3c8b0a,
  isCmd: _0x2d9691,
  command: _0x2c9d43,
  args: _0x5c426c,
  q: _0x5be0c2,
  isGroup: _0x2d5bca,
  sender: _0x2ae37d,
  senderNumber: _0x45a69d,
  botNumber2: _0x480ed4,
  botNumber: _0x46889e,
  pushname: _0x3c88fe,
  isMe: _0x57cc59,
  isOwner: _0x309ad0,
  groupMetadata: _0x2c0bc0,
  groupName: _0x2a07d8,
  participants: _0x12d9e5,
  groupAdmins: _0x205311,
  isBotAdmins: _0x4a33a0,
  isAdmins: _0x1ad53a,
  reply: _0x5b5809
}) => {
  try {
    if (!_0x1ad53a) {
      return _0x5b5809("Only group admins can use this command.");
    }
    if (!_0x309ad0) {
      return _0x5b5809("Only the bot owner can use this command.");
    }
    if (!_0x2d5bca) {
      return _0x5b5809("This command is only available in groups.");
    }
    if (!_0x4a33a0) {
      return _0x5b5809("I need admin privileges to kick members.");
    }
    const _0x598864 = _0x2c0bc0.participants;
    const _0x445865 = _0x598864.filter(_0x2b7aad => !_0x205311.includes(_0x2b7aad.id) && _0x2b7aad.id !== _0x56bac9.user.id);
    if (_0x445865.length === 0x0) {
      return _0x5b5809("No non-admin members found to kick.");
    }
    _0x5b5809("Starting to kick " + _0x445865.length + " non-admin members...");
    for (let _0x3700c2 of _0x445865) {
      try {
        await _0x56bac9.groupParticipantsUpdate(_0x5ab954, [_0x3700c2.id], 'remove');
        await sleep(0x7d0);
      } catch (_0x1b688c) {
        console.error("Failed to remove " + _0x3700c2.id + ':', _0x1b688c);
      }
    }
    _0x5b5809("Successfully removed all non-admin members from the group.");
  } catch (_0x58230d) {
    console.error("Error kicking users:", _0x58230d);
    _0x5b5809("An error occurred while trying to remove members. Please try again.");
  }
});
