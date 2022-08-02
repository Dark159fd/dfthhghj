module.exports = (client) => {
    console.log(`Listo como ${client.user.tag} para servir en ${client.channels.cache.size} canales en ${client.guilds.cache.size} servidores, para un total de ${client.users.cache.size } usuarios.`);
};