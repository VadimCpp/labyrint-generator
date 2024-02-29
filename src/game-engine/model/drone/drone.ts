
import { useState, useCallback, useEffect } from "react";
import { Position, Direction } from "../../../types";
import { getDroneStartPosition, moveDrone, calculateDroneSpeed } from "./drone-logic";

export default function useDrone(board: string[]){
  const [position, setPosition] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [speed, setSpeed] = useState<string | number>("unset");
  const [moveCount, setMoveCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);

  const initStartPosition = useCallback(() => {
    setPosition(getDroneStartPosition(board))
    setDirection(null)
    setSpeed("unset")
    setMoveCount(0)
    setLock(false)
  }, [board])

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (direction && speed && lock) {
      timerId = setTimeout(() => {
        setDirection(null)
        setSpeed("unset")
        setLock(false)
      }, parseInt(String(speed)))
    }

    return () => clearTimeout(timerId)
  }, [direction, speed, lock]);

  const move = useCallback((direction: Direction) => {
    if (!lock && position) {
      const newDronePosition = moveDrone(board, position, direction);
      if (newDronePosition) {
        // set direction, speed and lock
        setDirection(direction);
        setSpeed(calculateDroneSpeed(position, newDronePosition));
        setLock(true);
        // set new position and increment move count
        setPosition(newDronePosition);
        setMoveCount(moveCount + 1);
      } else {
        // not successfull
      }
    } else {
      // is not successfull to position
    }
  }, [position, moveCount, lock, board]);

  return {
    position,
    direction,
    speed,
    moveCount,
    lock,
    move,
    initStartPosition,
  }
}
