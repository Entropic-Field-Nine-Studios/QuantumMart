import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ImageService } from 'src/app/image-service/image.service';
import { MessageService } from '../../message/message.service';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
})
export class ImageInputComponent {
  /** Text to display above the file upload input. */
  @Input() text = 'Upload image';

  /** Pre-filled image URL. */
  @Input() existingUrl: string | null = null;

  /**
   * Fires when the user attaches an image file to the input. The image is uploaded
   * and the URL to the image is emitted.
   */
  @Output() uploaded = new EventEmitter<string>();

  private readonly imageService = inject(ImageService);
  private readonly messageService = inject(MessageService);

  onImageFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.uploadImage(file);
  }

  private uploadImage(file: File) {
    this.imageService.uploadImage(file).subscribe({
      next: (url) => {
        this.uploaded.emit(url);
        this.existingUrl = url;
      },
      error: (err: HttpErrorResponse) => this.messageService.error(err.message),
    });
  }
}
