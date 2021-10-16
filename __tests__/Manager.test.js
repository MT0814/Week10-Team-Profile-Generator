const Manager = require('../lib/Manager')

describe('manager test', () => {
    test('it test getOfficeNumber()', () => {
        const manager = new Manager('Millie', '081419', 'millie_tsai@me.com', '12')
        expect(manager.getOfficeNumber()).toBe('12')

    })
    test('it test getRole()', () => {
        const manager = new Manager('Millie', '081419', 'millie_tsai@me.com', '12')
        expect(manager.getRole()).toBe('Manager')

    })


})