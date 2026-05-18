import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly advice = signal('Advice ...');

  ngOnInit() {
    this.getAdvice();
  }

  async getAdvice() {
    // https://api.adviceslip.com/
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    this.advice.set(data.slip.advice);
  }
}
