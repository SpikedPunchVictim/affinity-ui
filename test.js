const { create, test } = require('affinity')

let project = create()
test.fill.project(project)

console.dir(project)
