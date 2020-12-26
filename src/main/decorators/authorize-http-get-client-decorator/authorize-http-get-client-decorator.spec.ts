import { mockGetRequest, GetStorageSpy } from '@/data/test'
import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'

type SutTypes = {
    sut: AuthorizeHttpGetClientDecorator
    getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)

    return {
        getStorageSpy,
        sut
    }
}

describe('AuthorizeHttpGetClientDecorator', () => {
    test('Should call GetStorage with correct value', () => {
        const { sut, getStorageSpy } = makeSut()
        sut.get(mockGetRequest())

        expect(getStorageSpy.key).toBe('account')
    })
})
