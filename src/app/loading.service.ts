import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly states = new Map<string, WritableSignal<boolean>>();

  loading(key: string): WritableSignal<boolean> {
    if (!this.states.has(key)) {
      this.states.set(key, signal(false));
    }
    return this.states.get(key)!;
  }
}
