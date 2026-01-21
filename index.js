require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const wizardScene = require('./scenes/wizard');

if (!process.env.BOT_TOKEN) {
    console.error('Error: BOT_TOKEN is missing in .env file.');
    process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([wizardScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('name-selection-wizard'));

bot.launch().then(() => {
    console.log('Bot is running...');
}).catch((err) => {
    console.error('Failed to launch bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
