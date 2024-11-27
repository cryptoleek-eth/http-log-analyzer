import LogParser from '../utils/logParser';

describe('LogParser', () => {
  const validLogLine = '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574';

  test('parses log entry correctly', () => {
    const entry = LogParser.parseLine(validLogLine);
    expect(entry).not.toBeNull();
    if (entry) {
      expect(entry).toHaveProperty('ipAddress');
      expect(entry).toHaveProperty('timestamp');
      expect(entry).toHaveProperty('method');
      expect(entry).toHaveProperty('url');
      expect(entry).toHaveProperty('protocol');
      expect(entry).toHaveProperty('statusCode');
      expect(entry).toHaveProperty('responseSize');
      expect(entry).toHaveProperty('userAgent');
    }
  });

  test('extracts correct values from log line', () => {
    const entry = LogParser.parseLine(validLogLine);
    expect(entry).not.toBeNull();
    if (entry) {
      expect(entry.ipAddress).toBe('177.71.128.21');
      expect(entry.method).toBe('GET');
      expect(entry.url).toBe('/intranet-analytics/');
      expect(entry.statusCode).toBe(200);
    }
  });

  test('handles malformed lines gracefully', () => {
    const malformedLines = [
      'invalid line',
      '177.71.128.21 - -', // incomplete line
      '', // empty line
    ];

    malformedLines.forEach(line => {
      expect(LogParser.parseLine(line)).toBeNull();
    });
  });
}); 