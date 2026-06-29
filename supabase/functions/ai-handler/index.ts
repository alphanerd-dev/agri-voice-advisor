import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

interface AIRequest {
  type: "symptoms" | "advisory";
  text: string;
  image?: string; // base64 encoded image
  language: string;
}

interface AIResponse {
  title: string;
  confidence: number;
  cause: string;
  action: string;
  additional_info?: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  "en-US": "English",
  "ha-NG": "Hausa",
  "yo-NG": "Yoruba",
  "ig-NG": "Igbo",
};

function getSymptomPrompt(text: string, language: string): string {
  const langName = LANGUAGE_NAMES[language] || "English";
  return `You are an expert agricultural pathologist advising smallholder farmers in Nigeria. A farmer has described the following symptom in ${langName}:

"${text}"

Analyze this and respond in ${langName} with a JSON object containing:
- "title": The disease or pest name (be specific)
- "confidence": A number 0-100 indicating how confident you are
- "cause": The likely root cause in 1-2 sentences
- "action": Step-by-step treatment advice (3-5 actionable steps)
- "additional_info": Any prevention tips or seasonal advice

Common Nigerian crop issues include: Fall Armyworm (maize), Stem Borers, Leaf Blight, Nitrogen Deficiency, Cassava Mosaic Disease, Striga weed, Aphids, Whiteflies, Root Rot, Powdery Mildew.

Respond ONLY with valid JSON, no markdown.`;
}

function getAdvisoryPrompt(text: string, language: string): string {
  const langName = LANGUAGE_NAMES[language] || "English";
  return `You are an expert agricultural advisor for smallholder farmers in Nigeria. A farmer is asking about:

"${text}"

Provide practical, actionable advice in ${langName} as a JSON object containing:
- "title": A clear title for the advisory topic
- "confidence": A number 0-100 for relevance
- "cause": Why this practice matters (context)
- "action": Step-by-step implementation guide (5-7 steps)
- "additional_info": Expected outcomes, timeline, cost considerations

Focus on sustainable, affordable methods suitable for Nigerian smallholder farmers. Include organic and conventional options.

Respond ONLY with valid JSON, no markdown.`;
}

async function callOpenAI(prompt: string, imageBase64?: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const messages: any[] = [
    {
      role: "system",
      content: "You are a helpful agricultural AI assistant for Nigerian farmers. Always respond with valid JSON only."
    },
  ];

  if (imageBase64) {
    // Vision request with image
    messages.push({
      role: "user",
      content: [
        { type: "text", text: prompt },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
            detail: "low"
          }
        }
      ]
    });
  } else {
    messages.push({ role: "user", content: prompt });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: imageBase64 ? "gpt-4o" : "gpt-4o-mini",
      messages,
      temperature: 0.3,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function getFallbackResponse(type: string, text: string, language: string): AIResponse {
  const isHausa = language === "ha-NG";
  const isYoruba = language === "yo-NG";
  const isIgbo = language === "ig-NG";

  if (type === "symptoms") {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("worm") || lowerText.includes("tsuts") || lowerText.includes("ramuka") || lowerText.includes("kòkòrò") || lowerText.includes("ihò") || lowerText.includes("ahụhụ") || lowerText.includes("oghere")) {
      return {
        title: isHausa ? "Tsutsotsi na Faɗi" : isYoruba ? "Kòkòrò Ológun" : isIgbo ? "Ikpurukpu Ọdịda" : "Fall Armyworm",
        confidence: 89,
        cause: isHausa ? "Kwari ne na Spodoptera frugiperda suka kai hari." : isYoruba ? "Àjàkálẹ̀ àrùn Spodoptera frugiperda." : isIgbo ? "Ọrịa ikpurukpu Spodoptera frugiperda." : "Spodoptera frugiperda infestation affecting maize crops.",
        action: isHausa ? "1. Yi amfani da man Neem. 2. Shafa Bacillus thuringiensis. 3. Cire ganyen da suka lalace. 4. Duba filin kowace rana." : isYoruba ? "1. Lo epo Neem. 2. Lo Bacillus thuringiensis. 3. Yọ ewe ti o bàjẹ́. 4. Ṣàyẹ̀wò oko lojoojumọ́." : isIgbo ? "1. Jiri mmanụ Neem. 2. Tinye Bacillus thuringiensis. 3. Wepụ akwụkwọ mebiri emebi. 4. Lelee ubochi ọ bụla." : "1. Apply Neem oil solution. 2. Use Bacillus thuringiensis (Bt). 3. Remove affected leaves. 4. Monitor field daily. 5. Consider pheromone traps.",
        additional_info: isHausa ? "Kariya: Shuka irin da ke jure cututtuka." : isYoruba ? "Ìdènà: Gbin irugbin ti o le koju àrùn." : isIgbo ? "Mgbochi: Kụọ mkpụrụ na-eguzogide ọrịa." : "Prevention: Plant resistant varieties and practice crop rotation."
      };
    }
    
    if (lowerText.includes("yellow") || lowerText.includes("rawaya") || lowerText.includes("ganye") || lowerText.includes("pupa") || lowerText.includes("ewe") || lowerText.includes("edo") || lowerText.includes("akwụkwọ")) {
      return {
        title: isHausa ? "Rashin Sinadarin Nitrogen" : isYoruba ? "Àìní Naitrojin" : isIgbo ? "Ụkọ Naitrojin" : "Nitrogen Deficiency",
        confidence: 85,
        cause: isHausa ? "Ƙasar ba ta da isasshen sinadarai." : isYoruba ? "Ilẹ̀ kò ní àwọn ohun alumọni to." : isIgbo ? "Ala enweghị nri zuru oke." : "Soil lacks essential nutrients, particularly nitrogen.",
        action: isHausa ? "1. Yi amfani da taki NPK 15-15-15. 2. Ƙara taki na halitta. 3. Shuka legumes don inganta ƙasa. 4. Ban ruwa akai-akai." : isYoruba ? "1. Lo NPK 15-15-15. 2. Fi ohun alumọni kun. 3. Gbin legumes. 4. Fi omi ṣan déédé." : isIgbo ? "1. Jiri NPK 15-15-15. 2. Tinye fatịlaịza organic. 3. Kụọ legumes. 4. Na-agba mmiri oge niile." : "1. Apply NPK 15-15-15 fertilizer. 2. Add organic manure/compost. 3. Plant legumes for nitrogen fixation. 4. Water regularly.",
        additional_info: isHausa ? "Lura: Ganye ƙasa suna farawa da rawaya." : isYoruba ? "Àkíyèsí: Ewe isalẹ lo kọkọ n di pupa." : isIgbo ? "Mara: Akwụkwọ ndị dị n'ala na-ebu ụzọ acha." : "Note: Lower leaves yellow first. Test soil pH (ideal: 6.0-7.0)."
      };
    }

    return {
      title: isHausa ? "Batatin Amfanin Gona" : isYoruba ? "Ìṣòro Gbogbogbòò Iṣẹ́ Ọ̀gbìn" : isIgbo ? "Nsogbu Ihe Ọkụkụ" : "General Crop Stress",
      confidence: 60,
      cause: isHausa ? "Yanayin muhalli ko cuta ta farko." : isYoruba ? "Àyíká tàbí àrùn ìbẹ̀rẹ̀." : isIgbo ? "Ọnọdụ gburugburu ma ọ bụ ọrịa mmalite." : "Environmental factors or early-stage issue.",
      action: isHausa ? "1. Duba filin kowace rana. 2. Cire duka. 3. Ban ruwa. 4. Yi amfani da taki." : isYoruba ? "1. Ṣàyẹ̀wò oko lojoojumọ́. 2. Yọ kòòrò. 3. Fi omi ṣan. 4. Lo ohun alumọni." : isIgbo ? "1. Lelee ubochi ọ bụla. 2. Wepụ ahịhịa. 3. Gbaa mmiri. 4. Jiri fatịlaịza." : "1. Monitor daily. 2. Clear weeds. 3. Water adequately. 4. Apply balanced fertilizer.",
      additional_info: isHausa ? "Shawara: Ƙara bayani don ingantaccen bincike." : isYoruba ? "Ìmọ̀ràn: Fí ọ̀rọ̀ kún un fún àyẹ̀wò tó dára." : isIgbo ? "Ndụmọdụ: Tinye nkọwa maka nyocha ka mma." : "Tip: Provide more details for a more accurate diagnosis."
    };
  }

  // Advisory fallback
  return {
    title: isHausa ? "Shawarar Noma Mai Kyau" : isYoruba ? "Ìmọ̀ràn Iṣẹ́ Ọ̀gbìn" : isIgbo ? "Ndụmọdụ Ọrụ Ugbo" : "Best Farming Practices Advisory",
    confidence: 80,
    cause: isHausa ? "Amfani da hanyoyin noma masu kyau yana ƙara yawan amfanin gona." : isYoruba ? "Lílo àwọn ọ̀nà iṣẹ́ ọ̀gbìn tó dára máa ń mú kí èrè kò pọ̀ sí." : isIgbo ? "Iji ụzọ ọrụ ugbo dị mma na-eme ka ihe ọkụkụ dị ọtụtụ." : "Good agricultural practices increase yield and sustainability.",
    action: isHausa ? "1. Juya amfanin gona. 2. Yi amfani da taki na halitta. 3. Kiyaye ƙasa. 4. Shuka da lokaci. 5. Yi amfani da iri mai kyau." : isYoruba ? "1. Yí igbin padà. 2. Lo ohun alumọni. 3. Tọ́jú ilẹ̀. 4. Gbin ní àkókò. 5. Lo irugbin dídára." : isIgbo ? "1. Tụgharịa ihe ọkụkụ. 2. Jiri fatịlaịza organic. 3. Chekwaa ala. 4. Kụọ n'oge. 5. Jiri mkpụrụ dị mma." : "1. Practice crop rotation. 2. Use organic compost. 3. Conserve soil moisture. 4. Plant at the right time. 5. Use quality seeds.",
    additional_info: isHausa ? "Lura: Koyaushe gwada ƙasar kafin shuka." : isYoruba ? "Àkíyèsí: Má ṣe gbàgbé láti ṣàyẹ̀wò ilẹ̀ ṣáájú gbingbin." : isIgbo ? "Mara: Echefula inyocha ala tupu ịkụ ihe." : "Note: Always test soil before planting season."
  };
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const body: AIRequest = await req.json();
    const { type, text, image, language } = body;

    if (!text || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: type, text" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let aiResult: AIResponse;
    let source = "ai";

    try {
      const prompt = type === "symptoms" 
        ? getSymptomPrompt(text, language) 
        : getAdvisoryPrompt(text, language);
      
      const rawResponse = await callOpenAI(prompt, image);
      
      // Parse the JSON response, handling potential markdown code blocks
      let cleanedResponse = rawResponse.trim();
      if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.replace(/^```[json]?
?/, "").replace(/
?```$/, "");
      }
      aiResult = JSON.parse(cleanedResponse);
    } catch (aiError) {
      // Fallback to rule-based response if OpenAI fails
      console.error("AI Error, using fallback:", aiError);
      aiResult = getFallbackResponse(type, text, language);
      source = "fallback";
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: aiResult,
        source,
        language,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
