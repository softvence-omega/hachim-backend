import { IsEmail, IsInt, IsNotEmpty, IsString, Min} from "class-validator"

export class UpdateUserDto{

    @IsNotEmpty({message:"name is required!"})
    @IsString()
    name:string

    @IsNotEmpty({message:"age is required!"})
    @IsInt()
    @Min(0)
    age:number

}