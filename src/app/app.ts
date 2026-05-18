import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';

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

  protected readonly advice = signal('Advice ...');
  protected readonly isLoading = signal(false);

  ngOnInit() {
    this.getAdvice();
  }

  getAdvice() {
    this.isLoading.set(true);

    // this.http.get(): Observable  // rxjs
    this.http
      .get<AdviceResponse>('https://api.adviceslip.com/advice', {
        timeout: 5000,
      })
      .subscribe((data) => {
        this.advice.set(data.slip.advice);
        this.isLoading.set(false);
      });
  }
}
