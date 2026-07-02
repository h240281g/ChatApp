import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Socket connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Socket disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() payload: { userID: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (payload?.userID) {
      client.join(payload.userID);
      console.log(`Socket ${client.id} joined room ${payload.userID}`);
    }
  }

  sendNewMessage(message: any) {
    const room = message.receiverID;
    if (room) {
      this.server.to(room).emit('newMessage', message);
    }
  }
}
