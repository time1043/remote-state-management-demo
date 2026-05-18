import { Component } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

async function fetchAdvice() {
  const response = await fetch('https://api.adviceslip.com/advice');
  const data = await response.json();

  return data.slip.advice as string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly adviceQuery = injectQuery(() => ({
    queryKey: ['advice'],
    queryFn: fetchAdvice,
  }));
}
