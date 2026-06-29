import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface MarketRequest {
  language?: string;
}

interface PriceEntry {
  crop: string;
  pricePerBag: number;
  trend: "up" | "down" | "stable";
  change: number; // percentage
}

interface HubData {
  hub: string;
  region: string;
  prices: PriceEntry[];
  lastUpdated: string;
}

// Realistic base prices in NGN per 100kg bag (2024 estimates)
const BASE_PRICES: Record<string, number> = {
  maize: 45000,
  millet: 42000,
  sorghum: 40000,
  groundnut: 65000,
  tomatoes: 35000,
};

// Hub multipliers based on distance from production zones and demand
const HUB_DATA: Record<string, { multiplier: number; region: string }> = {
  "Kano": { multiplier: 0.95, region: "North West" },
  "Kaduna": { multiplier: 0.98, region: "North West" },
  "Minna": { multiplier: 1.02, region: "North Central" },
  "Sokoto": { multiplier: 0.93, region: "North West" },
  "Lagos": { multiplier: 1.25, region: "South West" },
  "Ibadan": { multiplier: 1.10, region: "South West" },
  "Enugu": { multiplier: 1.15, region: "South East" },
  "Onitsha": { multiplier: 1.18, region: "South East" },
};

// Crop-specific adjustments (transport cost sensitivity)
const CROP_ADJUSTMENTS: Record<string, number> = {
  maize: 1.0,
  millet: 0.98,
  sorghum: 0.97,
  groundnut: 1.05,
  tomatoes: 1.35, // Highly perishable, higher transport cost impact
};

// Simulated daily price fluctuations (deterministic based on date)
function getDailyVariation(hub: string, crop: string): number {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const seed = (hub.length * 7 + crop.length * 13 + dayOfYear) % 20;
  return (seed - 10) / 100; // -10% to +10% variation
}

function getTrend(hub: string, crop: string): { trend: "up" | "down" | "stable"; change: number } {
  const variation = getDailyVariation(hub, crop);
  if (variation > 0.03) return { trend: "up", change: Math.round(variation * 100) };
  if (variation < -0.03) return { trend: "down", change: Math.round(Math.abs(variation) * 100) };
  return { trend: "stable", change: Math.round(Math.abs(variation) * 100) };
}

function generateMarketData(): HubData[] {
  const today = new Date().toISOString().split("T")[0];
  
  return Object.entries(HUB_DATA).map(([hub, data]) => {
    const prices: PriceEntry[] = Object.entries(BASE_PRICES).map(([crop, basePrice]) => {
      const hubMultiplier = data.multiplier;
      const cropAdjustment = CROP_ADJUSTMENTS[crop];
      const dailyVariation = 1 + getDailyVariation(hub, crop);
      
      const finalPrice = Math.round(
        basePrice * hubMultiplier * cropAdjustment * dailyVariation
      );
      
      const { trend, change } = getTrend(hub, crop);
      
      return {
        crop,
        pricePerBag: finalPrice,
        trend,
        change,
      };
    });

    return {
      hub,
      region: data.region,
      prices,
      lastUpdated: today,
    };
  });
}

const TRANSLATIONS: Record<string, Record<string, string>> = {
  "en-US": {
    maize: "Maize",
    millet: "Millet",
    sorghum: "Sorghum",
    groundnut: "Groundnut",
    tomatoes: "Tomatoes",
    estimateNote: "All prices are estimates per 100kg bag in Nigerian Naira (NGN).",
    currency: "NGN",
  },
  "ha-NG": {
    maize: "Masara",
    millet: "Gero",
    sorghum: "Dawa",
    groundnut: "Gyada",
    tomatoes: "Tumatir",
    estimateNote: "Dukkan farashi kiyasi ne na jaka 100kg a Naira na Najeriya.",
    currency: "NGN",
  },
  "yo-NG": {
    maize: "Àgbàdo",
    millet: "Ọka Baba",
    sorghum: "Gero",
    groundnut: "Ẹpa",
    tomatoes: "Tomati",
    estimateNote: "Gbogbo iye owo jẹ́ kiyesi fun bago 100kg ni Naira Naijiria.",
    currency: "NGN",
  },
  "ig-NG": {
    maize: "Ọka",
    millet: "Ókà Mìlèt",
    sorghum: "Gero",
    groundnut: "Anwụrụ",
    tomatoes: "Tomato",
    estimateNote: "Ọnụ ahịa niile bụ atụmatụ maka akpa 100kg na Naira Naịjirịa.",
    currency: "NGN",
  },
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    let language = "en-US";
    
    if (req.method === "POST") {
      const body: MarketRequest = await req.json();
      language = body.language || "en-US";
    } else {
      const url = new URL(req.url);
      language = url.searchParams.get("language") || "en-US";
    }

    const marketData = generateMarketData();
    const translations = TRANSLATIONS[language] || TRANSLATIONS["en-US"];

    // Generate audio summary
    const kanoMaize = marketData.find(h => h.hub === "Kano")?.prices.find(p => p.crop === "maize")?.pricePerBag || 0;
    const lagosTomatoes = marketData.find(h => h.hub === "Lagos")?.prices.find(p => p.crop === "tomatoes")?.pricePerBag || 0;

    let audioSummary = "";
    if (language === "ha-NG") {
      audioSummary = `Farashin hatsi a Kano: ${translations.maize} ita ce ${kanoMaize.toLocaleString()} Naira. A Legas, ${translations.tomatoes} kiyasi ne na ${lagosTomatoes.toLocaleString()} Naira. ${translations.estimateNote}`;
    } else if (language === "yo-NG") {
      audioSummary = `Iye owo ni Kano: ${translations.maize} jẹ́ ${kanoMaize.toLocaleString()} Naira. Ni Lagos, ${translations.tomatoes} jẹ́ kiyesi ${lagosTomatoes.toLocaleString()} Naira. ${translations.estimateNote}`;
    } else if (language === "ig-NG") {
      audioSummary = `Ọnụ ahịa na Kano: ${translations.maize} bụ ${kanoMaize.toLocaleString()} Naira. Na Lagos, ${translations.tomatoes} bụ atụmatụ nke ${lagosTomatoes.toLocaleString()} Naira. ${translations.estimateNote}`;
    } else {
      audioSummary = `Market briefing: In Kano, Maize is estimated at ${kanoMaize.toLocaleString()} Naira per bag. In Lagos, Tomatoes are around ${lagosTomatoes.toLocaleString()} Naira. Note that all prices are estimates.`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: marketData,
        translations,
        audioSummary,
        lastUpdated: new Date().toISOString(),
        disclaimer: "Prices are estimates and may vary. Always confirm with local traders.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
