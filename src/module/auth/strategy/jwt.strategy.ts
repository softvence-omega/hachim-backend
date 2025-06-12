import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super(
            {
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.ACCESS_TOKEN_SECRET as string
            }
        )
    }
  async validate(payload:any){
    return payload
}
}