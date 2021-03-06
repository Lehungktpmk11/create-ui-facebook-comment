import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsInerface } from './comments-inerface';

@Injectable()
export class CommentsServiceService {
  possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  lengthOfCode = 6;
  comments: CommentsInerface[] = [
    {
      id: '1',
      body: 'first comment',
      username: 'hunglm',
      userId: '1',
      parentId: null,
      userImg:
        'https://i.pinimg.com/736x/2d/98/38/2d983897d76d454d7433f07341c4a25f.jpg',
      createdAt: '2022-05-17T8:48:00.687Z',
    },
    {
      id: '2',
      body: 'second comment',
      username: 'anhbm',
      userId: '2',
      userImg:
        'https://i.pinimg.com/236x/ff/90/88/ff90884c01cb44efcee053c9a1329995.jpg',
      parentId: null,
      createdAt: '2022-07-17T6:48:00.687Z',
    },
    {
      id: '3',
      body: 'third comment',
      username: 'khiemnd2',
      userId: '3',
      userImg:
        'https://i.pinimg.com/originals/bc/24/39/bc2439e3e270f254f8a42c002cd70d5f.jpg',
      parentId: null,
      createdAt: '2022-07-17T8:40:00.687Z',
    },
    {
      id: '4',
      body: 'fisrt child comment',
      username: 'anhbm',
      userId: '2',
      userImg:
        'https://i.pinimg.com/236x/ff/90/88/ff90884c01cb44efcee053c9a1329995.jpg',
      parentId: '1',
      createdAt: '2022-07-17T7:38:00.687Z',
    },
    {
      id: '5',
      body: 'third child comment',
      username: 'hunglm',
      userId: '1',
      userImg:
        'https://i.pinimg.com/736x/2d/98/38/2d983897d76d454d7433f07341c4a25f.jpg',
      parentId: '3',
      createdAt: '2022-07-17T6:38:00.687Z',
    },
  ];

  constructor() {}
  getListComments(): CommentsInerface[] {
    return this.comments;
  }

  createComment(text: string, parentId: null | string): CommentsInerface[] {
    let createdComment: CommentsInerface = {
      body: text,
      parentId,
      createdAt: new Date().toISOString(),
      userId: '1',
      userImg:
        'https://i.pinimg.com/736x/2d/98/38/2d983897d76d454d7433f07341c4a25f.jpg',
      username: 'hunglm',
      id: this.makeRandom(this.lengthOfCode, this.possible),
    };
    this.comments = [...this.comments, createdComment];
    return this.comments;
  }

  updateComment(commentId: string, text: string): CommentsInerface[] {
    this.comments.forEach((item) => {
      if (item.id === commentId) {
        item.body = text;
      }
    });

    return this.comments;
  }

  deleteComment(commentId: string): CommentsInerface[] {
    let indexItem = this.comments.findIndex(
      (element) => element.id === commentId
    );
    this.comments.splice(indexItem, 1);
    console.log(this.comments);
    return this.comments;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
