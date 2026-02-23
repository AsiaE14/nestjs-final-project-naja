import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ApiResponse } from '../interfaces';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status: number;
      let message: string;
  
      if (exception instanceof HttpException) {
        const httpException = exception as HttpException;
        
        status = httpException.getStatus();
        const exceptionResponse = httpException.getResponse();
  
        if (typeof exceptionResponse === 'string') {
          message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
          const responseObj = exceptionResponse as Record<string, unknown>;
          message = Array.isArray(responseObj.message)
            ? responseObj.message.join(', ')
            : (responseObj.message as string) || httpException.message;
        } else {
          message = httpException.message;
        }
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
        
        this.logger.error('Unexpected error occurred:', exception);
      }
  
      const errorResponse: ApiResponse<null> = {
        success: false,
        message,
        data: null,
      };
  
      response.status(status).json(errorResponse);
    }
  }