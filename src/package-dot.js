class PackageDot {
    constructor (pkg) {
        this.getPackage = this.getPackage.bind(this)
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.toJSON = this.toJSON.bind(this)
        this.pkg = JSON.parse(pkg)
    }

    getPackage () {
        return this.pkg
    }

    add (obj) {
        this.pkg = Object.assign({}, this.pkg, obj)
        return this
    }

    addTo (obj, target) {
        if (!this.pkg[target]) {
            throw new Error('Cannot add to key that does not exist')
        }
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

    update (key, value) {
        if (!this.pkg[key]) {
            throw new Error('Cannot update key that does not exist')
        }
        this.pkg = Object.assign({}, {[key]:value}, this.pkg)
        return this
    }

    remove (key) {
        delete this.pkg[key]
        return this
    }

    toJSON () {
        return JSON.stringify(this.pkg)
    }
}

export default PackageDot