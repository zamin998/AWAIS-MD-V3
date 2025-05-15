const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')
cmd({
    pattern: "obito",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: '', 
fun: '', 
utility: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] +=`*┃◈* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `
*╭━━━〔 ✦${config.BOT_NAME}✦ 〕━━━┈⊷*
*┃★╭──────────────•*
*┃★│* 𝕽𝖀𝕹𝕿𝕴𝕸𝕰 : *${runtime(process.uptime())}*
*┃★│* 𝕽𝕬𝕸 : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*┃★│* 𝕸𝕺𝕯𝕰 : *[${config.MODE}]*
*┃★│* 𝕻𝕽𝕴𝕱𝕴𝖃 : *[${config.PREFIX}]*
*┃★╰──────────────•*
*╰━━━━━━━━━━━━━━━┈⊷*

*•═━┈┈━═〔 𝕮𝕸𝕯 𝕷𝕴𝕾𝕿〕═━┈┈━═•*

*[ 𝕯𝕺𝖂𝕹𝕷𝕺𝕬𝕯𝕰𝕽-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.download}
*╰┈───────────────•*

*[ 𝕸𝕬𝕴𝕹-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.main}
*╰┈───────────────•*

*[ 𝕲𝕽𝕺𝖀𝕻-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.group}
*╰┈───────────────•*

*[ 𝕺𝖂𝕹𝕰𝕽-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.owner}
*╰┈───────────────•*

*[ 𝕮𝕺𝕹𝖁𝕰𝕽𝕿𝕰𝕽-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.convert}
*╰┈───────────────•*

*[ 𝕾𝕰𝕬𝕽𝕮𝕳-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.search}
*╰┈───────────────•*

*[ 𝕱𝖀𝕹-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.fun}
*╰┈───────────────•*

*[ 𝖀𝕿𝕴𝕷𝕴𝕿𝖄-𝕮𝕸𝕯 ]*

*╭┈───────────────•*
${menu.utility}
*╰┈───────────────•*

*❒⁠⁠⁠⁠▭▬▭▬▭▬▭▬▭▬▭❒*⁠⁠⁠⁠

*•────────────•⟢*
 𝕮𝕽𝕰𝕬𝕿𝕰𝕯 𝕭𝖄 𝕺𝕭𝕴𝕿𝕺 
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu,
                       contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369260614615@newsletter',
          newsletterName: '𝕺𝕭𝕴𝕿𝕺-𝕸𝕯',
          serverMessageId: 143
        }
      }
    }, {
      quoted: mek
    })

    // Send audio
    await conn.sendMessage(from, {
      audio: {
        url: 'https://files.catbox.moe/f5y622.mp4'
      },
      mimetype: 'audio/mpeg',
      ptt: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369260614615@newsletter',
          newsletterName: '𝕺𝕭𝕴𝕿𝕺-𝕸𝕯',
          serverMessageId: 143
        }
      }
    }, {
      quoted: mek
    })
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})
