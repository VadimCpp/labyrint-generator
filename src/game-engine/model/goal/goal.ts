import { useState, useCallback, useEffect } from 'react'
import { Target, Position, Goal } from '../../../types'
import { getTargets } from './goal-logic'

export default function useGoal(board: string[], onModelAction: (action: string) => void): Goal {
  const [targets, setTargets] = useState<Target[]>([])

  const initTargets = useCallback(() => {
    setTargets(getTargets(board))    
  }, [board])

  const isTargetReached = useCallback(({row, col}: Position) => {
    const target = targets.find(t => t.row === row && t.col === col)
    return target ? target.isReached : false
  }, [targets])

  const updateTarget = useCallback(({row, col}: Position) => {
    if (targets.find(t => t.row === row && t.col === col)) {
      const newTargets = targets.map(t => {
        if (t.row === row && t.col === col) {
          return { ...t, isReached: true }
        }
        return t
      })
      setTargets([
        ...newTargets
      ])
    }
  }, [targets])

  /**
   * Detect if all the targets is reached
   */
  useEffect(() => {
    if (targets.length) {
      const notReachedTarget = targets.find(t => t.isReached === false)
      if (notReachedTarget === undefined) {
        onModelAction("reach-goal")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets])

  return {
    targets,
    setTargets,
    initTargets,
    isTargetReached,
    updateTarget
  }
}
