import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface NestErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as string | NestErrorResponse;

    let errorMessage = 'Something went wrong';
    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      if (typeof exceptionResponse.message === 'string') {
        errorMessage = exceptionResponse.message;
      } else if (Array.isArray(exceptionResponse.message)) {
        errorMessage = exceptionResponse.message[0];
      }
    }

    response.status(status).json({
      success: false,
      message: errorMessage,
      data: null, 
    });
  }
}