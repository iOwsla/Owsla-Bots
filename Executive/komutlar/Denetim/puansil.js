let xpData = require("../../models/stafxp");
let stat = require("../../models/stats");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(8) || durum) {
        let data = await sunucuayar.findOne({guildID: message.guild.id});
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply(`Doğru Kullanım: \`${client.ayarlar.prefix[0]}puansil @etiket davet-teyit-taglı-yetkili [miktar]\``)
        if (!args[1]) return message.reply(`Doğru Kullanım: \`${client.ayarlar.prefix[0]}puansil @etiket davet-teyit-taglı-yetkili [miktar]\``)
        if (args[1] > 250 && !data.GKV.includes(message.author.id)) return message.reply("250 üzeri puan ekleyemezsin.")


        if (!["davet", "teyit", "taglı", "yetkili"].includes(args[2])) return message.reply(`Doğru Kullanım: \`${client.ayarlar.prefix[0]}puansil @etiket davet-teyit-taglı-yetkili [miktar]\``)
        if (args[2] == "davet") {
            stat.updateOne({userID: target.id}, {$inc: {["yedi.Invite"]: -(Number(args[3]))}}).exec()
            return message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye ${args[3]} puan eklediniz.`)
        }
        if (args[2] == "teyit") {
            stat.updateOne({userID: target.id}, {$inc: {["yedi.Register"]: -(Number(args[3]))}}).exec()
            return message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye ${args[3]} puan eklediniz.`)
        }
        if (args[2] == "taglı") {
            stat.updateOne({userID: target.id}, {$inc: {["yedi.TagMember"]: -(Number(args[3]))}}).exec()
            return message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye ${args[3]} puan eklediniz.`)
        }
        if (args[2] == "yetkili") {
            stat.updateOne({userID: target.id}, {$inc: {["yedi.Yetkili"]: -(Number(args[3]))}}).exec()
            return message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye ${args[3]} puan eklediniz.`)
        }
    } else return;
}
exports.conf = {aliases: []}
exports.help = {name: 'puansil'}