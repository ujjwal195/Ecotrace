# EcoTrace – Data Sources & Benchmark Register

This document tracks all external statistics, regulatory benchmarks, and industry data used on the EcoTrace website. In accordance with our factual integrity policy, each statistic is tracked with primary source documentation, verification status, and scheduled audit cycles.

---

## 📊 Market & Feedstock Data Registry

### 1. Feedstock Scale (`feedstock-scale`)
- **Metric / Value**: `75–100` million tonnes / year
- **Reported Year**: `[ADD: Year]`
- **Headline**: Tens of millions of tonnes of bagasse produced each year
- **Description**: Sugarcane bagasse is the fibrous residue left after cane is crushed for sugar. India's sugar industry produces it at very large scale.
- **Note**: Estimates vary by source and year; shown as a range.
- **Source Name**: `[ADD: Primary source, e.g. ISMA, Ministry of Food & Public Distribution, or a peer-reviewed review]`
- **Source URL**: `[ADD: Source URL]`
- **Last Verified**: `2026-10-14`
- **Verified Status**: `false` (Pending primary source confirmation)
- **Re-check By**: `2027-04-14` (6-month audit cycle)

---

### 2. Plastic Waste Scale (`plastic-waste`)
- **Metric / Value**: `34.69 lakh` tonnes / year (`≈ 3.5 million` tonnes / year)
- **Reported Year**: `2019-20`
- **Headline**: About 3.5 million tonnes of plastic waste reported in India in a single year
- **Description**: Of this, roughly 15.8 lakh tonnes was reported as recycled.
- **Note**: Self-reported by state pollution control boards; other CPCB estimates differ. Check for a more recent CPCB year and update if available.
- **Source Name**: CPCB Annual Report on implementation of Plastic Waste Management Rules, as cited in a Rajya Sabha reply (Dec 2022)
- **Source URL**: https://rsdebate.nic.in/bitstream/123456789/734866/1/PQ_258_22122022_U1800_p234_p238.pdf
- **Last Verified**: `2026-10-14`
- **Verified Status**: `false` (Awaiting confirmation of latest CPCB report cycle)
- **Re-check By**: `2027-04-14` (6-month audit cycle)

---

### 3. Regulatory Policy Driver (`policy-driver`)
- **Metric / Value**: N/A (Qualitative policy framework)
- **Reported Year**: `[ADD: Year]`
- **Headline**: Regulation is pushing brands toward alternatives
- **Description**: India's Plastic Waste Management framework, including extended producer responsibility (EPR) obligations for plastic packaging, is increasing pressure on brands to reduce and replace conventional plastic packaging.
- **Source Name**: `[ADD: Specific rule, e.g. Plastic Waste Management (Amendment) Rules, 2022, from CPCB or MoEFCC]`
- **Source URL**: `[ADD: Source URL]`
- **Last Verified**: `2026-10-14`
- **Verified Status**: `false` (Pending specific rule citation confirmation)
- **Re-check By**: `2027-04-14` (6-month audit cycle)

---

## 🛠️ Audit & Verification Workflow

1. **Verification**: To promote a stat to verified production status:
   - Provide the verified primary source name and live URL in `/src/data/stats.ts`.
   - Update `lastVerified` to the current verification date.
   - Set `verified: true`.
2. **Build Guard**: Running `npm run build` or `npm run check-guards` validates that no `verified: false` or placeholder fields remain before generating production distribution assets.
