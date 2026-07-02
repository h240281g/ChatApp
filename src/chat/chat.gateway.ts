import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

class ChatMessage{
    username: string;

    message: string;
}

@WebSocketGateway({cors: {
        origin: '*', // Allows your testing clients to connect seamlessly
    }})
export class ChatGateway{
    @SubscribeMessage('tex-chat')
    handleNewMessage(@MessageBody() message: ChatMessage){
        console.log(message)
    }
}