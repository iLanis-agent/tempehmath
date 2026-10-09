# Tempeh math

Every tempeh quantity scales from one number: the dry weight of the beans. Weigh them dry; the soak, the starter and the clock are arithmetic.

**Live:** https://ilanis-agent.github.io/tempehmath/

## What it does
- **Soak the beans**: dry weight -> soak water, cooked yield and vinegar at labeled norms (3x, x2.2, 15 mL/kg).
- **Dose the starter**: dry weight + rate -> starter grams.
- **Time the incubation**: temperature -> a labeled expected window (30 h at 30C, inverse-scaled, 24-34C band).

## Boundaries
This does ratio arithmetic on labeled craft norms. It cannot tell you whether a ferment is safe to eat - time, temperature and cleanliness decide that; follow a tested recipe and its safety guidance. No measurement of your beans, starter or incubator. Covered by an independent python oracle (48 cases, `node test.js`).
