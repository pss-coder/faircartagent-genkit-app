# FairCartAgent

FairCartAgent is an open source web application designed to help shoppers quickly check if their shopping list fits within a specified budget, using real-time data from NTUC’s catalog.

## Problem Statement

Shoppers often visit NTUC (or other supermarkets) with a fixed budget but struggle to quickly determine if their intended purchases fit within that budget. Manually checking prices and totaling them is inconvenient and time-consuming.

## Solution

FairCartAgent provides a simple interface for budget-checking:

- **Input:** Budget and a list of items.
- **Processing:** Searches NTUC’s catalog for matching items and calculates the total cost.
- **Output:**
  - A shopping list with estimated prices.
  - The total cost.
  - An indicator showing whether the total is within or exceeds the budget.

This version focuses purely on budget-checking, with future plans to add features like suggesting healthier or cheaper alternatives.

## Open Source

This project is open source and welcomes contributions! The codebase is organized for clarity and ease of collaboration. You can review, modify, and contribute to the code under standard open source practices.

## Codebase Structure

- `src/` – Main application source code
  - `index.ts` – Entry point for the app
  - `tools/ntuc.ts` – Logic for searching NTUC’s catalog
  - `config/config.ts` – Configuration settings
  - `tests/` – Automated tests (e.g., `sample.test.ts`)
- `package.json` – Project dependencies and scripts
- `tsconfig.json` – TypeScript configuration
- `eslint.config.js` – Linting rules
- `jest.config.js` – Test configuration

## Getting Started

1. **Clone the repository:**
	```sh
	git clone <your-repo-url>
	cd my-genkit-shopping-assistant-app
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Run the app:**
	```sh
	npm start
	```
4. **Run tests:**
	```sh
	npm test
	```

## Contributing

Contributions are welcome! Please open issues or submit pull requests to help improve FairCartAgent.

## License

This project is open source. See the `LICENSE` file for details (add a license if not present).
