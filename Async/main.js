const {
    MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const client = global.client = new Discord.Client({
    fetchAllMembers: true
});
const logs = require('discord-logs');
logs(client);
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
let sunucuayar = require("./models/sunucuayar");
let muteInterval = require("./models/muteInterval");
let vmuteInterval = require("./models/vmuteInterval");
let jailInterval = require("./models/jailInterval");
let dcInterval = require("./models/dcInterval");
let vkInterval = require("./models/vkInterval");
let stInterval = require("./models/stInterval");
let tagInterval = require("./models/taglıUye");
let authorityInterval = require("./models/authority_user");

let randMiss = require("./models/randomMission");
let dayMiss = require("./models/dailyMission");
let xpData = require("./models/stafxp");
let puansystem = require("./models/puansystem");

mongoose.connect(mainSettings.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Array.prototype.shuffle = function () {
    let i = this.length;
    while (i) {
      let j = Math.floor(Math.random() * i);
      let t = this[--i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  };

client.on("ready", async () => {

    let dailyData = await puansystem.findOne({
        guildID: mainSettings.sunucuId
    }) || {
        DailyMission: {
            Type: false
        }
    };

    setInterval(async () => {
        let arr2 = [];
        let kontrol = await randMiss.find({});
        kontrol.forEach(async memberData => {
            let mission = memberData.Mission;
            if (memberData.Check >= mission.AMOUNT) {
                if (mission.MISSION == "ses") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Ses",
                        Puan: (mission.AMOUNT / (1000 * 60 * 60) * 40).toFixed(0)
                    })
                }
                if (mission.MISSION == "mesaj") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Mesaj",
                        Puan: (mission.AMOUNT * 0.2).toFixed(0)
                    })

                }
                if (mission.MISSION == "davet") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Davet",
                        Puan: (mission.AMOUNT * 14).toFixed(0)
                    })

                }
                if (mission.MISSION == "taglı") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Taglı",
                        Puan: (mission.AMOUNT * 40).toFixed(0)
                    })

                }
                if (mission.MISSION == "teyit") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Teyit",
                        Puan: (mission.AMOUNT * 3).toFixed(0)
                    })
                }
            }
        })

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(mainSettings.footer)
            .setTitle("Günlük Görev Tamamlayanlar")
            .setDescription(`Toplam da (**${arr2.length}/${kontrol.length}**) kişi görev yapmış bulunmakta.\n\n${arr2.length > 0 ? arr2.map(x => `<@${x.UserID}> **Görev:** \`${x.Görev}\` **Puan:** \`${x.Puan}\``).join("\n") : "Veri yoktur."}`)
        client.channels.cache.get(mainSettings.GörevSystem.KanalID).messages.fetch(mainSettings.GörevSystem.MesajID).then(m => m.edit(embed))
    }, 1000 * 60);

    setInterval(async () => {
        let arr = ["davet", "mesaj", "ses", "taglı", "teyit"];
        let dagit = []
        await dayMiss.findOne({
            guildID: mainSettings.sunucuId
        }, async (err, res) => {
            if (!res) {
                let newData = dayMiss({
                    guildID: mainSettings.sunucuId,
                    Date: Date.now()
                })
                await newData.save()
            } else {
                if (Date.now() - res.Date >= 1000 * 60 * 60 * 24 * 1) {
                        let sunucudata = await sunucuayar.findOne({});
                        client.guilds.cache.get(mainSettings.sunucuId).roles.cache.get(sunucudata.EnAltYetkiliRol).members.array().shuffle().forEach((x, index) => {
                            arr.shuffle()
                            let random = arr[Math.floor(Math.random() * arr.length)]
                            dagit.push({
                                user: x.id,
                                gorev: random
                            })
                        });
                        let veri = dagit;
                        let kategoriler = dailyData.DailyMission.category;
                        let messageKategori = dailyData.DailyMission.messageChannel;
                        let yasaklıkanal = dailyData.DailyMission.unChannel;

                        let VoiceChannel = client.guilds.cache.get(mainSettings.sunucuId).channels.cache.filter(chan => chan.type == "voice" && kategoriler.includes(chan.parentID) && !yasaklıkanal.includes(chan.id)).map(channel => channel.id)
                        let MessageChannel = client.guilds.cache.get(mainSettings.sunucuId).channels.cache.filter(chan => chan.type == "text" && messageKategori.includes(chan.id)).map(channel => channel.id)
                        client.channels.cache.get(dailyData.DailyMission.logChannel).send(`\`\`\`${client.guilds.cache.get(mainSettings.sunucuId).name} ${moment(Date.now()).locale("tr").format("LLL")} tarihinde dağıtılan günlük görevler;\`\`\``);
                        veri.forEach((user, index) => {
                            setTimeout(async () => {
                                if (index >= veri.length) return client.channels.cache.get(`${message.channel.id}`).send(`Başarılı bir şekilde tüm görevler dağıtıldı.`);
                                let mesajRandom = getRandomInt(300, 400)
                                let davetRandom = getRandomInt(5, 10)
                                let sesRandom = getRandomInt(60, 300)
                                let taglıRandom = getRandomInt(1, 3)
                                let teyitRandom = getRandomInt(5, 20)
                                let miktarlar = user.gorev == "mesaj" ? mesajRandom : user.gorev == "davet" ? davetRandom : user.gorev == "ses" ? sesRandom : user.gorev == "taglı" ? taglıRandom : user.gorev == "teyit" ? teyitRandom : 0
                                if (user.gorev == "ses") {
                                    let VoiceRandom = VoiceChannel[Math.floor(Math.random() * VoiceChannel.length)];
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün <#${VoiceRandom}> kanalında \`${miktarlar}\` dakika ses aktifliği yapman gerekiyor.`);
                                }
                                if (user.gorev == "mesaj") {
                                    let MessageRandom = MessageChannel[Math.floor(Math.random() * MessageChannel.length)];
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün <#${MessageRandom}> kanalında \`${miktarlar}\` adet mesaj yazman gerekiyor.`);
                                }
                                if (user.gorev == "taglı") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet taglı üye çekmen gerekiyor.`);
                                }
                                if (user.gorev == "teyit") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet teyit yapman gerekiyor.`);
                                }
                                if (user.gorev == "davet") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet davet yapman gerekiyor.`);
                                    
                                }
                            }, index * 2000)
                        })
                        randMiss.updateMany({}, {
                            $set: {
                                Check: 0
                            }
                        }, {
                            multi: true
                        }).exec()
                        res.Date = Date.now(), res.save();
                }
            }
        })
    }, 30000)
})
client.on("ready", async () => {
    try {
        console.log(`BOT: ${client.user.username} ismi ile giriş yapıldı!`);
        
        client.user.setStatus("iddle");

        let kanal = client.channels.cache.filter(x => x.type === "voice" && x.id === mainSettings.botSesID);
        setInterval(() => {
          const oynuyor = mainSettings.readyFooter;
          const index = Math.floor(Math.random() * (oynuyor.length));
          client.user.setActivity(`${oynuyor[index]}`, {
            type: "WATCHING"
          });
          kanal.map(channel => {
            if (channel.id === mainSettings.botSesID) {
              if (channel.members.some(member => member.id === client.user.id)) return;
              if (!client.channels.cache.get(mainSettings.botSesID)) return;
              client.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
            } else return;
          });
        }, 10000);
      } catch (err) {}
});

client.on("ready", async () => {
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId)
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let muteRol = sunucuData.MUTED;
    setInterval(async () => {
        let muted = await muteInterval.find({
            "muted": true,
            "endDate": {
                $lte: Date.now()
            }
        });
        muted.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await muteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                await member.roles.remove(muteRol)
                await muteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            }
        });
    }, 5000)
});

client.on("ready", async () => {
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
    setInterval(async () => {
        let jail = await jailInterval.find({
            jailed: true,
            endDate: {
                $lte: Date.now()
            }
        });
        jail.forEach(async memberdata => {

            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await jailInterval.deleteOne({
                    userID: memberdata.userID
                }).exec();
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                let unregister = sunucuData.UNREGISTER;
                let booster = sunucuData.BOOST;
                member.roles.cache.has(sunucuData.BOOST) ? unregister.push(booster) : unregister;
                await member.roles.set(unregister)
                await jailInterval.deleteOne({
                    userID: member.id
                }).exec();
            }
        });
    }, 5000);
});

client.on("ready", async () => {
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
let vmuteRol = sunucuData.VMUTED;
    setInterval(async () => {
        let vmuted = await vmuteInterval.find({
            muted: true,
            endDate: {
                $lte: Date.now()
            }
        })
        vmuted.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                vmuteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec();
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
 
                    await member.roles.remove(vmuteRol)
                    await member.voice.setMute(false).catch(() => {});
                    vmuteInterval.deleteOne({
                        userID: memberdata.userID
                    }).exec()
            }
        })
    }, 5000);
})

client.on("ready", async () => {

    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let VKCEZALI = sunucuData.VKCEZALI;
    let DCCEZALI = sunucuData.DCCEZALI;
    let STCEZALI = sunucuData.STCEZALI;
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
    setInterval(async () => {
        let vkcezalı = await vkInterval.find({
            vktype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (vkcezalı.length == 0) return;
        vkcezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await vkInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                await member.roles.remove(VKCEZALI)
                await vkInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {

        let dccezalı = await dcInterval.find({
            dctype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (dccezalı.length == 0) return;
        dccezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                dcInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                member.roles.remove(DCCEZALI)
                await dcInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {
        let stcezalı = await stInterval.find({
            sttype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (stcezalı.length == 0) return;
        stcezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await stInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                member.roles.remove(STCEZALI)
                await stInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {
        let tagveri = await tagInterval.find({
            authorID: "x"
        });
        if (tagveri.length == 0) return;
        tagveri.forEach(async user => {
            if (Date.now() - user.Tarih >= 1000 * 60 * 3) {
                await tagInterval.deleteOne({
                    authorID: "x"
                }).exec();
            }
        })
    }, 5000)
});

client.login(mainSettings.ASYNC).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
