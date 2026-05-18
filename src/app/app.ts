import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { LoadingService } from './loading.service';

type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly loadingService = inject(LoadingService);

  protected readonly advice = signal('Advice ...');

  ngOnInit() {
    this.getAdvice();
  }

  getAdvice() {
    this.http
      .get<AdviceResponse>('https://api.adviceslip.com/advice', {
        timeout: 5000,
        headers: { 'X-Loading-Key': 'advice' },
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((data) => {
        if (data) {
          this.advice.set(data.slip.advice);
        }
      });
  }
}
