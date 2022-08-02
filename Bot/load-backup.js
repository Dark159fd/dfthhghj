const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Debe tener permisos de administración de mensajes para crear una copia de seguridad en este servidor.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send('Advertencia: Se borrarán todos los canales, funciones y configuraciones del servidor. ¿Desea continuar? Enviar `-confirm` o `cancel`!');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('¡Copia de seguridad cargada con éxito!');
            
                }).catch((err) => {
            
                    if (err === 'No se encontró ninguna copia de seguridad')
                        return message.channel.send(':x: No se encontró una copia de seguridad para la ID '+backupID+'!');
                    else
                        return message.author.send(':x: Ocurrió un error: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(':x: Cancelado.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: ¡Comando agotado! Por favor, intenta de nuevo.');
        })

    }).catch(() => {
        return message.channel.send(':x: No se encontró copia de seguridad para ID '+backupID+'!');
    });

};
