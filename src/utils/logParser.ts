import LogEntry from '../types/logEntry';

/**
 * Utility class for parsing web server log entries
 * Handles the conversion of raw log lines into structured LogEntry objects
 */
export default class LogParser {
  /**
   * Regular expression pattern to match log entry components:
   * - IP address: (\d+\.\d+\.\d+\.\d+)
   * - Timestamp: \[(.*?)\]
   * - HTTP Method: (\w+)
   * - URL: (.*?)
   * - HTTP Protocol: (HTTP\/[\d.]+)
   * - Status Code: (\d+)
   * - Response Size: (\d+)
   */
  private static LOG_PATTERN = /^(\d+\.\d+\.\d+\.\d+) .* \[(.*?)\] "(\w+) (.*?) (HTTP\/[\d.]+)" (\d+) (\d+)/;

  /**
   * Parses a single line from a log file into a structured LogEntry object
   * @param line - Raw log line to parse
   * @returns LogEntry object if parsing succeeds, null if the line doesn't match expected format
   * 
   * Example log line format:
   * 192.168.1.1 - - [20/Mar/2024:10:00:00 +0000] "GET /index.html HTTP/1.1" 200 1234 "Mozilla/5.0..."
   */
  public static parseLine(line: string): LogEntry | null {
    const match = line.match(this.LOG_PATTERN);
    
    if (!match) {
      return null;
    }

    const [, ipAddress, timestamp, method, url, protocol, statusCode, responseSize] = match;
    // match would be something like:
    // [
    //   "1.2.3.4 ... [2024-03-20] \"GET /path HTTP/1.1\" 200 1234",  // full match (index 0)
    //   "1.2.3.4",                                                    // group 1 - IP
    //   "2024-03-20",                                                // group 2 - timestamp
    //   "GET",                                                       // group 3 - method
    //   "/path",                                                     // group 4 - url
    //   "HTTP/1.1",                                                  // group 5 - protocol
    //   "200",                                                       // group 6 - statusCode
    //   "1234"                                                       // group 7 - responseSize
    // ]

    return {
      ipAddress,
      timestamp,
      method,
      url,
      protocol,
      statusCode: parseInt(statusCode, 10),  // Convert string to number (base 10)
      responseSize: parseInt(responseSize, 10),  // Convert string to number (base 10)
      userAgent: line.split('"')[5] || ''  // Extract user agent from the 6th quote-delimited section
    };
  }
}