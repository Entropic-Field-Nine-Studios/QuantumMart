export interface JwtPayload {
    sub: string;
    uid: string;
    role: string;
    exp: number;
    iat?: number;
}