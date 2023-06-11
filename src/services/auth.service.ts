import {IAuth} from "../interfaces/auth.interface";
import {axiosService} from "./axios.service";
import {AxiosResponse} from "axios";
import {ITokens} from "../interfaces/tokens.interface";
import {urls} from "../constants/urls";

class AuthService {
    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'

    async login(admin: IAuth): Promise<void> {
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.login, admin);
        this.setTokens(data)
    }

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists")
        }
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.refresh, {refresh: refreshToken});
        this.setTokens(data)
    }

    private setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(this.accessKey, accessToken)
        localStorage.setItem(this.refreshKey, refreshToken)
    }

    getAccessToken(): string {
        return localStorage.getItem(this.accessKey)
    }

    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey)
    }

    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
        localStorage.removeItem(this.refreshKey)
    }
}

export const authService = new AuthService()
