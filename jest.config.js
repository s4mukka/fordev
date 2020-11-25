module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '!<rootDir>/src/main/**/*',
        '!<rootDir>/src/presentation/router/**/*',
        '!<rootDir>/src/data/protocols/**/*',
        '!<rootDir>/src/domain/models/**/*',
        '!<rootDir>/src/domain/usecases/**/*',
        '!<rootDir>/src/validation/protocols/**/*',
        '!**/*.d.ts'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.+\\.(?:ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '\\.scss$': 'identity-obj-proxy'
    }
}
