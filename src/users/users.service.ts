import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const dbResponse = await this.usersRepository.find();
    if (!dbResponse.length) throw new NotFoundException();
    return dbResponse;
  }

  async findOne(id: number): Promise<User> {
    const dbResponse = await this.usersRepository.findOneBy({ id });
    if (!dbResponse) throw new NotFoundException();
    return dbResponse;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
    return;
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.usersRepository.delete({ id });
    if (!affected) throw new NotFoundException();
    return;
  }
}
