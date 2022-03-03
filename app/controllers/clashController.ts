type Player = {
    summonerId: string
}

function getClashBySummoner(summonerId: number): Player {
    return {summonerId: '1'}
}

export default {getClashBySummoner}
