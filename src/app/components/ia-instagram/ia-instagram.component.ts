import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ia-instagram',
  standalone: true,
  imports: [],
  templateUrl: './ia-instagram.component.html',
  styleUrl: './ia-instagram.component.css'
})
export class IaInstagramComponent implements AfterViewInit {

  @ViewChild('myVideo') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const videoEl = this.video.nativeElement;

    videoEl.muted = true;       // 🔥 clave
    videoEl.autoplay = true;
    videoEl.loop = true;
    videoEl.playsInline = true;

    videoEl.play().catch(err => {
      console.log('Autoplay bloqueado:', err);
    });
  }

}
