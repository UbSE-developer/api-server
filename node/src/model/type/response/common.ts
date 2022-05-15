export type ResponseType = {
    status: number;
    message: string;
    data: object;
}

export type HashingData = {
    data: string;
    salt: string;
}