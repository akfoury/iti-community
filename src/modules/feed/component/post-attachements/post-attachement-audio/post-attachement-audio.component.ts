import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageAudioElement } from '../../../post.model';

@Component({
  selector: 'app-post-attachement-audio',
  templateUrl: './post-attachement-audio.component.html',
  styleUrls: ['./post-attachement-audio.component.less']
})
export class PostAttachementAudioComponent implements OnInit {
  @Input()
  element: MessageAudioElement;

  constructor(private sanitizer: DomSanitizer) { }

  get url() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.element.url);
  }

  ngOnInit(): void {
  }

}
