# Leo Mascot Assets

This directory contains the visual assets for Leo, the website AI assistant for EcoTrace Packaging Private Limited.

## Asset Inventory

| File | Primary Use | Dimensions | Format & Size |
| :--- | :--- | :--- | :--- |
| `leo-launcher.png` / `.webp` | Floating launcher button only | 512 × 512 px | PNG (80 KB) / WebP (23 KB) |
| `leo-avatar.png` / `.webp` | Panel header avatar & message avatars | 512 × 512 px | PNG (87 KB) / WebP (22 KB) |
| `leo-wave.png` / `.webp` | Welcome state & initial greeting | 512 × 512 px | PNG (78 KB) / WebP (25 KB) |
| `leo-happy.png` / `.webp` | Default "idle" & "reply received" mood | 512 × 512 px | PNG (70 KB) / WebP (24 KB) |
| `leo-curious.png` / `.webp` | Listening mood & suggestions area | 512 × 512 px | PNG (70 KB) / WebP (23 KB) |
| `leo-working.png` / `.webp` | Thinking & slow-reply mood | 512 × 512 px | PNG (58 KB) / WebP (19 KB) |
| `leo-rest.png` / `.webp` | Error, offline & session-limit states | 512 × 512 px | PNG (69 KB) / WebP (19 KB) |
| `leo-wink.png` / `.webp` | Positive feedback & easter-egg mood | 512 × 512 px | PNG (67 KB) / WebP (23 KB) |

## Usage Guidelines

- **Widget Only:** The mascot is used strictly within the Leo chat widget and launcher button.
- **Decorative Images:** Poses inside the stage and header are decorative; they have empty alt text (`alt=""`) and are hidden from assistive technology (`aria-hidden="true"`). Mood state announcements are conveyed via semantic live regions (`aria-live="polite"`).
- **Graceful Fallback:** If any asset cannot be loaded or is absent, the UI automatically falls back to an inline sage paw-print SVG in a circle.
