import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
