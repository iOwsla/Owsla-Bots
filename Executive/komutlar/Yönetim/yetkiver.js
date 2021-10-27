const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let yetkiDATA = require("../../models/yetkili");
let Stat = require("../../models/stats");
const hanedan = require("../../models/hanedanlik");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (kanal) return;
    if (durum) {
        if (args[0] == "top") {
            let data = await yetkiDATA.find({
                Durum: "stat"
            });
            let kayitcilar = {};
            data.forEach((value) => {
                if (kayitcilar[value.authorID]) kayitcilar[value.authorID] += 1;
                else kayitcilar[value.authorID] = 1
            })
            let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).map(e => ({
                User: e,
                Value: kayitcilar[e]
            }))
            sirali = sirali.map((user, index) => `**${index+1}.** <@${user.User}> \`${user.Value} Yetkili.\``).splice(0, 30)
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(conf.footer)
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription(`Top 25 Yetki aldırma sıralaması aşağıda belirtilmiştir.\n\n${sirali.length > 0 ? sirali.join("\n") : "Veri yoktur"}`)
            return message.channel.send(embed)
        }
		  if (args[0] == "bak") {
			  
			  let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			  if (!kisi) return message.reply("Lütfen bir kişi etiketleyiniz.");
			  
			  
            let data = await yetkiDATA.find({
				authorID: kisi.id,
                Durum: "stat"
            });
			let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(client.ayarlar.footer)
			.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
			.setDescription(`
${data.filter(veri => message.guild.members.cache.get(veri.userID) && message.guild.members.cache.get(veri.userID).user.username.includes(sdata.TAG)).map((veri, index) => `<@!${veri.userID}>: ${moment(veri.Tarih).locale("tr").format("LLL")}`).join("\n")}
`)
			
            return message.channel.send(embed)
        }
		
				  if (args[0] == "sorgula") {
			  
			  let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			  if (!kisi) return message.reply("Lütfen bir kişi etiketleyiniz.");
			  
			  
            let data = await yetkiDATA.findOne({
				userID: kisi.id,
                Durum: "stat"
            });
			if (!data) return message.reply("Etiketlediğin kullanıcı komut ile yetkiye alınmamış.")

            return message.channel.send(`${kisi} (\`${kisi.id}\`) adlı yetkili; ${moment(data.Tarih).locale("tr").format("LLL")} tarihinde <@${data.authorID}> (\`${data.authorID}\`) adlı yetkili tarafından yetkiye alınmış.`)
        }
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!");
        if (target.id === message.author.id) return message.react(client.emojis.cache.find(x => x.name === "axze_iptal"))
        if (Date.now() - target.user.createdAt <= 1000*60*60*24*7) return message.reply("Lütfen 7 günden kısa sürede açılan hesapları yetkili yapmayı deneyiniz.").then(x => x.delete({timeout: 5000}));
        await yetkiDATA.findOne({
            userID: target.id,
            Durum: "stat"
        }, async (err, res) => {
            if (!res)
                return message.reply(`Bu komutu sadece 5 dakika içerisinde yetki verilen kullanıcılara kullanabilirsiniz.`);
            if (res.authorID != "x")
                return message.reply(`Yetki aldırmaya çalıştığın üye farklı bir yetkili tarafından zaten yetkiye alınmış!`);
                    await message.channel.send(`${message.author}, Başarılı bir şekilde ${target} adlı üyeye yetki aldırdığınızı doğruladınız.`);
                    message.react(client.emojis.cache.find(x => x.name === "axze_tik"));
                    client.channels.cache.get(client.ayarlar.YETKI_VER_LOG).send(`${message.author} adlı yetkili ${target} adlı üyeye başarılı bir şekilde yetki aldırdı.`)
                    res.authorID = message.author.id, res.save();
                    let selam = await hanedan.findOne({userID: message.author.id, guildID: message.guild.id});
                    if (selam) {
                        await hanedan.updateOne({userID: message.author.id, guildID: message.guild.id}, {
                            $inc: {
                                Taglı: 1
                            }
                        }, {upsert: true})
                    }
                    Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: 30}}, {upsert: true}).exec();
                    await yetkiDATA.updateOne({
                        userID: target.id,
                        Durum: "puan"
                    }, {
                        authorID: message.author.id
                    }, {
                        upsert: true
                    }).exec();

        });
    } else return message.reply("Bu Komutu Kullanabilmek için Yönetici ya da Kayıt Sorumlusu olman gerekiyor!")
}
exports.conf = {
    aliases: ["Yetkili"]
}
exports.help = {
    name: 'yetkili'
}
