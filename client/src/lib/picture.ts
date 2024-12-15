// This function was duplicated in multiple locations so it's better to just make a tiny library and reuse it from one spot
export function generatePicture(str: string): string {
    switch (str) {
        case 'Girl':
            return '/professional-woman.jpg'
        case 'Firefighter':
            return '/professional-firefighter.jpg'
        case 'Default':
        case 'Guy':
        default:
            return '/professional-man.jpg'
    }
}