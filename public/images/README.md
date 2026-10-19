# EcoTrace Packaging – Image Assets Guide & Slots Registry

This guide documents every image slot in the website, detailing recommended pixel dimensions, aspect ratios, intended subject matter, and confidentiality protocols.

---

## 🔒 Confidentiality & Brand Asset Rules
- **No Stock or AI-Faked Operations**: Do not insert stock imagery depicting fabricated industrial operations or products.
- **Process Review**: All laboratory and conversion photos must be reviewed by technical staff prior to publication to guarantee no confidential fermentation parameters, reactor tags, or proprietary equipment details are disclosed.
- **Illustrative Tagging**: Where an image depicts a conceptual mock or trial prototype, ensure the `illustrative: true` flag is set on the `<ImageSlot>`.

---

## 📁 Image Slots Registry

| Page | Slot Name | File Path | Ratio | Recommended Dimensions | Content Description |
|---|---|---|---|---|---|
| **Home (`/`)** | Hero Supporting Image | `/images/home-hero-support.jpg` | 16:9 | 1600 × 900 px | Sugarcane field landscape in India or natural plant fiber texture in warm morning light. |
| **Product (`/product`)** | Product Hero Banner | `/images/product-hero.jpg` | 16:9 | 1920 × 1080 px | Overhead clean composition of compostable biopolymer test pellets in a laboratory dish. |
| **Product (`/product`)** | Gallery: Pellet Granules | `/images/product-pellets.jpg` | 4:3 | 1200 × 900 px | Close-up of uniform, compounded bio-based resin pellets ready for converter extrusion. |
| **Product (`/product`)** | Gallery: Sample Packaging Part | `/images/product-sample-part.jpg` | 4:3 | 1200 × 900 px | Prototype trial thermoformed tray or blown packaging film sample. |
| **Product (`/product`)** | Gallery: Material Detail | `/images/product-material-detail.jpg` | 4:3 | 1200 × 900 px | Texture detail showcasing surface finish and natural translucency of the resin. |
| **Product (`/product`)** | Application Context | `/images/product-application.jpg` | 16:9 | 1600 × 900 px | Consumer packaging setting (e.g. food container or protective film) illustrating intended target application. |
| **Process (`/process`)** | Step 1: Feedstock | `/images/process-step-1-feedstock.jpg` | 4:3 | 1200 × 900 px | Freshly pressed sugarcane bagasse fibrous residue at a regional milling facility. |
| **Process (`/process`)** | Step 2: Sugars | `/images/process-step-2-sugars.jpg` | 4:3 | 1200 × 900 px | Clean clarified agricultural sugar hydrolysate in scientific sample flask. |
| **Process (`/process`)** | Step 3: Biological Conversion | `/images/process-step-3-conversion.jpg` | 4:3 | 1200 × 900 px | Biological synthesis overview (abstract representation or clean bioprocess container). |
| **Process (`/process`)** | Step 4: Pelletization | `/images/process-step-4-pelletization.jpg` | 4:3 | 1200 × 900 px | Pellet strand cooling and rotary cutter output of finished biopolymer pellets. |
| **Traceability (`/traceability`)** | Feedstock Sourcing Zone | `/images/traceability-feedstock.jpg` | 16:9 | 1600 × 900 px | Agricultural harvesting region in India illustrating raw sugarcane origin tracking. |
| **Traceability (`/traceability`)** | Sample Labelling | `/images/traceability-sample-label.jpg` | 4:3 | 1200 × 900 px | Illustrative specimen bag with clear traceability batch label tag. |
| **Company (`/company`)** | Team & Operations | `/images/company-team.jpg` | 16:9 | 1600 × 900 px | EcoTrace leadership and laboratory workspace in Kolkata, India. |

---

## 💡 Production Rendering Behavior
- In **development** (`import.meta.env.DEV`), unfilled image slots display a neutral placeholder panel indicating the ratio and target dimensions.
- In **production** (`npm run build`), any `<ImageSlot>` lacking a verified `src` file collapses cleanly (`returns null`) so no empty or broken boxes are displayed to public visitors.
