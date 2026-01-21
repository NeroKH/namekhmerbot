const { Scenes, Markup } = require('telegraf');
const { generateNames } = require('../utils/nameGenerator');
const locales = require('../utils/locales');

const wizard = new Scenes.WizardScene(
    'name-selection-wizard',
    // Step 0: Choose Language
    (ctx) => {
        ctx.reply("Please choose your language / សូមជ្រើសរើសភាសា:",
            Markup.keyboard([['🇺🇸 English', '🇰🇭 ភាសាខ្មែរ']]).oneTime().resize()
        );
        return ctx.wizard.next();
    },
    // Step 1: Welcome & Father Name
    (ctx) => {
        let lang = 'en';
        // Check user input for language
        if (ctx.message.text && ctx.message.text.includes('ខ្មែរ')) {
            lang = 'km';
        }
        ctx.wizard.state.lang = lang;
        const t = locales[lang];

        ctx.reply(`${t.welcome}\n\n${t.ask_father}`);
        return ctx.wizard.next();
    },
    // Step 2: Mother Name
    (ctx) => {
        ctx.wizard.state.fatherName = ctx.message.text;
        const t = locales[ctx.wizard.state.lang];
        ctx.reply(t.ask_mother);
        return ctx.wizard.next();
    },
    // Step 3: D.O.B
    (ctx) => {
        ctx.wizard.state.motherName = ctx.message.text;
        const t = locales[ctx.wizard.state.lang];
        ctx.reply(t.ask_dob,
            Markup.keyboard([[t.btn_today]]).oneTime().resize()
        );
        return ctx.wizard.next();
    },
    // Step 4: Time
    (ctx) => {
        const t = locales[ctx.wizard.state.lang];
        // Handle "Today" for DOB
        let dob = ctx.message.text;
        if (dob === t.btn_today || dob.toLowerCase() === 'today') {
            const today = new Date();
            dob = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        }
        ctx.wizard.state.dob = dob;

        ctx.reply(t.ask_time);
        return ctx.wizard.next();
    },
    // Step 5: Sex
    (ctx) => {
        ctx.wizard.state.time = ctx.message.text;
        const t = locales[ctx.wizard.state.lang];
        ctx.reply(t.ask_sex,
            Markup.keyboard([[t.btn_male, t.btn_female]]).oneTime().resize()
        );
        return ctx.wizard.next();
    },
    // Step 6: Remarks
    (ctx) => {
        const t = locales[ctx.wizard.state.lang];
        let sexInput = ctx.message.text;
        // Map translated sex back to standard 'male'/'female' for logic
        let sex = 'male';
        if (sexInput === t.btn_female || sexInput.toLowerCase() === 'female') sex = 'female';

        ctx.wizard.state.sex = sex; // Store normalized for logic
        ctx.wizard.state.sexDisplay = sexInput; // Store display value

        ctx.reply(t.ask_remarks,
            Markup.keyboard([[t.btn_none]]).oneTime().resize()
        );
        return ctx.wizard.next();
    },
    // Step 7: Completion
    (ctx) => {
        const t = locales[ctx.wizard.state.lang];
        const remarksInput = ctx.message.text;
        ctx.wizard.state.remarks = (remarksInput === t.btn_none || remarksInput === 'None') ? '' : remarksInput;

        const data = ctx.wizard.state;
        const suggestions = generateNames({ ...data, sex: data.sex }); // Pass normalized sex

        let message = `${t.result_title}\n\n`;
        message += `${t.father}: ${data.fatherName}\n`;
        message += `${t.mother}: ${data.motherName}\n`;
        message += `${t.sex}: ${data.sexDisplay}\n`;
        message += `${t.dob}: ${data.dob} at ${data.time}\n`;
        message += `${t.remarks}: ${data.remarks}\n`;
        message += `-----------------------------------\n\n`;
        message += `${t.suggested}\n\n`;

        suggestions.forEach((s, i) => {
            message += `${i + 1}. **${s.name}**\n`;
            message += `   ${t.meaning}: _${s.meaning}_\n`;
            message += `   ${t.lucky_day}: ${s.day}\n\n`;
        });

        ctx.replyWithMarkdown(message);
        return ctx.scene.leave();
    }
);

module.exports = wizard;
