import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Current values to set in the database
const currentMessages = {
  homepage: {
    pumpFunLink: "PUMP.FUN/PROFILE/INAPERFECTWORLD",
    caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump"
  }
};

export async function GET() {
  try {
    try {
      // Prepare all messages for insertion/update
      const updateOperations = [];
      
      for (const [page, messages] of Object.entries(currentMessages)) {
        for (const [key, value] of Object.entries(messages)) {
          updateOperations.push(
            prisma.siteMessage.upsert({
              where: {
                page_key: {
                  page,
                  key
                }
              },
              update: {
                value: String(value)
              },
              create: {
                page,
                key,
                value: String(value)
              }
            })
          );
        }
      }
      
      // Execute all database operations
      await prisma.$transaction(updateOperations);
      
      return NextResponse.json({ 
        success: true, 
        message: "Database values have been reset to current values",
        count: updateOperations.length
      });
    } catch (dbError) {
      console.error('Database error during reset:', dbError);
      
      // Return a success message with fallback indication
      return NextResponse.json({ 
        success: true, 
        message: "Using fallback values - database not available",
        source: 'fallback'
      });
    }
  } catch (error) {
    console.error('Error resetting messages:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
} 