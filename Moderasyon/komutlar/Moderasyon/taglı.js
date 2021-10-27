const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let taglıData = require("../../models/taglıUye");
let Stat = require("../../models/stats");
let StaffXP = require("../../models/stafxp");
const hanedan = require("../../models/hanedanlik");
let limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (kanal) return;

    let data = await sunucuayar.findOne({})
    kayitSorumlusu = data.REGISTERAuthorized;
    if (await client.permAyar(message.author.id, message.guild.id, "register") || durum) {
        if (args[0] == "top") {
            return;
            let data = await taglıData.find({
                Durum: "stat"
            })
            let kayitcilar = {};
            data.forEach((value) => {
                if (kayitcilar[value.authorID]) kayitcilar[value.authorID] += 1;
                else kayitcilar[value.authorID] = 1
            })
            let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).map(e => ({
                User: e,
                Value: kayitcilar[e]
            }))
            sirali = sirali.map((user, index) => `**${index+1}.** <@${user.User}> \`${user.Value} Taglı.\``).splice(0, 30)
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(conf.footer)
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription(`Top 25 Tag aldırma sıralaması aşağıda belirtilmiştir.\n\n${sirali.length > 0 ? sirali.join("\n") : "Veri yoktur"}`)
            return message.channel.send(embed)
        }
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!");
        if (target.id === message.author.id) return message.react(client.emojis.cache.find(x => x.name === "axze_iptal"));
		if (!target.user.username.includes(data.TAG)) return message.reply("Bu kullanıcı adına sunucu tagımızı almamış!")
        limit.set(target.id, true)
        await taglıData.findOne({
            userID: target.id,
            Durum: "stat"
        }, async (err, res) => {
            if (!res)
                return message.reply(`Bu komutu sadece kayıtsız üyelere tag aldırdığınız zaman kullanabilirsiniz.`);
            if (res.authorID != "x")
                return message.reply(`Tag aldırmaya çalıştığın üye farklı bir yetkili tarafından zaten taga alınmış!`);
                    await message.channel.send(`${message.author}, Başarılı bir şekilde ${target} adlı üyeye tag aldırdınız.`);
                    message.react(client.emojis.cache.find(x => x.name === "axze_tik"));
                    client.channels.cache.get(client.ayarlar.taglogkanal).send(`${message.author} adlı yetkili ${target} adlı yetkiliye başarılı bir şekilde tag aldırdı.`)
                    res.authorID = message.author.id, res.save();
                    
                    let selam = await hanedan.findOne({userID: message.author.id, guildID: message.guild.id});
                    if (selam) {
                        await hanedan.updateOne({userID: message.author.id, guildID: message.guild.id}, {
                            $inc: {
                                Taglı: 1
                            }
                        }, {upsert: true})
                    }
                    await taglıData.updateOne({
                        userID: target.id,
                        Durum: "puan"
                    }, {
                        authorID: message.author.id
                    }, {
                        upsert: true
                    }).exec();
					Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: 30}}, {upsert: true}).exec();
                    await client.easyMission(message.author.id, "taglı", 1);
                    await client.dailyMission(message.author.id, "taglı", 1)
                    baddAudit(message.author.id, 1)

        });
    } else return message.reply("Bu Komutu Kullanabilmek için Yönetici ya da Kayıt Sorumlusu olman gerekiyor!")
}
exports.conf = {
    aliases: ["Taglı"]
}
exports.help = {
    name: 'taglı'
}

function baddAudit(id, value) {
    Stat.updateMany({
        userID: id,
        guildID: client.ayarlar.sunucuId
    }, {
        $inc: {
            "yedi.TagMember": value
        }
    }).exec((err, res) => {
        if (err) console.error(err);
    });
};