import fs from 'fs/promises';
import path from 'path';
import LogAnalyzer from './services/logAnalyzer';

async function main() {
  try {
    const logContent = await fs.readFile(
      path.join(__dirname, '../programming-task-example-data.log'), 
      'utf-8'
    );

    const analyzer = new LogAnalyzer(logContent);

    console.log('Log Analysis Results:');
    console.log('-----------------');
    console.log(`Unique IP addresses: ${analyzer.getUniqueIPCount()}`);
    
    console.log('\nTop 3 most visited URLs:');
    analyzer.getTopUrls().forEach(({url, count}) => {
      console.log(`${url}: ${count} visits`);
    });

    console.log('\nTop 3 most active IP addresses:');
    analyzer.getTopIPs().forEach(({ip, count}) => {
      console.log(`${ip}: ${count} requests`);
    });

  } catch (error) {
    console.error('Error analyzing log file:', error);
    process.exit(1);
  }
}

main(); 