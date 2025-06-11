import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
constructor(private userService: UserService){}



@Post('register')
createUser(@Body() dto:CreateUserDto){
    const result = this.userService.createUser(dto)
    return result;
}
}
