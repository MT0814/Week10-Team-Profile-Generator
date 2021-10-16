const Engineer = require('../lib/Engineer')

describe('engineer test', () => {
    test('it test getGithub()', () => {
        const engineer = new Engineer('Millie', '081419', 'millie_tsai@me.com', 'MT0814')
        expect(engineer.getGithub()).toBe('MT0814')

    })
    test('it test getRole()', () => {
        const engineer = new Engineer('Millie', '081419', 'millie_tsai@me.com', 'MT0814')
        expect(engineer.getRole()).toBe('Engineer')

    })


})