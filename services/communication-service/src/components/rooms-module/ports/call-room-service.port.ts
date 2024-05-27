import { CallRoomType } from '../application/data/types/call-room.type';
import { RoomTimeRangesType } from '../application/data/types/room-time-ranges.type';

export abstract class CallRoomServicePort {
  abstract create(dates: RoomTimeRangesType): Promise<CallRoomType>;
  abstract join(roomId: string, participantId: string): Promise<void>;
}
