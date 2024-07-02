import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(err.message);
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async findAll(): Promise<User[]> {
    const dbResponse = await this.userRepository.find();
    if (!dbResponse.length) throw new NotFoundException();
    return dbResponse;
  }

  async findOne(id: number): Promise<User> {
    const dbResponse = await this.userRepository.findOneBy({ id });
    if (!dbResponse) throw new NotFoundException();
    return dbResponse;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
    return;
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.userRepository.delete({ id });
    if (!affected) throw new NotFoundException();
    return;
  }

  async createProfile(id: number, profile: CreateProfileDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
}
