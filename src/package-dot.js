class PackageDot {
    constructor (pkg) {
        this.getPackage = this.getPackage.bind(this)
        this.getProp = this.getProp.bind(this)
        this.getPropFrom = this.getPropFrom.bind(this)
        this.add = this.add.bind(this)
        this.addTo = this.addTo.bind(this)
        this.pushTo = this.pushTo.bind(this)
        this.remove = this.remove.bind(this)
        this.removeFrom = this.removeFrom.bind(this)
        this.toJSON = this.toJSON.bind(this)
        this.pkg = JSON.parse(pkg)
    }

    getPackage () {
        return this.pkg
    }

    getProp (prop) {
        if (this.pkg[prop] === undefined)
            throw new Error('Cannot get key that does not exist')
        return this.pkg[prop]
    }

    getPropFrom (nestedProp, prop) {
        if (this.pkg[prop] === undefined)
            throw new Error('Cannot get key that does not exist')
        if(this.pkg[prop][nestedProp] === undefined)
            throw new Error('Cannot get entry that does not exist')
        return this.pkg[prop][nestedProp]
    }

    add (obj) {
        this.pkg = Object.assign({}, this.pkg, obj)
        return this
    }

    addTo (obj, target) {
        if (!this.pkg[target]) {
            throw new Error('Cannot add to key that does not exist')
        }
        if (typeof obj !== 'object')
            throw new Error('Cannot resolve addTo. Entry must be object.')
        this.pkg[target] = Object.assign({}, this.pkg[target], obj)
        return this
    }

    pushTo (entry, target) {
        if (!this.pkg[target])
            throw new Error('Cannot push to key that does not exist')
        if (!Array.isArray(this.pkg[target]))
            throw new Error('Cannot push value to non-array')
        this.pkg[target].push(entry)
        return this
    }

    remove (key) {
        delete this.pkg[key]
        return this
    }

    removeFrom (entry, target) {
        if (Array.isArray(this.pkg[target])) {
            if (this.pkg[target].indexOf(entry) > -1) {
                let i = this.pkg[target].indexOf(entry)
                this.pkg[target].splice(i,1)
            }
        }
        else delete this.pkg[target][entry]
        return this
    }

    toJSON () {
        return JSON.stringify(this.pkg)
    }
}

export default PackageDot
