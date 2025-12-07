import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private guestKey = 'guestId';
  private sessionKey = 'sessionId';
  device: 'desktop' | 'tablet' | 'mobile';

  constructor() {
    this.initGuestId();
    this.initSessionId();
    this.device = this.getDeviceType();
  }

  private generateUUID() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private initGuestId() {
    if (!localStorage.getItem(this.guestKey)) {
      const id = this.generateUUID();

      localStorage.setItem(this.guestKey, id);
    }
  }

  getGuestId(): string {
    return localStorage.getItem(this.guestKey)!;
  }
  public initGuest() {
    this.initGuestId();
    this.initSessionId();
  }
  private initSessionId(): string {
    const sessionId = this.generateUUID();
    sessionStorage.setItem(this.sessionKey, sessionId);
    return sessionId;
  }

  getSessionId(): string {
    return sessionStorage.getItem(this.sessionKey)!;
  }

  private getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'mobile';
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    return 'desktop';
  }

}
