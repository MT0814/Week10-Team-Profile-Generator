const Intern = require('../lib/Intern')

describe('intern test', () => {
    test('it test getSchool()', () => {
        const intern = new Intern('Millie', '081419', 'millie_tsai@me.com', 'UW')
        expect(intern.getSchool()).toBe('UW')

    })
    test('it test getRole()', () => {
        const intern = new Intern('Millie', '081419', 'millie_tsai@me.com', 'UW')
        expect(intern.getRole()).toBe('Intern')

    })


})