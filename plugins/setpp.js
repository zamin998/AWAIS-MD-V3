const config = require('../config'); 
const { cmd } = require('../command'); 
const { getBuffer } = require('../lib/functions'); 
const Jimp = require('jimp'); 

cmd({ 
  pattern: "setpp", 
  react: "🖼️", 
  desc: "Update The Profile Picture", 
  alias: "lagao",
  category: "tools", 
  filename: __filename 
}, async (conn, mek, m) => { 
  try { 
    const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage')); 
    if (!isQuotedImage) { 
      return m.reply('⚠️ *Reply To An Photo*'); 
    } 
    m.reply('*Please Wait a Moment*'); 
    const imageBuffer = await m.quoted.download(); 
    const image = await Jimp.read(imageBuffer); 
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG); 
    await conn.updateProfilePicture(conn.user.id, buffer); 
    m.reply('*Your Profile Pic Is Updated*'); 
  } catch (err) { 
    console.error(err); 
    m.reply(`❌ *Error:* ${err.message}`); 
  } 
});
  
