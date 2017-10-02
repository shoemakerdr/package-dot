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