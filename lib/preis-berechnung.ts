export type PreisBerechnungInput = {
  listenpreis_pln: number;
  rabatt?: number; // z.B. 0.43 für 43% Rabatt
  wechselkurs?: number; // z.B. 4.1894 (PLN => EUR)
  aufschlag?: number; // z.B. 1.0 für 100% Aufschlag auf EK
  mwst?: number; // z.B. 0.19 für 19%
};

export type PreisBerechnungOutput = {
  ek_pln: number;
  ek_eur: number;
  vk_netto: number;
  vk_brutto: number;
};

export function berechneVKundEK(input: PreisBerechnungInput): PreisBerechnungOutput {
  const rabatt = typeof input.rabatt === "number" ? input.rabatt : 0.43;
  const wechselkurs = typeof input.wechselkurs === "number" ? input.wechselkurs : 4.1894;
  const aufschlag = typeof input.aufschlag === "number" ? input.aufschlag : 1.0;
  const mwst = typeof input.mwst === "number" ? input.mwst : 0.19;

  // EK mit Rabatt
  const ekPln = input.listenpreis_pln * (1 - rabatt);
  // EK in EUR
  const ekEur = ekPln / wechselkurs;
  // VK Netto (EK + Aufschlag in %)
  const vkNetto = ekEur * (1 + aufschlag);
  // VK Brutto mit MWSt
  const vkBrutto = vkNetto * (1 + mwst);

  return {
    ek_pln: Math.round(ekPln * 100) / 100,
    ek_eur: Math.round(ekEur * 100) / 100,
    vk_netto: Math.round(vkNetto * 100) / 100,
    vk_brutto: Math.round(vkBrutto * 100) / 100,
  };
}