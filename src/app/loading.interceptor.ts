import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

const LOADING_KEY_HEADER = 'X-Loading-Key';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const key = req.headers.get(LOADING_KEY_HEADER);
  if (!key) return next(req);

  const loadingService = inject(LoadingService);
  const loading = loadingService.loading(key);
  loading.set(true);

  const cloned = req.clone({ headers: req.headers.delete(LOADING_KEY_HEADER) });
  return next(cloned).pipe(finalize(() => loading.set(false)));
};
