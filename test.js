const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.soak) { let r; try { r = M.soak(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'soak ' + c.in); }
for (const c of E.starter) { let r; try { r = M.starter(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'starter ' + c.in); }
for (const c of E.incubate) { let r; try { r = M.incubate(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'incubate ' + c.in); }
// anchors
const sk = M.soak(500);
eq(sk.soakWaterMl, 1500, 'anchor water'); eq(sk.cookedG, 1100, 'anchor cooked'); eq(sk.vinegarMl, 7.5, 'anchor vinegar');
eq(M.starter(500, 2).starterG, 1, 'anchor starter');
eq(M.incubate(30).hours, 30, 'anchor hours');
// invariant: soak scales linearly
n++;
{ const a = M.soak(300); if (Math.abs(a.soakWaterMl * 2 - M.soak(600).soakWaterMl) > 0.02) { fail++; console.error('FAIL linear invariant'); } }
// errors
const errs = [
  () => M.soak(0), () => M.soak(5001),
  () => M.starter(0, 2), () => M.starter(500, 0), () => M.starter(500, 11),
  () => M.incubate(0), () => M.incubate(23), () => M.incubate(35),
];
const msgs = ['dry bean weight must be positive','past 5 kg you want a drum, not a bowl (labeled)',
  'dry bean weight must be positive','starter rate must be positive','past 10 g/kg you are growing starter, not tempeh (labeled)',
  'temperature must be positive','outside the labeled 24-34C incubation band','outside the labeled 24-34C incubation band'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
