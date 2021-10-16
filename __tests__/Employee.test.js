const Employee = require('../lib/Employee')

describe('employee test', () => {
    test('it test getName()', () => {
        const employee = new Employee('Millie', '081419', 'millie_tsai@me.com')
        expect(employee.getName()).toBe('Millie')

    })
    test('it test getId()', () => {
        const employee = new Employee('Millie', '081419', 'millie_tsai@me.com')
        expect(employee.getId()).toBe('081419')

    })
    test('it test getEmail()', () => {
        const employee = new Employee('Millie', '081419', 'millie_tsai@me.com')
        expect(employee.getEmail()).toBe('millie_tsai@me.com')

    })
    test('it test getRole()', () => {
        const employee = new Employee('Millie', '081419', 'millie_tsai@me.com')
        expect(employee.getRole()).toBe('Employee')

    })

})