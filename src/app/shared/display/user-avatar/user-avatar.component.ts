import { UpperCasePipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  imports: [UpperCasePipe, NgStyle],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  /** Default name to use. Will replace this avatar with the first letter. */
  @Input({ required: true }) username!: string;

  /** Source path of an image for the avatar. */
  @Input() src?: string | null;

  /** Size of the image (default `md`). */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Changes the cursor to pointer when hovering over the avatar image. */
  @Input() clickable = false;

  get backgroundStyle() {
    const c1 = this.stringToHslColor(this.username);
    const c2 = this.stringToHsla(this.username, 65, 55, 0.6);

    return {
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
    };
  }

  private stringToHslColor(str: string, s = 65, l = 55): string {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = Math.abs(hash) % 360;

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  private stringToHsla(str: string, s = 65, l = 55, a = 0.8): string {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = Math.abs(hash) % 360;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }
}
