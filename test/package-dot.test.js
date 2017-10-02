import { assert } from 'chai'
import PackageDot from '../src/package-dot'

describe('PackageDot', function () {
    describe('when given a json object', function () {
        const json = JSON.stringify({a:1,b:2,c:3})
        const pd = new PackageDot(json)
        it('will parse it and store it as a property', function () {
            assert.deepEqual(pd.getPackage(), {a:1,b:2,c:3})
        })
    })
})

describe('#add', function () {
    const json = JSON.stringify({a:1,b:2,c:3})
    const pd = new PackageDot(json)
    describe('when given a key-value pair', function () {
        const added = {d:4}
        const withAdded = {a:1,b:2,c:3,d:4}
        pd.add(added)
        it('will add the key and value in the package object', function () {
            assert.deepEqual(pd.getPackage(), withAdded)
        })
    })
})