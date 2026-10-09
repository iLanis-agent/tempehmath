// Tempeh math: soak, starter and incubation - exact arithmetic on labeled craft norms.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Tempehmath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const round = x => Math.round(x * 100) / 100;

  function yieldBand(cookedG, dryG) {
    const y = cookedG / dryG;
    if (y < 2) return 'a tight cook - beans still firm (labeled)';
    if (y <= 2.4) return 'the classic yield band (labeled)';
    return 'a soft cook - drains wet (labeled)';
  }
  function tempBand(c) {
    if (c < 26) return 'slow - the mycelium walks (labeled)';
    if (c <= 31) return 'the steady band (labeled)';
    return 'quick - watch the heat build (labeled)';
  }

  // soak water, cooked yield and acidulation from dry bean weight (labeled norms: 3x soak, 2.2x yield, 15 mL/kg)
  function soak(dryG) {
    if (!(dryG > 0)) throw new Error('dry bean weight must be positive');
    if (dryG > 5000) throw new Error('past 5 kg you want a drum, not a bowl (labeled)');
    const soakWaterMl = round(dryG * 3);
    const cookedG = round(dryG * 2.2);
    const vinegarMl = round(dryG * 15 / 1000);
    return { soakWaterMl, cookedG, vinegarMl, verdict: yieldBand(2.2, 1) };
  }

  // starter grams from dry bean weight (labeled norm: 2 g per kg)
  function starter(dryG, gPerKg) {
    if (!(dryG > 0)) throw new Error('dry bean weight must be positive');
    if (!(gPerKg > 0)) throw new Error('starter rate must be positive');
    if (gPerKg > 10) throw new Error('past 10 g/kg you are growing starter, not tempeh (labeled)');
    const starterG = round(dryG * gPerKg / 1000);
    return { starterG, verdict: starterG < 1 ? 'a pinch - weigh it, do not guess it (labeled)' : 'a measurable pinch (labeled)' };
  }

  // incubation window from temperature (labeled: 30 h at 30C, inverse-scaled)
  function incubate(tempC) {
    if (!(tempC > 0)) throw new Error('temperature must be positive');
    if (tempC < 24 || tempC > 34) throw new Error('outside the labeled 24-34C incubation band');
    const hours = round(30 * 30 / tempC);
    return { hours, verdict: tempBand(tempC) };
  }

  return { soak, starter, incubate, yieldBand, tempBand };
});
