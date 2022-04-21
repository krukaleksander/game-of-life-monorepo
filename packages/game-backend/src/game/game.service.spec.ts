import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should send new border after tick', () => {
    const exampleBoard = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const responseBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const {boardId} = service.setInitialBoard({board: exampleBoard})
    expect(service.sendBoardAfterTick({id: boardId})).toEqual({status: 200, result: responseBoard})
  })
});
