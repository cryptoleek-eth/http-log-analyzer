import LogAnalyzer from '../services/logAnalyzer';
import fs from 'fs/promises';
import path from 'path';

describe('LogAnalyzer', () => {
  const sampleLog = `
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /url1 HTTP/1.1" 200 3574
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /url1 HTTP/1.1" 200 3574
168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET /url2 HTTP/1.1" 200 3574
168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /url3 HTTP/1.1" 404 3574
`.trim();

  let analyzer: LogAnalyzer;

  beforeEach(() => {
    analyzer = new LogAnalyzer(sampleLog);
  });

  test('counts unique IP addresses correctly', () => {
    expect(analyzer.getUniqueIPCount()).toBe(3);
  });

  test('identifies top URLs correctly', () => {
    const topUrls = analyzer.getTopUrls();
    expect(topUrls[0]).toEqual({ url: '/url1', count: 2 });
  });

  test('identifies top IPs correctly', () => {
    const topIPs = analyzer.getTopIPs();
    expect(topIPs[0]).toEqual({ ip: '177.71.128.21', count: 2 });
  });

  test('handles custom limits for top URLs', () => {
    [1, 2, 5].forEach(limit => {
      const topUrls = analyzer.getTopUrls(limit);
      expect(topUrls.length).toBeLessThanOrEqual(limit);
    });
  });

  test('verifies HTTP methods are valid', () => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    analyzer.getEntries().forEach(entry => {
      expect(validMethods).toContain(entry.method);
    });
  });

  test('verifies status codes are valid', () => {
    analyzer.getEntries().forEach(entry => {
      expect(entry.statusCode).toBeGreaterThanOrEqual(100);
      expect(entry.statusCode).toBeLessThanOrEqual(599);
    });
  });

  test('handles empty log content', () => {
    const emptyAnalyzer = new LogAnalyzer('');
    expect(emptyAnalyzer.getUniqueIPCount()).toBe(0);
    expect(emptyAnalyzer.getTopUrls()).toHaveLength(0);
    expect(emptyAnalyzer.getTopIPs()).toHaveLength(0);
  });

  test('handles log entries with admin users and extra fields', () => {
    const logWithExtra = `
50.112.00.11 - admin [11/Jul/2018:17:31:05 +0200] "GET /hosting/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0" extra fields
168.41.191.40 - - [09/Jul/2018:10:12:03 +0200] "GET /docs/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0"
`.trim();

    const analyzer = new LogAnalyzer(logWithExtra);
    expect(analyzer.getUniqueIPCount()).toBe(2);
  });

  test('maintains result consistency across multiple analyses', () => {
    const analyzer1 = new LogAnalyzer(sampleLog);
    const analyzer2 = new LogAnalyzer(sampleLog);

    expect(analyzer1.getUniqueIPCount()).toBe(analyzer2.getUniqueIPCount());
    
    const topUrls1 = analyzer1.getTopUrls().map(({url}) => url);
    const topUrls2 = analyzer2.getTopUrls().map(({url}) => url);
    expect(topUrls1).toEqual(topUrls2);
    
    const topIPs1 = analyzer1.getTopIPs().map(({ip}) => ip);
    const topIPs2 = analyzer2.getTopIPs().map(({ip}) => ip);
    expect(topIPs1).toEqual(topIPs2);
  });
}); 