const backup = require('discord-backup');
const config = require('../config.json');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Debe tener permisos de administración de mensajes para crear una copia de seguridad en este servidor.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('¡Copia de seguridad creada! Aquí está su identificación: `'+backupData.id+'`Usa `'+config.prefix+'load-backup '+backupData.id+'` para cargar la copia de seguridad en otro servidor!');

    }).catch(() => {

        return message.channel.send(':x: Ocurrió un error, ¡verifique si el bot es administrador!');

    });

};
