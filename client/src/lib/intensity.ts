// This very tiny library is for converting a number to an intensity
export type Intensity = 'Extreme' | 'Strong' | 'Average' | 'Okay' | 'Weak'

export function toIntensity(value: number): Intensity {
    if (value > .90)
        return 'Extreme'
    else if (value > .65)
        return 'Strong'
    else if (value > .45)
        return 'Average'
    else if (value > .25)
        return 'Okay'
    else
        return 'Weak'
}