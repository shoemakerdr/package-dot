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
    
    it('returns itself so it can be chained', function () {
        const added = {c:3}
        pd.add(added)
        assert.isTrue(pd.add(added) instanceof PackageDot)
    })
    
    it('will add a given object to the package', function () {
        const added = {d:4}
        const withAdded = {a:1,b:2,c:3,d:4}
        pd.add(added)
        assert.deepEqual(pd.getPackage(), withAdded)
    })
    
    it('will overwrite an existing key if existing key is present in the arg object', function () {
        const added = {c:4}
        const withAdded = {a:1,b:2,c:4, d:4}
        pd.add(added)
        assert.deepEqual(pd.getPackage(), withAdded)
    })
})

describe('#pushTo', function () {
    const json = JSON.stringify({a:1,b:2,c:[1,2]})
    const pd = new PackageDot(json)
    
    it('returns itself so it can be chained', function () {
        const pushed = 3
        assert.isTrue(pd.pushTo(pushed, 'c') instanceof PackageDot)
    })
    
    it('will append a given value to an array in a given key', function () {
        const pushed = 4
        const withPushed = {a:1,b:2,c:[1,2,3,4]}
        pd.pushTo(pushed, 'c')
        assert.deepEqual(pd.getPackage(), withPushed)
    })
    
    it('will throw error when given a key that does not exist', function () {
        const pushed = 1
        assert.throws(() => pd.pushTo(pushed, 'd'), 'Cannot push to key that does not exist')
    })
    
    it('will throw error when given entry on object is not an array', function () {
        const pushed = 1
        const push = () => pd.pushTo(pushed, 'a')
        assert.throws(push, 'Cannot push value to non-array')
    })
})

describe('#addTo', function () {
    const json = JSON.stringify({a:1,b:{a:1}})
    const pd = new PackageDot(json)
    
    it('returns itself so it can be chained', function () {
        assert.isTrue(pd.addTo({b:2}, 'b') instanceof PackageDot)
    })
    
    it('will add an entry to a given target key', function () {
        const withAdded = {a:1,b:{a:1,b:2,c:3}}
        pd.addTo({c:3}, 'b')
        assert.deepEqual(pd.getPackage(), withAdded)
    })
})