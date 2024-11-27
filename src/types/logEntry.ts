export default interface LogEntry {
  ipAddress: string;
  timestamp: string;
  method: string;
  url: string;
  protocol: string;
  statusCode: number;
  responseSize: number;
  userAgent: string;
} 