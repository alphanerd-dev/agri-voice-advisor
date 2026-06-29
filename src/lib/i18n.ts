export type SupportedLanguage = 'en-US' | 'ha-NG' | 'yo-NG' | 'ig-NG';

export interface TranslationSchema {
  common: {
    back: string;
    loading: string;
    clear: string;
    tryAgain: string;
    history: string;
    noHistory: string;
    save: string;
    saved: string;
    listening: string;
    analyzing: string;
    yourInput: string;
    safetyTip: string;
    safetyTipText: string;
    viewGuide: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    micPrompt: string;
    openModule: string;
    modules: {
      symptoms: { title: string; desc: string };
      advisory: { title: string; desc: string };
      storage: { title: string; desc: string };
      market: { title: string; desc: string };
    };
  };
  symptoms: {
    title: string;
    subtitle: string;
    placeholder: string;
    example: string;
    resultTitle: string;
    confidence: string;
    rootCause: string;
    action: string;
  };
  advisory: {
    title: string;
    subtitle: string;
    selectProcedure: string;
    stepByStep: string;
    stepsCount: string;
  };
  storage: {
    title: string;
    subtitle: string;
    tabs: { drying: string; hermetic: string };
    moistureLevel: string;
    moisturePrompt: string;
    boneDry: string;
    ideal: string;
    fresh: string;
    status: string;
    advice: { safe: string; risky: string; unsafe: string };
    tips: { air: { title: string; desc: string }; sun: { title: string; desc: string } };
    hermeticSteps: { title: string; desc: string }[];
    hermeticTitle: string;
    hermeticDesc: string;
  };
  market: {
    title: string;
    subtitle: string;
    digest: string;
    briefing: string;
    briefingDesc: string;
    perBag: string;
    estimateNote: string;
    crops: {
      maize: string;
      millet: string;
      sorghum: string;
      groundnut: string;
      tomatoes: string;
    };
    hubs: string[];
  };
}

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  "en-US": {
    common: {
      back: "Back to Dashboard",
      loading: "Loading...",
      clear: "Clear",
      tryAgain: "Try Again",
      history: "Recent History",
      noHistory: "No history found.",
      save: "Save",
      saved: "Saved",
      listening: "Listening...",
      analyzing: "Analyzing...",
      yourInput: "Your Input",
      safetyTip: "Safety Tip",
      safetyTipText: "Always wear protective gear and keep children away from treatment areas.",
      viewGuide: "View Full Guide",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
    },
    dashboard: {
      title: "VoiceHarvest",
      subtitle: "AI-Powered Agricultural Advisory",
      micPrompt: "Tap to speak to the advisor",
      openModule: "Open Module",
      modules: {
        symptoms: { title: "Symptom Checker", desc: "Identify crop pests and diseases" },
        advisory: { title: "Treatment Advisory", desc: "Step-by-step treatment guides" },
        storage: { title: "Smart Storage", desc: "Moisture levels & hermetic storage" },
        market: { title: "Market Prices", desc: "Real-time grain price monitoring" },
      },
    },
    symptoms: {
      title: "Symptom Checker",
      subtitle: "Describe what's wrong with your crop",
      placeholder: "Press the microphone button below and describe the symptoms",
      example: 'Example: "I see small holes and caterpillars on my maize leaves"',
      resultTitle: "AI Diagnosis Result",
      confidence: "Confidence",
      rootCause: "Likely Root Cause",
      action: "Recommended Action",
    },
    advisory: {
      title: "Treatment Advisory",
      subtitle: "Audio-guided procedures for crop protection",
      selectProcedure: "Select a Procedure",
      stepByStep: "Step-by-Step Guide",
      stepsCount: "Steps",
    },
    storage: {
      title: "Smart Storage",
      subtitle: "Manage grain drying and hermetic storage",
      tabs: { drying: "Drying Calculator", hermetic: "Hermetic Guide" },
      moistureLevel: "Maize Moisture Level",
      moisturePrompt: "Use the slider or tell us your moisture reading",
      boneDry: "8% (Bone Dry)",
      ideal: "13% (Ideal)",
      fresh: "25% (Freshly Harvested)",
      status: "Status",
      advice: { 
        safe: "Grain is safe for storage.", 
        risky: "Needs 1-2 more days of sun drying.", 
        unsafe: "High risk of mold. Continue drying immediately." 
      },
      tips: {
        air: { title: "Air Drying", desc: "Spread grain on a clean tarpaulin." },
        sun: { title: "Sun Intensity", desc: "Dry between 10 AM and 4 PM." }
      },
      hermeticSteps: [
        { title: "Check Moisture", desc: "Grain must be below 13% or it will rot." },
        { title: "Remove Air", desc: "Oxygen allows pests to survive. Squeeze it all out." },
        { title: "Triple Layer", desc: "Ensure all three liners are tied separately." },
        { title: "Cool Place", desc: "Store away from direct sunlight and rats." }
      ],
      hermeticTitle: "How to use Hermetic Bags",
      hermeticDesc: "Hermetic bags are the best way to keep your grain safe without using chemicals.",
    },
    market: {
      title: "Market Prices",
      subtitle: "Real-time local grain price monitoring",
      digest: "Market Audio Digest",
      briefing: "Daily Price Briefing",
      briefingDesc: "Listen to the latest market trends and price changes in your region.",
      perBag: "per bag",
      estimateNote: "Note: All prices are estimates.",
      crops: {
        maize: "Maize",
        millet: "Millet",
        sorghum: "Sorghum",
        groundnut: "Groundnut",
        tomatoes: "Tomatoes",
      },
      hubs: ["Kano", "Kaduna", "Minna", "Sokoto", "Lagos", "Ibadan", "Enugu", "Onitsha"],
    },
  },
  "ha-NG": {
    common: {
      back: "Koma zuwa Dashboard",
      loading: "Ana lodawa...",
      clear: "Share",
      tryAgain: "Sake gwadawa",
      history: "Tarihin Kwanan Nan",
      noHistory: "Ba a sami tarihin ba.",
      save: "Ajiye",
      saved: "An adana",
      listening: "Ana sauraro...",
      analyzing: "Ana nazari...",
      yourInput: "Abin da kace",
      safetyTip: "Shawarar Tsaro",
      safetyTipText: "A koyaushe a sanya kayan kariya kuma a nisantar da yara daga wuraren da ake magani.",
      viewGuide: "Duba Cikakken Jagora",
      play: "Kunna",
      pause: "Dakata",
      mute: "Kashe sauti",
      unmute: "Kunna sauti",
    },
    dashboard: {
      title: "VoiceHarvest",
      subtitle: "Shawarwarin Aikin Gona na AI",
      micPrompt: "Taba don magana da mai ba da shawara",
      openModule: "Bude Sashen",
      modules: {
        symptoms: { title: "Duban Alamomi", desc: "Gane kwari da cututtukan amfanin gona" },
        advisory: { title: "Shawarar Magani", desc: "Jagorar magani mataki-mataki" },
        storage: { title: "Ajiya Mai Wayo", desc: "Matakan danshi & ajiyar hermetic" },
        market: { title: "Farashin Kasuwa", desc: "Kula da farashin hatsi kai tsaye" },
      },
    },
    symptoms: {
      title: "Duban Alamomi",
      subtitle: "Bayyana abin da ke damun amfanin gonarka",
      placeholder: "Danna maballin makirufo da ke ƙasa sannan ka bayyana alamomin",
      example: 'Misali: "Ina ganin kananan ramuka da tsutsotsi a ganyen masara ta"',
      resultTitle: "Sakamakon Binciken AI",
      confidence: "Amincewa",
      rootCause: "Dalilin Da Aka Fi Tsammani",
      action: "Matakin Da Aka Shawarta",
    },
    advisory: {
      title: "Shawarar Magani",
      subtitle: "Hanyoyin kiyaye amfanin gona ta hanyar sauti",
      selectProcedure: "Zaɓi Hanyar Magani",
      stepByStep: "Jagora Mataki-Mataki",
      stepsCount: "Matakai",
    },
    storage: {
      title: "Ajiya Mai Wayo",
      subtitle: "Sarrafa bushewar hatsi da ajiyar hermetic",
      tabs: { drying: "Kalkuletan Bushewa", hermetic: "Jagorar Hermetic" },
      moistureLevel: "Matakin Danshi na Masara",
      moisturePrompt: "Yi amfani da mai zamewa ko ka gaya mana danshin da ka gani",
      boneDry: "8% (Bushe sosai)",
      ideal: "13% (Mafi kyau)",
      fresh: "25% (Sabon Girbi)",
      status: "Matsayi",
      advice: { 
        safe: "Hatsi yana da kariya don ajiya.", 
        risky: "Yana buƙatar ƙarin kwanaki 1-2 na bushewa a rana.", 
        unsafe: "Babban hadarin mold. Ci gaba da bushewa nan take." 
      },
      tips: {
        air: { title: "Bushewar Iska", desc: "Shimfida hatsi a kan shimfida mai tsafta." },
        sun: { title: "Zafin Rana", desc: "Bushewa tsakanin karfe 10 na safe zuwa karfe 4 na yamma." }
      },
      hermeticSteps: [
        { title: "Duba Danshi", desc: "Dole ne hatsi ya kasance kasa da 13% in ba haka ba zai rube." },
        { title: "Cire Iska", desc: "Iska tana ba da damar kwari su rayu. Matsa shi duka waje." },
        { title: "Layer Uku", desc: "Tabbatar an daure dukkan leda guda uku daban-daban." },
        { title: "Wuri Mai Sanyi", desc: "Ajiye nesa da hasken rana kai tsaye da beraye." }
      ],
      hermeticTitle: "Yadda ake amfani da buhunan Hermetic",
      hermeticDesc: "Buhunan hermetic sune hanya mafi kyau don kiyaye hatsi ba tare da amfani da sinadarai ba.",
    },
    market: {
      title: "Farashin Kasuwa",
      subtitle: "Kula da farashin hatsi na gida kai tsaye",
      digest: "Takaitaccen Sauti na Kasuwa",
      briefing: "Takaitaccen Farashin Kullum",
      briefingDesc: "Saurari sababbin canje-canjen farashin kasuwa a yankinka.",
      perBag: "kowane buhu",
      estimateNote: "Lura: Duk farashin kiyasi ne.",
      crops: {
        maize: "Masara",
        millet: "Hatsin gero",
        sorghum: "Dawa",
        groundnut: "Gyada",
        tomatoes: "Tumatur",
      },
      hubs: ["Kano", "Kaduna", "Minna", "Sokoto", "Lagos", "Ibadan", "Enugu", "Onitsha"],
    },
  },
  "yo-NG": {
    common: {
      back: "Pada si Dashboard",
      loading: "O n gbe e wọle...",
      clear: "Nu kuro",
      tryAgain: "Gbiyanju sii",
      history: "Itan Laipẹ",
      noHistory: "A ko ri itan kankan.",
      save: "Fipamọ",
      saved: "Ti fipamọ",
      listening: "O n gbọtan...",
      analyzing: "O n ṣe itupalẹ...",
      yourInput: "Ohun ti o sọ",
      safetyTip: "Imọrẹ fun Aabo",
      safetyTipText: "Nigbagbogbo wọ ohun elo aabo ki o pa awọn ọmọde mọ kuro ni awọn agbegbe itọju.",
      viewGuide: "Wo Gbogbo Itọsẹn",
      play: "Mu ṣiṣẹ",
      pause: "Duro na",
      mute: "Pa ohun",
      unmute: "Tan ohun",
    },
    dashboard: {
      title: "VoiceHarvest",
      subtitle: "Imọrẹ Iṣẹ-Agbe ti AI",
      micPrompt: "Tẹ ẹ lati sọrọ si oludamọrẹ",
      openModule: "Ṣii Module",
      modules: {
        symptoms: { title: "Ayẹwo Alamọ", desc: "Da awọn kọkọrọ ati aisan oko mọ" },
        advisory: { title: "Imọrẹ Itọju", desc: "Awọn itọsẹn itọju ni igbesẹ-n-igbesẹ" },
        storage: { title: "Ibi Ipamọ Ẹlẹrọ", desc: "Awọn ipele ẹrọn & ibi ipamọ hermetic" },
        market: { title: "Iye Ọja", desc: "Mimọ iye owo irugbin ni akoko gidi" },
      },
    },
    symptoms: {
      title: "Ayẹwo Alamọ",
      subtitle: "Ṣapejuwe ohun ti n ṣe oko rẹ",
      placeholder: "Tẹ bọtini gbohungbohun ni isalẹ ki o ṣapejuwe awọn alamọ naa",
      example: 'Apẹẹrẹ: "Mo ri awọn ihò kekere ati awọn kọkọrọ lori ewe agbado mi"',
      resultTitle: "Esi Ayẹwo AI",
      confidence: "Igbi-le",
      rootCause: "Ohun to le fa a",
      action: "Igbesẹ ti a gba niyanju",
    },
    advisory: {
      title: "Imọrẹ Itọju",
      subtitle: "Awọn ilana fun aabo oko nipasẹ ohun",
      selectProcedure: "Yan Ilana Kan",
      stepByStep: "Itọsẹn Igbesẹ-n-igbesẹ",
      stepsCount: "Igbesẹ",
    },
    storage: {
      title: "Ibi Ipamọ Ẹlẹrọ",
      subtitle: "Ṣakoso gbigbẹ irugbin ati ibi ipamọ hermetic",
      tabs: { drying: "Olẹrọ Gbigbẹ", hermetic: "Itọsẹn Hermetic" },
      moistureLevel: "Ipele Ẹrọn Agbado",
      moisturePrompt: "Lo ohun elo yiyẹ tabi sọ fun wa ni ipele ẹrọn rẹ",
      boneDry: "8% (Gbigbẹ Tapa)",
      ideal: "13% (Ti o dara ju)",
      fresh: "25% (Ti a ṣẹẹ ka)",
      status: "Ipo",
      advice: { 
        safe: "Irugbin jẹ ailewu fun ipamọ.", 
        risky: "Nilo awọn ọjọ 1-2 diẹ sii ti gbigbẹ oorun.", 
        unsafe: "Ewu nla ti mofun. Tẹsiwaju gbigbẹ lẹsẹkẹsẹ." 
      },
      tips: {
        air: { title: "Gbigbẹ Afẹfẹ", desc: "Tan irugbin lori tarpaulin mimọ." },
        sun: { title: "Kikankikan Oun", desc: "Gbẹ laarin 10 AM ati 4 PM." }
      },
      hermeticSteps: [
        { title: "Ṣayẹwo Ẹrọn", desc: "Irugbin gbọdọ wa ni isalẹ 13% bibẹkoh yoo bajẹ." },
        { title: "Yọ Afẹfẹ kuro", desc: "Afẹfẹ ngba awọn kọkọrọ laaye lati yira. Fun gbogbo rẹ jade." },
        { title: "Ipele Mẹta", desc: "Rii daju pe gbogbo awọn liners mẹta ti wa ni so lọtọ." },
        { title: "Ibi Itura", desc: "Tọju kuro lọdọ oorun taara ati awọn eku." }
      ],
      hermeticTitle: "Bii o ṣe le lo awọn baagi Hermetic",
      hermeticDesc: "Awọn baagi hermetic jẹ ọna ti o dara julọ lati tọyẹ irugbin rẹ laisi lilo awọn kẹmika.",
    },
    market: {
      title: "Iye Ọja",
      subtitle: "Mimọ iye owo irugbin agbegbe ni akoko gidi",
      digest: "Akopọ Ohun ti Ọja",
      briefing: "Iroyin Iye Owo Ojoojumọ",
      briefingDesc: "Gbọ awọn iyipada iye ọja tuntun ni agbegbe rẹ.",
      perBag: "fun baagi kan",
      estimateNote: "Akiyesi: Gbogbo iye owo jẹ kiyesi.",
      crops: {
        maize: "Agbado",
        millet: "Oru",
        sorghum: "Baba",
        groundnut: "Ẹpa",
        tomatoes: "Tomati",
      },
      hubs: ["Kano", "Kaduna", "Minna", "Sokoto", "Lagos", "Ibadan", "Enugu", "Onitsha"],
    },
  },
  "ig-NG": {
    common: {
      back: "Laghachi na Dashboard",
      loading: "Ọ na-ebu...",
      clear: "Hichaa",
      tryAgain: "Gbalịa ọzọ",
      history: "Akụkọ Ndị Dị nso",
      noHistory: "Ahụghị akụkọ ọ bụla.",
      save: "Chekwaa",
      saved: "Echekwara",
      listening: "Ọ na-ege ntị...",
      analyzing: "Ọ na-enyocha...",
      yourInput: "Ihe i kwuru",
      safetyTip: "Ndụmọdụ Nchekwa",
      safetyTipText: "Na-eyi uwe nchebe mgbe niile ma mee ka ụmụaka pụọ n'ebe a na-agwọ ọrịa.",
      viewGuide: "Lee Nduzi zuru ezu",
      play: "Kpọọ",
      pause: "Kwụsị",
      mute: "Gbupụ olu",
      unmute: "Kpọnye olu",
    },
    dashboard: {
      title: "VoiceHarvest",
      subtitle: "Ndụmọdụ Ọrụ Ugbo nke AI",
      micPrompt: "Metụ aka ka gị na onye ndụmọdụ kparịta ụka",
      openModule: "Mepee Module",
      modules: {
        symptoms: { title: "Nyocha Mgbaàmà", desc: "Chọpụta pests na ọrịa ihe ubi" },
        advisory: { title: "Ndụmọdụ Ọgwụgwọ", desc: "Nduzi ọgwụgwọ nzọụkwụ site na nzọụkwụ" },
        storage: { title: "Nchekwa Smart", desc: "Ọkwa mmiri & nchekwa hermetic" },
        market: { title: "Ọnụahịa Ahịa", desc: "Nlekọta ọnụahịa ọka n'oge gidi" },
      },
    },
    symptoms: {
      title: "Nyocha Mgbaàmà",
      subtitle: "Kọwaa ihe na-eme ihe ubi gị",
      placeholder: "Pịa bọtịnụ igwe okwu n'okpuru ma kọwaa mgbaàmà ndị ahụ",
      example: 'Ọmụmaatu: "Ahụrụ m obere oghere na ahụhụ na akwụkwọ ọka m"',
      resultTitle: "Nsonaazụ Nyocha AI",
      confidence: "Ntụkwasị obi",
      rootCause: "Ihe kacha akpata ya",
      action: "Omume a tụrụ aro",
    },
    advisory: {
      title: "Ndụmọdụ Ọgwụgwọ",
      subtitle: "Usoro nchekwa ihe ubi site na olu",
      selectProcedure: "Họrọ Usoro",
      stepByStep: "Nduzi Nzọụkwụ site na Nzọụkwụ",
      stepsCount: "Nzọụkwụ",
    },
    storage: {
      title: "Nchekwa Smart",
      subtitle: "Jikwaa ihicha ọka na nchekwa hermetic",
      tabs: { drying: "Igwe Nchịkọta Ihicha", hermetic: "Nduzi Hermetic" },
      moistureLevel: "Ọkwa Mmiri Ọka",
      moisturePrompt: "Jiri ihe mmịfe ma ọ bụ gwa anyị ihe ị gụrụ na mmiri",
      boneDry: "8% (Akpọrọ nkụ kpamkpam)",
      ideal: "13% (Kacha mma)",
      fresh: "25% (A gburu ọhụrụ)",
      status: "Ọkwa",
      advice: { 
        safe: "Ọka dị mma maka nchekwa.", 
        risky: "Dị mkpa 1-2 ụbọchị ọzọ nke ihicha anwụ.", 
        unsafe: "Nnukwu ihe ize ndụ nke ebu. Gaa n'ihu na-ehicha ozugbo." 
      },
      tips: {
        air: { title: "Ihicha Ikuku", desc: "Gbasaa ọka na tarpaulin dị ọcha." },
        sun: { title: "Zing nke Anwụ", desc: "Kpoo ọka n'etiti elekere 10 nke ụtụtụ na elekere 4 nke ehihie." }
      },
      hermeticSteps: [
        { title: "Lelee Mmiri", desc: "Ọka ga-anọrịrị n'okpuru 13% ma ọ bụghị ya, ọ ga-ere ure." },
        { title: "Wepụ Ikuku", desc: "Oxygen na-enye ohere ka pests dị ndụ. Fanye ya niile." },
        { title: "Iyi Atọ", desc: "Gbaa mbọ hụ na ejiri akpa atọ ahụ dịiche iche kekọọ." },
        { title: "Ebe dị jụụ", desc: "Chekwaa n'ebe anwụ na-adịghị na n'ebe oke na-agaghị eru." }
      ],
      hermeticTitle: "Otu esi eji akpa Hermetic",
      hermeticDesc: "Akpa hermetic bụ ụzọ kachasị mma isi debe ọka gị na-enweghị iji kemịkal.",
    },
    market: {
      title: "Ọnụahịa Ahịa",
      subtitle: "Nlekọta ọnụahịa ọka mpaghara n'oge gidi",
      digest: "Nchịkọta olu nke Ahịa",
      briefing: "Akụkọ Ọnụahịa Kwa Ụbọchị",
      briefingDesc: "Gee ntị na mgbanwe ọnụahịa ahịa kachasị ọhụrụ na mpaghara gị.",
      perBag: "kwa akpa",
      estimateNote: "Rịba ama: Ọnụahịa niile bụ atụmatụ.",
      crops: {
        maize: "Ọka",
        millet: "Gero",
        sorghum: "Dawa",
        groundnut: "Ahuekere",
        tomatoes: "Tomato",
      },
      hubs: ["Kano", "Kaduna", "Minna", "Sokoto", "Lagos", "Ibadan", "Enugu", "Onitsha"],
    },
  },
};

export const keywords: Record<SupportedLanguage, { symptoms: string[]; advisory: string[]; storage: string[]; market: string[] }> = {
  "en-US": {
    symptoms: ["worm", "hole", "leaf", "leaves", "insect", "pest", "disease", "spots", "yellow"],
    advisory: ["treat", "spray", "chemical", "neem", "medicine", "cure", "fix"],
    storage: ["dry", "bag", "moisture", "store", "warehouse", "hermetic", "rot"],
    market: ["price", "cost", "money", "naira", "sell", "buy", "market", "trade"],
  },
  "ha-NG": {
    symptoms: ["tsutsotsi", "ramuka", "ganye", "ganyen", "kwari", "cuta", "tabo", "rawaya"],
    advisory: ["magani", "fesa", "sinadarin", "neem", "kula", "gyara"],
    storage: ["bushe", "buhu", "danshi", "ajiya", "gida", "hermetic", "rubu"],
    market: ["farashi", "kudi", "naira", "sayar", "saya", "kasuwa", "ciniki"],
  },
  "yo-NG": {
    symptoms: ["kòkòrò", "ihò", "ewe", "aisan", "aami", "pupa"],
    advisory: ["itọju", "fú", "kẹmika", "neem", "oogun", "wosan"],
    storage: ["gbẹ", "baagi", "ẹrọn", "fipamọ", "hermetic", "diba"],
    market: ["iye", "owo", "naira", "ta", "ra", "ọja", "iṣẹ"],
  },
  "ig-NG": {
    symptoms: ["ahụhụ", "oghere", "akwụkwọ", "ọrịa", "ntụpọ", "edo edo"],
    advisory: ["ọgwụgwọ", "fesa", "kemịkal", "neem", "ọgwụ", "gwọọ"],
    storage: ["kpọọ", "akpa", "mmiri", "chekwaa", "hermetic", "mebie"],
    market: ["ọnụahịa", "ego", "naira", "ree", "zụọ", "ahịa", "azụmahịa"],
  },
};
