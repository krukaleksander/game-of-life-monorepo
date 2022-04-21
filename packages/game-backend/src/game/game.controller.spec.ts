import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import {GameService} from "./game.service";

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService]
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should respond with id', () => {
    const exampleBoard = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(controller.setInitialBoard({board: exampleBoard})).toEqual({"boardId": "0"});
  });
});
