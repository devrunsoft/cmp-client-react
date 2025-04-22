export type BaseResponse<T> = {
    Data: T;
    Success: boolean;
    StatusCode: string;
    Message?: string;

}