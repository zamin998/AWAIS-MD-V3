const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    delay,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../functions')
const axios = require('axios')
const FileType = require('file-type')
const config = require('../../settings')
const {cmd , commands} = require('../command')

cmd({
    pattern: "vv2",
    react: "😁",
    alias: ["lassanai","patta","mekada","supiri","maru"],
    desc: "To ViewOnceMessage",
    category: "convert",
    use: '.vv',
    filename: __filename
},
async(conn, mek, m,{from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{         

conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }	      
   
  
const quot = mek.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap =quot.message.imageMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return conn.sendMessage(from,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap =quot.message.videoMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return conn.sendMessage(from,{video:{url : anu},caption : cap })
}
 
}
//else citel.reply("```This is Not A ViewOnce Message```") 
       
       
if(!mek.quoted) return mek.reply("```Uh Please Reply A ViewOnce Message```")           
if(mek.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(mek.quoted.message.imageMessage )
{ 
  let cap = mek.quoted.message.imageMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(mek.quoted.message.imageMessage)
  conn.sendMessage(from,{image:{url : anu},caption : cap })
}
else if(mek.quoted.message.videoMessage )
{
  let cap =mek.quoted.message.videoMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(mek.quoted.message.videoMessage)
  conn.sendMessage(from,{video:{url : anu},caption : cap })
}

}
else return mek.reply("```This is Not A ViewOnce Message```")
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
}catch(e){
console.log(e)
reply(`*please try againg⭕*`)
}
})
