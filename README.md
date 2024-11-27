# HTTP Log File Analyzer

A TypeScript application that parses HTTP access logs and provides analytics about IP addresses and URL access patterns.

## Features

- Counts unique IP addresses in the log file
- Identifies top 3 most visited URLs
- Identifies top 3 most active IP addresses
- Handles standard HTTP access log format
- Written in TypeScript with full type safety
- Includes unit tests

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/http-log-analyzer.git
cd log-analyzer
```


2. Install dependencies:
```bash
npm install
```


## Usage

1. Build the project:
```bash
npm run build
```

2. Run the analyzer:
```bash
npm start
```

The analyzer will process the included sample log file (`programming-task-example-data.log`) and output:
- Number of unique IP addresses
- Top 3 most visited URLs with visit counts
- Top 3 most active IP addresses with request counts

## Development

### Project Structure
├── src/
│ ├── tests/ # Test files
│ ├── types/ # TypeScript interfaces
│ ├── utils/ # Utility classes
│ ├── services/ # Business logic
│ └── index.ts # Application entry point
├── dist/ # Compiled JavaScript files
└── programming-task-example-data.log # Sample log file


### Available Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the compiled application
- `npm test` - Runs the test suite
- `npm run dev` - Runs the application in development mode using ts-node

### Running Tests
```bash
npm test
```

## Log File Format

The application expects log files in the following format:

Example:
```
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /url1 HTTP/1.1" 200 3574
```

## Implementation Details

### LogEntry Interface
Defines the structure for parsed log entries:
- `ipAddress`: Client IP address
- `timestamp`: Request timestamp
- `method`: HTTP method
- `url`: Requested URL
- `protocol`: HTTP protocol version
- `statusCode`: Response status code
- `responseSize`: Response size in bytes
- `userAgent`: Client user agent string

### LogParser Class
Handles parsing of individual log lines using regex pattern matching.

### LogAnalyzer Class
Provides analytics functionality:
- `getUniqueIPCount()`: Returns count of unique IP addresses
- `getTopUrls()`: Returns most frequently accessed URLs
- `getTopIPs()`: Returns most active IP addresses

## Error Handling

- Invalid log entries are skipped during parsing
- File read errors are caught and reported
- Type safety is enforced throughout the application

## Assumptions

1. Log file format follows the standard pattern
2. Log file is UTF-8 encoded
3. Memory usage is not a constraint (file is read entirely into memory)
4. URLs are case-sensitive
5. IP addresses are well-formed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.