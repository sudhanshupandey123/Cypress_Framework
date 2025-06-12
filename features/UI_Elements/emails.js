// Cypress/Node.js equivalent for verifying email content using IMAP
// Requires: npm install imap-simple mailparser
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const fs = require('fs');

// Credentials and config can be loaded from cypress.env.json
const config = require('../../cypress.env.json');

const imapConfig = (profile) => ({
  imap: {
    user: config.APPLICATION_USERNAME[profile],
    password: config[profile + '_USER_GMAIL_TOKEN'],
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 10000,
  },
});

async function verifyEmail(profile, textToVerify) {
  const connection = await imaps.connect(imapConfig(profile));
  await connection.openBox('INBOX');
  const searchCriteria = ['ALL'];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };
  const messages = await connection.search(searchCriteria, fetchOptions);
  // Check the most recent 3 emails
  for (let i = messages.length - 1; i >= Math.max(0, messages.length - 3); i--) {
    const message = messages[i];
    const all = message.parts.find(part => part.which === 'TEXT');
    const id = message.attributes.uid;
    const raw = await connection.getPartData(message, all);
    const parsed = await simpleParser(raw);
    if (parsed.subject && parsed.subject.includes(textToVerify)) {
      console.log(`Message Number: ${id}`);
      console.log(`From: ${parsed.from.text}`);
      console.log(`To: ${parsed.to.text}`);
      console.log(`Date: ${parsed.date}`);
      console.log(`Subject: ${parsed.subject}`);
      console.log('Content:');
      console.log(parsed.text);
      if (parsed.attachments && parsed.attachments.length > 0) {
        parsed.attachments.forEach(att => {
          console.log(`Attachment Name: ${att.filename}`);
        });
      }
      await connection.end();
      return;
    }
  }
  await connection.end();
  throw new Error(`Couldn't find ${textToVerify} in the emails`);
}

module.exports = { verifyEmail };
