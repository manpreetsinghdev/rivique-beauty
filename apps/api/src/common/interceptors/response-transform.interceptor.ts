import {
  CallHandler, ExecutionContext,
  Injectable, NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T> {
  intercept(_ctx: ExecutionContext, next: CallHandler<T>): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({ success: true, data })),
    );
  }
}
