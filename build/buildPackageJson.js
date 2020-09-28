var fs = require('fs')
module.exports = function(packageSrc, dest) {
	var packageJson = JSON.parse(fs.readFileSync(packageSrc, 'utf8'))
	delete packageJson['devDependencies']
	delete packageJson['scripts']
	fs.writeFile(dest, JSON.stringify(packageJson,0,4))
}