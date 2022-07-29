import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMoodData(data) {
  const { score } = data;
  if (Number.isNaN(score) || score < -5 || score > 5) {
    throw Error('Invalid score');
  }
  await prisma.mooddata.create({
    data: {
      date: Date.now(),
      score: parseInt(score, 10),
    },
  });
}

async function addQuoteData(data) {
  const { quote, citation } = data;
  await prisma.quotes.create({
    data: {
      quote,
      citation,
    },
  });
}

export default async function addDataSafe(type, data, res) {
  try {
    switch (type) {
      case 'mood': {
        await addMoodData(data);
        break;
      }
      case 'quote': {
        await addQuoteData(data);
        break;
      }
      default: {
        res.end('Unknown type. Avalible types: mood, quote');
        return;
      }
    }
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    res.end(e.toString());
    return;
  }
  await prisma.$disconnect();
  res.end('Recorded');
}
