// Layout and game logic
export const DEFAULT_CELLS_NUMBER = 10
export const MIN_CELLS_NUMBER = 5
export const MAX_CELLS_NUMBER = 20
export const DRONE_SPEED = 50; // ms per cell

// Enums
export const CellType = {
	EMPTY: " ",
	WALL_ASIDE: "_",
	WALL_MID: "=",
	WALL_TOP: "#",
	PRIS: "t",
	PRISER: "f",
	DRONE: "p"
}
export const TargetState = {
	NOT_REACHED: false,
	REACHED: true
}
export const MoveDirection = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

// Levels
export const LEVELS = [
	{
		map: [
			"____________",
			"_p    #    _",
			"_ #      ##_",
			"_ =        _",
			"_ =#       _",
			"_ =       #_",
			"_  ###    t_",
			"_    =##  #_",
			"_        #=_",
			"_        ==_",
			"_        ==_",
			"____________",
		],
		minMoves: 6,
		minTime: 3000,
	},
	{
		map: [
			"____________",
			"_ #     #  _",
			"_   ###    _",
			"_          _",
			"_       ## _",
			"_## #p#    _",
			"_   ===#  #_",
			"_    =t=   _",
			"_#         _",
			"_          _",
			"_    #    #_",
			"____________",
		],
		minMoves: 15,
		minTime: 6500,
	},
	{
		map: [
			"____________",
			"_   #    ##_",
			"_          _",
			"_#  #    #t_",
			"_       #=#_",
			"_p   #     _",
			"_    =#    _",
			"_ #        _",
			"_#=        _",
			"_          _",
			"_  #   ## #_",
			"____________",
		],
		minMoves: 10,
		minTime: 4000,
	},
	{
		map: [
			"____________",
			"_       #  _",
			"_  #  #    _",
			"_#    =#  #_",
			"_p   #     _",
			"_#        #_",
			"_       # =_",
			"_ #  #    t_",
			"_  #      #_",
			"_# =     # _",
			"_     # #  _",
			"____________",
		],
		minMoves: 13,
		minTime: 3800,
	},
	{
		map: [
			"____________",
			"_ #    #   _",
			"_   # # p #_",
			"_     =    _",
			"_        # _",
			"_ #   ###  _",
			"_     =   #_",
			"_          _",
			"_#   #     _",
			"_  #t=   # _",
			"_        = _",
			"____________",
		],
		minMoves: 18,
		minTime: 5000,
	},
	{
		map: [
			"____________",
			"_f #      f_",
			"_#    ##   _",
			"_      =   _",
			"_          _",
			"_          _",
			"_          _",
			"_          _",
			"_ #  #f  # _",
			"_     #   #_",
			"_f#   p # f_",
			"____________",
		],
		minMoves: 23,
		minTime: 7000,
	},
	{
		map: [
			"____________",
			"_ f     f# _",
			"_#    ##  f_",
			"_f     =   _",
			"_ #        _",
			"_          _",
			"_f         _",
			"_#   p    #_",
			"_   ##    f_",
			"_#  =   ###_",
			"_  f    f  _",
			"____________",
		],
		minMoves: 18,
		minTime: 7000,
	},
	{
		map: [
			"____________",
			"_f  #     f_",
			"_##f   ####_",
			"_ =    f   _",
			"_      #   _",
			"_    p     _",
			"_         #_",
			"_  ##   #f _",
			"_  f=   =# _",
			"_          _",
			"_f#       f_",
			"____________",
		],
		minMoves: 18,
		minTime: 5500,
	},
	{
		map: [
			"____________",
			"_ #   #f   _",
			"_f      #  _",
			"_##  #    #_",
			"_p=        _",
			"_          _",
			"_    #     _",
			"_    =#  #f_",
			"_#       =#_",
			"_f   #    f_",
			"_ #   f#   _",
			"____________",
		],
		minMoves: 27,
		minTime: 7500,
	},
]
