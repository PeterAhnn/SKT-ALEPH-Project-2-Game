# Enemy asset sources

Downloaded 2026-09-16. Logo artwork is unmodified. No broad game-use rights are asserted.

- `python.svg`: official two-snakes device linked by https://www.python.org/community/logos/ ; download https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg . Python Software Foundation trademark. Consult https://www.python.org/psf/trademarks/ . Official guidance supports indicating Python use/suitability; ask PSF about derived/doubtful uses.
- `typescript.svg`: https://www.typescriptlang.org/branding/ts-logo-512.svg ; guidance https://www.typescriptlang.org/branding/ . Microsoft TypeScript mark. Guidance prohibits using it as your application/product logo, reshaping it, or integrating into your app logo; does not explicitly authorize game enemy sprites. Use only to identify the language, without endorsement implications.
- `rust.svg`: official white-outline logo https://raw.githubusercontent.com/rust-lang/rust-artwork/main/logo/rust-logo-white-outline.svg . Rust Foundation; CC-BY https://creativecommons.org/licenses/by/4.0/ plus https://rustfoundation.org/policy/rust-trademark-policy/ . Credit Rust Foundation, link license, note no artwork changes. See included rust-README.md; trademark rules still apply.
- `router.svg`, `shield.svg`, `cpu.svg`, `bot.svg`, `smartphone.svg`: https://github.com/lucide-icons/lucide/tree/main/icons ; raw downloads follow https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/{name}.svg . Lucide ISC with Feather-derived portions under MIT. Keep included lucide-LICENSE.txt when distributing. SVGs use currentColor; set an explicit stroke color when loaded as external images if needed.

All eight SVGs parsed successfully with Python ElementTree. Python original has fixed width/height and no viewBox; use image element/canvas image drawing with proportional sizing.
