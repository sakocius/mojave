# Mojave

A modern Angular 21 application with zoneless change detection.

## Features

- **Angular 21** - Latest version of Angular
- **Zoneless** - Uses `provideZonelessChangeDetection()` for improved performance
- **Standalone Components** - Modern Angular architecture with standalone components
- **Basic Routing** - Configured with Angular Router
- **Clean Starter** - Minimal setup without unnecessary boilerplate

## Development

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
mojave/
├── src/
│   ├── app/
│   │   ├── home/          # Home page component
│   │   ├── app.config.ts  # Application configuration (zoneless setup)
│   │   ├── app.routes.ts  # Routing configuration
│   │   ├── app.ts         # Root component
│   │   └── app.html       # Root template
│   ├── index.html         # Main HTML file
│   ├── main.ts           # Application entry point
│   └── styles.scss        # Global styles
├── angular.json          # Angular CLI configuration
├── package.json         # npm dependencies
└── tsconfig.json       # TypeScript configuration
```

## Technology Stack

- **Angular 21.0.0** - Web application framework
- **TypeScript 5.9.2** - Programming language
- **RxJS 7.8.0** - Reactive programming library
- **Vitest 4.0.8** - Testing framework
