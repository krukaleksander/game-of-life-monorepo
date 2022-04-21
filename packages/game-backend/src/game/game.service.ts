import { Injectable} from '@nestjs/common';
import { GameOfLife } from '@gameoflife/game-of-life';
import { InitialResponseDto, TickRequestDto } from '@gameoflife/game-of-life-dto';
import { Board } from '../utils/Board';

@Injectable()
export class GameService {
  db = new Board();

  setInitialBoard({board: initialBoard}: { board: number[][] }): InitialResponseDto {

    return { boardId: this.db.init(initialBoard) };
  }

  sendBoardAfterTick(id: TickRequestDto) {
    const boardFromDb = this.db.findBoard(id.id);
    if(!boardFromDb) throw new Error('There is no board with this id')
    const boardAfterTick = new GameOfLife(boardFromDb).tick().getState();
    this.db.changeStateOfBoard(id.id, boardAfterTick);
    return {
      status: 200,
      result: boardAfterTick,
    };
  }
}
