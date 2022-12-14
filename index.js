const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//What happens when bot goes online
client.once(Events.ClientReady, () => {
	console.log('Ready!');

	// const channel = client.channels.cache.get('1046542619678883901');
	// channel.send(`Bot online`);
	client.user.setActivity(`in ${client.guilds.cache.size} servers`);
	
});

//What happens when an interaction is made
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Updates bot's activity
client.on(Events.GuildCreate, () => {
	client.user.setActivity({ content: `in ${client.guilds.cache.size} servers` })
});
client.on(Events.GuildDelete, () => {
	client.user.setActivity({ content: `in ${client.guilds.cache.size} servers` })
});

client.login(token);