# Playwright Test Automation - SauceDemo

Repository ini berisi pengujian otomatis (End-to-End Testing) pada aplikasi SauceDemo menggunakan Playwright dan JavaScript.

## Persyaratan

- Node.js
- npm
- Git

## Cara Menjalankan Test di Lokal

1. Clone repository:

```bash
git clone https://github.com/syabila6293-hash/pw-saucedemo-6304240023.git
```

2. Masuk ke folder proyek:

```bash
cd pw-saucedemo-6304240023
```

3. Install dependencies:

```bash
npm install
```

4. Install browser Playwright:

```bash
npx playwright install
```

5. Jalankan seluruh pengujian:

```bash
npx playwright test
```

6. Buka HTML Report:

```bash
npx playwright show-report
```

## Struktur Folder

```text
pw-saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── 01-login-pertama.spec.js
│   ├── fixtures.js
│   ├── login.spec.js
│   ├── checkout.spec.js
│   └── problem-user.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Browser yang Digunakan

Pengujian dijalankan menggunakan tiga browser:

- Chromium
- Firefox
- WebKit

## GitHub Actions Status

![Playwright Tests](https://github.com/syabila6293-hash/pw-saucedemo-6304240023/actions/workflows/playwright.yml/badge.svg)
