const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  let guild = message.guild;
  if (!client.ayarlar.sahip.some(x => x === message.author.id)) return
	if(args[0] === "kur" || args[0] === "kurulum") {
    
    let onay = "https://cdn.discordapp.com/emojis/802098678369091594.gif?v=1";
    let onay2 = "https://cdn.discordapp.com/emojis/673576252241608714.gif?v=1";
    let iptal = "https://cdn.discordapp.com/emojis/673576480487506011.gif?v=1"; 
    let bosta = "https://cdn.discordapp.com/emojis/673576453140512788.png?v=1";
    let rahatsizetmeyin = "https://cdn.discordapp.com/emojis/673576231433797664.png?v=1";
    let gorunmez = "https://cdn.discordapp.com/emojis/673576417224556611.png?v=1";
    let cevrimici = "https://cdn.discordapp.com/emojis/673576292205068314.png?v=1";
    let yildiz = "https://cdn.discordapp.com/emojis/805454400139165737.gif?v=1";
    let axze_vmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894209706950656/sesmuteat.png";
    let axze_mute = "https://cdn.discordapp.com/attachments/811975658963992647/812894244632788992/muteat.png";
    let axze_vunmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894192530751518/sesmuteac.png";
    let axze_unmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894234242973716/muteac.png";
    let axze_stat = "https://cdn.discordapp.com/emojis/813380585338699806.png?v=1";
    let axze_erkek = "https://cdn.discordapp.com/emojis/782554741896773633.gif?v=1";
    let axze_kadin = "https://cdn.discordapp.com/emojis/782554741669888000.gif?v=1";
    let axze_bitisbar = "https://cdn.discordapp.com/emojis/812591747393650728.gif?v=1";
    let axze_solbar =  "https://cdn.discordapp.com/emojis/812591747401646100.gif?v=1";
    let axze_ortabar = "https://cdn.discordapp.com/emojis/813380548768563250.gif?v=1";
    let axze_baslangicbar = "https://cdn.discordapp.com/emojis/813380552924594216.png?v=1";
    let axze_gribitisbar = "https://cdn.discordapp.com/emojis/813825131674730528.png?v=1";
    let axze_griortabar = "https://cdn.discordapp.com/emojis/813441171489292348.png?v=1";
    let axze_deynek = "https://cdn.discordapp.com/emojis/794553871405285386.gif?v=1"
    
    guild.emojis.create(axze_vmute, "axze_vmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_mute, "axze_mute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_vunmute, "axze_vunmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_unmute, "axze_unmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_deynek, "axze_deynek").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_stat, "axze_stat").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_erkek, "axze_erkek").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_kadin, "axze_kadin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay, "axze_tik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay2, "axze_tik2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(iptal, "axze_iptal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(bosta, "axze_away").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(rahatsizetmeyin, "axze_dnd").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(gorunmez, "axze_offline").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(cevrimici, "axze_online").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_baslangicbar, "axze_baslangicbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_bitisbar, "axze_bitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_solbar, "axze_solbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_ortabar, "axze_ortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_gribitisbar, "axze_gribitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(axze_griortabar, "axze_griortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(yildiz, "yildiz").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    
    return;
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojis'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'emoji',
    description: "Sunucuda komut denemeye yarar",
    usage: 'eval <kod>',
    kategori: "Bot Yapımcısı"
  };
  