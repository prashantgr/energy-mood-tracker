import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceService {
  private subscriptionKey = '';

  private apiUrl = 'https://moodtracker-face.cognitiveservices.azure.com/'

  constructor(private http: HttpClient) {}

  detectFaces(image: File): Observable<any> {
   //const url = `${this.apiUrl}/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion`;
   //const url = `${this.apiUrl}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=headPose,blur,occlusion,glasses,accessories,exposure,noise`;

   const url = 'https://moodtracker-face.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=headPose,blur,occlusion,glasses,accessories,exposure,noise';


    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.subscriptionKey,
      'Content-Type': 'application/octet-stream'
    });

    console.log('Calling Face API with URL:', url);
    console.log('Using key:', this.subscriptionKey.slice(0, 5) + '...');

    return this.http.post(url, image, { headers });
  }
}
