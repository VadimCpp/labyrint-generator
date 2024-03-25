import { useEffect, useState } from 'react';
import { Direction, Level } from '../../types';
import Board from '../board/board';
import useDrone from '../../game-engine/model/drone/drone';
import useGoal from '../../game-engine/model/goal/goal';

interface SolverProps {
	initialLevel: Level;
  path: Direction[];
}

export default function Solver({ initialLevel, path }: SolverProps) {
	const goal = useGoal(initialLevel.map, () => {})
  const drone = useDrone(initialLevel.map, goal.updateTarget)
  const [step, setStep] = useState<number>(0)

	useEffect(() => {
		drone.initStartPosition()
    goal.initTargets()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  useEffect(() => {
    const timerId: NodeJS.Timeout = setTimeout(() => {
      if (!drone.lock) {
        if (path[step]) {
          drone.move(path[step])
        }

        const extraStep = 10
        const nextStep = step + 1
        if (nextStep < path.length) {
          setStep(nextStep)
          if (drone.position) {
            goal.updateTarget(drone.position)
          }
        } else if (nextStep < path.length + extraStep) {
          setStep(nextStep)
          if (drone.position) {
            goal.updateTarget(drone.position)
          }
        } else {
          setStep(0)
          drone.initStartPosition()
          goal.initTargets()
        }
      }
    }, 100) 

    return () => clearInterval(timerId)
  }, [step, drone.lock, drone.position])

	return (
		<div className='solver'>
			<Board
				level={{map: initialLevel.map, minMoves: 0, minTime: 0}}
				drone={{ position: drone.position, speed: drone.speed, direction: drone.direction }}
				goal={goal}
				boardSize={400}
			/>
		</div>
	);
}
