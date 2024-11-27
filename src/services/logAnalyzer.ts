import LogEntry from '../types/logEntry';
import LogParser from '../utils/logParser';

/**
 * Analyzes log entries to provide insights about IP addresses and URLs
 */
export default class LogAnalyzer {
  private entries: LogEntry[] = [];

  /**
   * Initializes the analyzer with log content and parses it into entries
   */
  constructor(logContent: string) {
    this.parseLogContent(logContent);
  }

  /**
   * Parses raw log content into structured LogEntry objects
   * Filters out empty lines and invalid entries
   */
  private parseLogContent(content: string): void {
    this.entries = content
      .split('\n')
      .filter(line => line.trim())  // Remove empty lines
      .map(line => LogParser.parseLine(line))  // Convert each line to LogEntry
      .filter((entry): entry is LogEntry => entry !== null);  // Remove invalid entries
  }

  /**
   * Returns the count of unique IP addresses in the logs
   */
  public getUniqueIPCount(): number {
    return new Set(this.entries.map(entry => entry.ipAddress)).size;
  }

  /**
   * Returns the most frequently accessed URLs
   * @param limit - Maximum number of URLs to return (default: 3)
   * @returns Array of URLs and their access counts, sorted by frequency
   */
  public getTopUrls(limit: number = 3): Array<{ url: string; count: number }> {
    // Count occurrences of each URL
    const urlCounts = this.entries.reduce((record, entry) => {
      record[entry.url] = (record[entry.url] || 0) + 1;
      return record;
    }, {} as Record<string, number>);

    // Sort by count and format the result
    return Object.entries(urlCounts)
      .sort(([, a], [, b]) => b - a)  // Sort in descending order
      .slice(0, limit)
      .map(([url, count]) => ({ url, count }));
  }

  /**
   * Returns the IP addresses with the most requests
   * @param limit - Maximum number of IPs to return (default: 3)
   * @returns Array of IPs and their request counts, sorted by frequency
   */
  public getTopIPs(limit: number = 3): Array<{ ip: string; count: number }> {
    // Count occurrences of each IP
    const ipCounts = this.entries.reduce((record, entry) => {
      record[entry.ipAddress] = (record[entry.ipAddress] || 0) + 1;
      return record;
    }, {} as Record<string, number>);

    // Sort by count and format the result
    return Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)  // Sort in descending order
      .slice(0, limit)
      .map(([ip, count]) => ({ ip, count }));
  }

  /**
   * Returns all parsed log entries
   */
  public getEntries(): LogEntry[] {
    return this.entries;
  }
} 