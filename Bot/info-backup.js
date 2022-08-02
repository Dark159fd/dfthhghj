const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Debe tener permisos de administración de mensajes para crear una copia de seguridad en este servidor.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(':x: ¡Especifique una ID de copia de seguridad válida!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('ℹBackup', backup.data.iconURL)
            .addField('Nombre del servidor', backup.data.name)
            .addField('Tamaño', backup.size + ' kb')
            .addField('Creado en', formattedDate)
            .setFooter('Backup ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No se encontró ninguna copia de seguridad')
            return message.channel.send(':x:No se encontró una copia de seguridad para la ID '+backupID+'!');
        else
            return message.channel.send(':x: Ocurrió un error: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};
