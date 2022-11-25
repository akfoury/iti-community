import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomLocalStorage } from '../../services/plateform/local/room.storage';
import { RoomQueries } from '../../services/room.queries';
import { RoomSocketService } from '../../services/room.socket.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;
  rooms: Room[];
  @ViewChild('modal') modal: RoomCreateModalComponent;

  constructor(
    private feedStore: FeedStore,
    private queries: RoomQueries,
    private roomSocketService: RoomSocketService,
    private router: Router,
    private storage: RoomLocalStorage,
    ) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];

    this.roomSocketService.onNewRoom((room: Room) => {
      this.rooms.push(room);
    });

  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();

    const storedRoom = this.storage.getValue();
    if (storedRoom) {
      this.router.navigate([`app/${storedRoom[0].id}`]);
    } else if (!this.roomId$) {
      this.router.navigate([`app/${this.rooms[0].id}`]);
    } else {
      this.roomId$.subscribe(roomId => {
        this.router.navigate([`app/${roomId}`]);
      });
    }


  }

  goToRoom(room: Room) {
    this.router.navigate([`app/${room.id}`]);
    this.storage.setValue([room]);
  }
}
