import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedStore } from '../../feed.store';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';
import { FeedSocketService } from '../../services/feed.socket.service';
import { UserQueries } from 'src/modules/user/services/user.queries';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit {
  @ViewChild('feed') private bottomRef: ElementRef;

  roomId$: Observable<string | undefined>;

  posts$: Observable<Post[]>;

  constructor(private postService: PostService, 
    private store: FeedStore, 
    private socketService: FeedSocketService,
    private userQueries: UserQueries
    ) {
    this.posts$ = this.store.get(s => s.posts);
    this.roomId$ = this.store.roomId$;
  }

  async ngOnInit() {
    const currentUser = await this.userQueries.getUserInfo();
    this.store.onRoomIdChange(async roomId => {
      if (roomId) {
        this.socketService.onNewPost(roomId, post => {
          if (post.createdBy.username != currentUser.username) {
            this.store.appendPost(post);
          }
        });
        await this.postService.fetch(roomId, {
          page: 0,
          perPage: 10000
        });
      }
    })
  }
}
