import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let errorMessage = 'Something went wrong';
    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else if (typeof exceptionResponse.message === 'string') {
      errorMessage = exceptionResponse.message;
    } else if (Array.isArray(exceptionResponse.message)) {
      errorMessage = exceptionResponse.message[0];
    }

    response.status(status).json({
      success: false,
      message: errorMessage,
      data: null, 
    });
  }
}