<h1 align="center">Quantum Mart</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/RxJS-B7178C?logo=reactivex&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white" />
</p>

<p align="center">
    A simulated multi-vendor shopping platform built to model real-world e-commerce flows.
</p>

<p align="center">
    <img src="https://img.shields.io/badge/status-in_development-blue" />
</p>

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Release Builds](#release-builds)
  - [Source Builds](#source-builds)
- [Special Thanks](#special-thanks)

## Project Overview

Quantum Mart is exactly how it sounds: A shop in the Quantum realm. Users can sign up, create product listings, add items to their cart, checkout, and manage orders on purchases made by customers. The application is meant to be run in parallel with its [backend services](https://github.com/MattCumbo99/qmart).

## Tech Stack

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

<img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />

Code is formatted using Prettier, and linted against ESLint. Pull requests will be checked automatically to ensure the changes fulfill these requirements.

**RxJS** is used for making HTTP calls to the backend services. Components handle the state of observables which get returned.

## Features

This list is non-exhaustive:

- User accounts with registration and login
- Creating, displaying, selling and purchasing product listings
- Adding products to the client's cart
- Order creation
- State management for order items

## Roadmap

All planned and in-progress features can be seen on the [project board](https://github.com/users/MattCumbo99/projects/6/views/1).

## Getting Started

To run the project locally, you can either use one of the [release builds](https://github.com/MattCumbo99/QuantumMart/releases) or serve the application from the repository itself.

### Prerequisites

1. Download and run the [backend service](https://github.com/MattCumbo99/qmart) before starting the application. If you plan on just running a release of Quantum Mart, it is best to run the most recently published release versions on each.
2. Install [Node.js](https://nodejs.org/en).

### Release builds

1. [Download](https://github.com/MattCumbo99/QuantumMart/releases) the latest release .zip file and unzip the contents somewhere.
2. From the extracted folder, run `npx serve -l 4200`.
3. Visit http://localhost:4200 to view the application.

### Source builds

**Note** - Running the project through the source code is mostly intended for developers and not if you just want to see the application.

1. Clone the repository:
   ```
   https://github.com/MattCumbo99/QuantumMart.git
   ```
2. Install dependencies with `npm install`.
3. Run the web server with `npm start`.
4. Visit http://localhost:4200 to view the application.

## Special Thanks

- Aaron ([@BobDoland](https://github.com/BobDoland)) - Helping collaborate and implement features in the project.
