/**
 * Publishing cadence. Pages are built for the whole book, but the sitemap lists
 * only released sections so Google and Bing meet the site a few hundred URLs at a
 * time, most important first. Add a kand here when its turn comes (see docs/seo-strategy).
 *
 * Suggested order: sunderkand (launch) → bal-kand → ayodhya-kand → lanka-kand →
 * uttar-kand → aranya-kand → kishkindha-kand, one every two to three days.
 */
export const released = {
  kands: ["sunderkand", "bal-kand", "ayodhya-kand", "aranya-kand", "kishkindha-kand", "lanka-kand", "uttar-kand"],
  units: ["sunderkand"],
  valmiki: ["sundara-kanda"],
};
