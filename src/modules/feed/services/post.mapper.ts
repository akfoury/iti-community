import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MessageAudioElement,
  MessageElement,
  MessageImageElement,
  MessageTextElement,
  MessageVideoElement,
  MessageYoutubeElement,
  Post,
  PostData,
  PostMessage
} from '../post.model';

@Injectable()
export class PostMapper {

  constructor(private sanitizer: DomSanitizer) {}

  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /(http[s]?:\/\/.+\.(jpeg|jpg|png|gif))/gmi;

     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /(http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav))/gmi;

     // TODO mp3,ogg,wav
    const audioRegex = /(http[s]?:\/\/.+\.(mp3|ogg|wav))/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const messages = message.split(/\s+/g);
    // messages.pop();
    const textMessage = [];

    for (let msg of messages) {
      const pictureMatche = pictureRegex.exec(msg);
      if (pictureMatche) {
        msg = msg.replace(pictureRegex, `<a href=${pictureMatche[0]}>${pictureMatche[0]}</a>`);
        attachements.push({ type: 'image', url: pictureMatche[0], htmlUrl: msg} as MessageImageElement);
      }

      const videoMatche = videoRegex.exec(msg);
      if (videoMatche) {
        msg = msg.replace(videoRegex, `<a href=${videoMatche[0]}>${videoMatche[0]}</a>`);
        attachements.push({ type: 'video', url: videoMatche[0], htmlUrl: msg } as MessageVideoElement );
      }

      const audioMatche = audioRegex.exec(msg);
      if (audioMatche) {
        msg = msg.replace(audioRegex, `<a href=${audioMatche[0]}>${audioMatche[0]}</a>`);
        attachements.push({ type: 'audio', url: audioMatche[0], htmlUrl: msg } as MessageAudioElement);
      }

      const youtubeMatche = youtubeRegex.exec(msg);
      if (youtubeMatche) {
        msg = msg.replace(youtubeRegex, `<a href=${youtubeMatche[0]}>${youtubeMatche[0]}</a>`);
        attachements.push({ type: 'youtube', videoId: youtubeMatche[2], htmlUrl: msg } as MessageYoutubeElement);
      }


      if (!pictureMatche && !videoMatche && !audioMatche && !youtubeMatche) {
        if (msg.startsWith('@')) {
          textMessage.push(`<div style='color: green'>${msg}</div>`);
        } else {
          textMessage.push(msg);
        }
      }
    }

    return {
      text: {
        type: 'text',
        content: this.sanitizer.bypassSecurityTrustHtml(textMessage.join(' ')),
      } as MessageTextElement,
      attachements
    };
  }
}
