import { useEffect, useState } from 'react';
import { Direction, Level } from '../../types';
import Board from '../board/board';
import useDrone from '../../game-engine/model/drone/drone';

interface SolverProps {
	initialLevel: Level;
}

const path = [
  Direction.RIGHT,
  Direction.DOWN,
  Direction.LEFT,
  Direction.UP,
]

export default function Solver({ initialLevel }: SolverProps) {
	const drone = useDrone(initialLevel.map)
  const [step, setStep] = useState<number>(0)
  const [targetState, setTargetState] = useState<boolean>(false)

	useEffect(() => {
		drone.initStartPosition()
	}, [])

  useEffect(() => {
    const timerId: NodeJS.Timeout = setTimeout(() => {
      console.log('step', step)
      if (!drone.lock) {
        drone.move(path[step])

        const nextStep = step + 1
        if (nextStep < path.length) {
          setStep(nextStep)
          if (drone.position && drone.position.row === 1 && drone.position.col === 10) {
            setTargetState(true)
          }
        } else {
          setStep(0)
          setTargetState(false)
        }
      }
      drone.move(path[step])
    }, 100) 

    return () => clearInterval(timerId)
  }, [step, drone.lock])

	return (
		<div className='solver'>
			<Board
				level={{map: initialLevel.map, minMoves: 0, minTime: 0}}
				drone={{ position: drone.position, speed: drone.speed, direction: drone.direction }}
				goal={{ getTargetState: () => targetState }}
				boardSize={400}
			/>
		</div>
	);
}
