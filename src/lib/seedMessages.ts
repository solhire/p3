import prisma from './prisma';

// Default messages
const defaultMessages = {
  homepage: {
    pumpFunLink: "PUMP.FUN/PROFILE/INAPERFECTWORLD",
    caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump"
  }
};

export async function seedMessages() {
  console.log('Checking if initial messages need to be seeded...');
  
  // Check if we have any homepage messages
  const existingMessages = await prisma.siteMessage.findMany({
    where: { page: 'homepage' }
  });
  
  // If no messages exist, seed the database
  if (existingMessages.length === 0) {
    console.log('No messages found. Seeding initial data...');
    
    const messagesToCreate = [];
    
    // Prepare all messages for insertion
    for (const [page, messages] of Object.entries(defaultMessages)) {
      for (const [key, value] of Object.entries(messages)) {
        messagesToCreate.push(
          prisma.siteMessage.create({
            data: {
              page,
              key,
              value
            }
          })
        );
      }
    }
    
    // Execute all create operations in a transaction
    await prisma.$transaction(messagesToCreate);
    console.log('Seeded initial messages successfully!');
  } else {
    console.log(`Found ${existingMessages.length} existing messages. No need to seed.`);
  }
}

export async function getAllMessages() {
  // Fetch all messages and format them into the expected structure
  const messages = await prisma.siteMessage.findMany();
  
  // Transform flat messages into nested structure
  const formattedMessages: Record<string, Record<string, string>> = {};
  
  for (const message of messages) {
    if (!formattedMessages[message.page]) {
      formattedMessages[message.page] = {};
    }
    
    formattedMessages[message.page][message.key] = message.value;
  }
  
  return formattedMessages;
} 