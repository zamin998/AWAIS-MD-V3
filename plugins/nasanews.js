const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, fetchJson} = require('../lib/functions')

cmd({
    pattern: "nasa",
    alias: ["nasanews","nnna"],
    react: "🧾",
    desc: "",
    category: "download",
    use: '.nasa',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, darkneo, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const wanews = await fetchJson(`https://api.nasa.gov/planetary/apod?api_key=8vhAFhlLCDlRLzt5P1iLu2OOMkxtmScpO5VmZEjZ`);


          await conn.sendMessage(from , { text:`Hello ${mek.pushname ||  '\n'} I Am Finding Whatsapp New Update Details..` }, { quoted: mek } )    

          const images = `${wanews.hdurl}`
           const title = `${wanews.title}`
           const date = `${wanews.date}`
           const news = `${wanews.explanation}`

await conn.sendMessage(from,  { image: { url: images }, caption: `\n✪ 𝚃𝙸𝚃𝙻𝙴\n${ title }\n\n✪ 𝐍𝐄𝐖𝐒 \n ${ news }\n\n⚪ 𝐃𝐀𝐓𝐄\n${date}`}, { quoted: mek })
}
catch(e){
console.log(e)
}})
