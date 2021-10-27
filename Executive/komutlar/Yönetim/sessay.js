const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
  
    if (message.member.permissions.has(8) || durum) {
        const Array = []
        let sayım = 0;
        let Durdur = 0
        const Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!Role) return message.reply("Lütfen bir rol etiketleyiniz veya Rol ID'si belirtiniz")
         const filter = message.guild.members.cache.filter(User => User.roles.cache.has(Role.id) && !User.voice.channel && User.presence.status !== "offline")
        filter.forEach(M => {
        if (sayım === 60){
        if (Durdur > 0) return
        Durdur++;
         return Array.push("60'dan fazla üye var.")
        }
        sayım++
        Array.push(`<@${M.id}>`)
        })
        message.channel.send(`${Array.map(c => c).join(" ,")}\n\n**Müsait olan arkadaşlar rica etsem ses kanallarına geçebilir mi ihihihih** :heart:`, {split: true});
      } else return;

}
exports.conf = {aliases: ["sessay", "ses-say", "seslisay"]}
exports.help = {name: 'Sessay'}
