import { Component } from '@angular/core';
import { FaceService } from '../../services/face.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-face-detector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.scss'],
})
export class FaceDetectorComponent {
  faces: any[] = [];
  imageUrl: string | null = null;

  constructor(private faceService: FaceService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.faceService.detectFaces(file).subscribe({
        next: (data: any[]) => this.faces = data,
        error: (err: any) => console.error('Face detection error:', err)
      });
    }
  }

  emotionKeys(emotionObj: any): string[] {
    return Object.keys(emotionObj);
  }

  getBoxStyle(face: any) {
    const rect = face.faceRectangle;
    return {
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
    };
  }
}
