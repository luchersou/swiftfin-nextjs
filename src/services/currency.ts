import { Currency } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const FALLBACK_RATES: Record<Currency, Record<Currency, number>> = {
  USD: {
    USD: 1,
    EUR: 0.92,
  },
  EUR: {
    USD: 1.09,
    EUR: 1,
  },
};

async function fetchExchangeRateFromAPI(
  from: Currency,
  to: Currency
): Promise<number> {
  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error(`Error fetching exchange rate from API:`, error);
    throw error;
  }
}

export async function getExchangeRate(
  from: Currency,
  to: Currency
): Promise<number> {
  if (from === to) return 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  
  try {
    const cached = await prisma.exchangeRate.findFirst({
      where: {
        from,
        to,
        date: { gte: today },
      },
      orderBy: { date: "desc" },
    });

    if (cached) {
      return cached.rate.toNumber();
    }

    const rate = await fetchExchangeRateFromAPI(from, to);

    await prisma.exchangeRate.create({
      data: { from, to, rate, date: new Date() },
    });

    return rate;
  } catch (error) {
    console.error(`Using fallback rate:`, error);
    return FALLBACK_RATES[from][to];
  }
}

export async function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): Promise<number> {
  if (from === to) return amount;
  const rate = await getExchangeRate(from, to);
  return amount * rate;
}