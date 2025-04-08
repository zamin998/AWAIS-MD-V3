const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "script2",
    alias: ["sc2","repo2","info2"],
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let repo =`
*╭──────────────●●►*
> *BOT OWNER:*
*|* *CREW AWAIS*

> *AWAIS MD REPO:*
*|* *https://github.com/Awais-star-a11y/AWAIS-MD-V3*

> *SUPPORT CHANNEL:*
*|* *https://whatsapp.com/channel/0029VashGieHAdNP11OHXH3P*
*╰──────────────●●►*

> *AWAIS XMD*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363369260614615@newsletter',
      newsletterName: "AWAIS XMD",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'AWAIS MD',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/Awais-star-a11y/AWAIS-MD-V3" ,
thumbnailUrl: "https://i.imgur.com/XM8Vadf.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});
