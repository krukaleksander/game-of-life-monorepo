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
  it('should give new border an id', function () {
    const newBoard = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    expect(service.setInitialBoard({board: newBoard})).toEqual({boardId: expect.any(String)})
  });
  it(' service should throw Error when id is wrong', function () {
    expect(() => service.sendBoardAfterTick({id: 'xxx'})).toThrowError('There is no board with this id')
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
