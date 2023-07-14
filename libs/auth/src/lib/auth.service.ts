import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@nx-todolist/users';
import { User } from '@nx-todolist/users/user.entity';
import { PayloadToken } from '@nx-todolist/shared/token.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    const isMatch = await bcrypt.compare(password, user.data.password);
    if (user) {
      if (isMatch) {
        const { password, ...res } = user.data.toJSON();
        return {
          message: 'Usuario solicitado',
          data: res,
        };
      }
      return null;
    }
    return null;
  }

  generateToken(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    return {
      access_token: this.jwt.sign(payload),
      user,
    };
  }
}
