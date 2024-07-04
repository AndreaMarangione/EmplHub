const now = new Date()

export default [
    {
        id: 1,
        title: 'Primo appuntamento',
        start: new Date('2024/7/4'),
        end: new Date('2024/8/4'),

    },
    {
        id: 2,
        title: 'Secondo appuntamento',
        start: now,
        end: now,
    }
]
