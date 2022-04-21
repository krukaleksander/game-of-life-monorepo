import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { InitialResponseDto, TickRequestDto } from '@gameoflife/game-of-life-dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/')
  setInitialBoard(@Body() board: { board: number[][] }): InitialResponseDto {
    return this.gameService.setInitialBoard(board);
  }
  @Post('/tick')
  sendBoardAfterTick(@Body() id: TickRequestDto) {
    return this.gameService.sendBoardAfterTick(id);
  }
}
