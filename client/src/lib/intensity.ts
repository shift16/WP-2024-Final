// This very tiny library is for converting a number to an intensity
export type Intensity = 'Extreme' | 'Strong' | 'Average' | 'Okay' | 'Weak' | 'Unknown'

export function toIntensity(value: number): Intensity {
    if (value > .90)
        return 'Extreme'
    else if (value > .65)
        return 'Strong'
    else if (value > .45)
        return 'Average'
    else if (value > .25)
        return 'Okay'
    else if (value > 0)
        return 'Weak'
    else
        return 'Unknown'
}

export function toNumber(value: Intensity) {
   switch (value) {
    case 'Extreme':
        return 1
    case 'Strong':
        return 0.75
    case 'Average':
        return 0.5
    case 'Okay':
        return 0.35
    case 'Weak':
        return 0.15
    case 'Unknown':
        return 0
   }
}