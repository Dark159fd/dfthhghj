const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require('discord.js')
const day = require("dayjs")

module.exports = {
  name: "server-info",//Nombre del comando
  alias: ["serverinfo"],//Alias del comando (Por si quieres activar el comando de 2 maneras)
  async execute (client, message, args) {

    const owner = message.guild.fetchOwner()
    const createsv = day(message.guild.createdAt).format('DD/MM/YY')

    const info = new Discord.MessageEmbed()
    .setTitle("Informacion del servidor")
    .setThumbnail(message.guild.iconURL())
    .setColor(0x00ffeb)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail("https://media.discordapp.net/attachments/975513806950248478/975849099351969852/Logotipo_500x500_px.jpeg")
    .addFields(
        {name: "Nombre del servidor:", value: `${message.guild.name}`, inline: true},
        {name: "Numero de canales:", value: `${message.guild.channels.cache.size}`, inline: true},
        {name: "Owner:", value: `${await message.guild.fetchOwner()}`, inline: true},
        {name: "Miembros", value: `${message.guild.memberCount}`, inline: true},
        {name: "Numero de roles:", value: `${message.guild.roles.cache.size}`, inline: true },
        {name: "ID del servidor:", value: `${message.guild.id}`, inline: true},
        {name: "Fecha de creacion:", value: `${createsv}`, inline: true},
        {name: "Emojis", value: `${message.guild.emojis.cache.size}`, inline: true},
        {name: "boosts", value: `${message.guild.premiumSubscriptionCount.toString()}`, inline: true}

    
    
    )

    message.reply({ embeds: [info] })
 


  }

}
