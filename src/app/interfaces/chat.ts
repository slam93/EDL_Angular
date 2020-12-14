export class Chat {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    message: string;
    state: number;
    idsender: string;
    idreceiver: string;
    userId: string;
    fileChatId: string;
    emailSender: string ;
}
