import * as React from 'react';
import {Alert, Box, Button, Stack, TextField, Typography} from '@mui/material';
import {BoardGrid} from '../BoardGrid';
import {Board} from '@gameoflife/game-of-life-dto';
import {generateBlankBoard} from '../../utils';
import {useBoardApi} from '../../context/BoardApi.context';

export const BoardWidget = () => {
  const context = useBoardApi();
  const [boardId, setBoardId] = React.useState<string | null>(null);
  const [boardState, setBoardState] = React.useState<Board | null>(null);
  const [startingCellNumber, setStartingCellNumber] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string | null>(null);
  const [maxStartingCellsNumber, setMaxStartingCellsNumber] = React.useState<number>(0);
  const [boardDimension, setBoardDimension] = React.useState<number>(10);

  const displayBlankBoard = async () => {
    setBoardState(generateBlankBoard(boardDimension));
    setMaxStartingCellsNumber(boardDimension*boardDimension*0.2);
  };

  const getNewBoardState = async () => {
    if (boardId === null) return;
    console.log('Ill be tick');
    return await context.api.tick({id: boardId});
  };

  const tickGame = async () => {
    const newBoardState = await getNewBoardState();
    setBoardState(newBoardState.result);
  }

  const establishBoard = async () => {
    setMessage(null);
    const response = await context.api.sendInitialBoard({
      board: boardState,
    });
    console.log(`Id board from setting: ${response.boardId}`);
    setBoardId(response.boardId);
  }

  const isGameLoaded = boardState !== null;

  const onCellClick = (rowIndex: number, cellIndex: number) => {
    if (boardId) return;
    if (startingCellNumber >= maxStartingCellsNumber ) {
      setMessage(`No more than ${maxStartingCellsNumber} starting cells`);
      return;
    }
    setStartingCellNumber((prev) => prev + 1);
    console.log(`Row index: ${rowIndex} - Cell index: ${cellIndex}`);
    setBoardState((prev) => {
      return prev.map((row, rIndex) => {
        if (rIndex === rowIndex) {
          return row.map((cell, cIndex) => cellIndex === cIndex ? 1 : cell)
        } else return row;
      });
    })
  };

  const restartGame = () => {
    setStartingCellNumber(0);
    setBoardState(generateBlankBoard(boardDimension));
    setBoardId(null);
  }

  console.log(`Board id: ${boardId}`);
  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {!isGameLoaded && (
          <>
            <Button
              variant="contained"
              onClick={displayBlankBoard}
              sx={{ mr: '2rem' }}
            >
              {'Start game'}
            </Button>
            <TextField
              defaultValue={boardDimension}
              onChange={(event) =>
                setBoardDimension(parseInt(event.target.value))
              }
              type="number"
              size="small"
            />
          </>
        )}
        {isGameLoaded && (
          <>
            <Typography sx={{ mr: '1rem' }}>
              {boardId ? 'Your turn' : `Click max ${maxStartingCellsNumber}`}
            </Typography>
            <Button
              variant="contained"
              onClick={boardId === null ? establishBoard : tickGame}
            >
              {boardId === null ? 'Im ready' : 'Next generation'}
            </Button>
          </>
        )}
      </Stack>
      {message && <Alert severity="warning">{message}</Alert>}
      {isGameLoaded && (
        <Box sx={{ pt: '2rem' }}>
          <BoardGrid board={boardState} onCellClick={onCellClick} />
        </Box>
      )}
      {isGameLoaded && (
        <Stack direction="row" justifyContent="center" sx={{ pt: '0.5rem' }}>
          <Button variant="contained" onClick={restartGame}>
            {'Restart game'}
          </Button>
        </Stack>
      )}
    </>
  );
};
