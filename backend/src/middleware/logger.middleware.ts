import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Get current date for log filename
const getLogFilename = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.log`;
};

// Function to write to log file
const writeToLogFile = (message: string): void => {
  const logFile = path.join(logsDir, getLogFilename());
  fs.appendFileSync(logFile, message + '\n');
};

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const originalSend = res.send;
  
  const timestamp = new Date().toISOString();
  
  const requestLog = `\n[${timestamp}] 📥 ${req.method} ${req.originalUrl} - Request received`;
  console.log(requestLog);
  writeToLogFile(requestLog);
  
  const requestDetails: Record<string, any> = {};
  
  if (Object.keys(req.params).length > 0) {
    requestDetails.params = req.params;
  }
  
  if (Object.keys(req.query).length > 0) {
    requestDetails.query = req.query;
  }
  
  if (req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) {
      sanitizedBody.password = '********';
    }
    requestDetails.body = sanitizedBody;
  }
  
  if (req.user) {
    requestDetails.user = {
      id: req.user.id,
      email: req.user.email
    };
  }
  
  if (Object.keys(requestDetails).length > 0) {
    const detailsLog = 'Request Details: ' + JSON.stringify(requestDetails, null, 2);
    console.log(detailsLog);
    writeToLogFile(detailsLog);
  }
  
  res.send = function(body): Response {
    const responseLog = `[${timestamp}] 📤 ${req.method} ${req.originalUrl} - Response: ${res.statusCode}`;
    console.log(responseLog);
    writeToLogFile(responseLog);
    
    try {
      let responseData: Record<string, any>;
      if (typeof body === 'string' && body.startsWith('{')) {
        responseData = JSON.parse(body);
        
        if (responseData.token) {
          responseData.token = responseData.token.substring(0, 15) + '...';
        }
        
        Object.keys(responseData).forEach(key => {
          if (Array.isArray(responseData[key]) && responseData[key].length > 3) {
            const count = responseData[key].length;
            responseData[key] = responseData[key].slice(0, 3);
            responseData[key].push(`... and ${count - 3} more items`);
          }
        });
        
        const dataLog = 'Response Data: ' + JSON.stringify(responseData, null, 2);
        console.log(dataLog);
        writeToLogFile(dataLog);
      } else if (body && typeof body === 'object') {
        const truncatedJson = JSON.stringify(body, null, 2).substring(0, 500) + 
                           (JSON.stringify(body).length > 500 ? '... (truncated)' : '');
        const dataLog = 'Response Data: ' + truncatedJson;
        console.log(dataLog);
        writeToLogFile(dataLog);
      }
    } catch (e) {
      if (body) {
        const sizeLog = `Response size: ${typeof body === 'string' ? body.length : 'unknown'} bytes`;
        console.log(sizeLog);
        writeToLogFile(sizeLog);
      }
    }
    
    return originalSend.call(this, body);
  };
  
  next();
};