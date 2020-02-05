'use strict';
const zip = new require('node-zip')();
const path = require('path');
const fs = require('fs');

class BuildError {
	constructor(name, message) {
		this.name = name;
		this.message = message;
		this.type = "HeaseWebpackPluginError";
	}
}

/**
 * Find all files inside a dir, recursively.
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
const getAllFiles = dir =>
	fs.readdirSync(dir).reduce((files, file) => {
		const name = path.join(dir, file);
		const isDirectory = fs.statSync(name).isDirectory();
		return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
	}, []);


class SimpleWebpackPlugin {
	constructor(options) {
		this.options = options || {};

		if (!this.options.buildPath) {
			this.options.buildPath = "dist";
		}
	}

	apply(compiler) {
		compiler.hooks.entryOption.tap("SimpleWebpackPluginGetEntry", (context, entry) => {
			console.log(context, entry)
			if (!this.options.context) {
				this.options.context = context;
			}else{
				this.options.context = path.resolve(context, this.options.context);
			}

			this.entry = entry;
		});

		compiler.hooks.emit.tap("SimpleWebpackPluginEmitBuild", (compilation) => {
			try {
				this.buildAppZip(this.entry)
			} catch (e) {
				compilation.errors.push(new Error(`${e.type}: ${e.name} -> ${e.message}`));
			}
		});
	}

	buildAppZip() {
		if (!fs.existsSync(this.options.buildPath)) {
			fs.mkdirSync(this.options.buildPath);
		}

		const allFiles = getAllFiles(path.join(this.options.context, "src"));
		allFiles.forEach(file => {
			zip.file(file.substring(this.options.context.length + 1, file.length), fs.readFileSync(file));
		})
		const data = zip.generate({base64: false, compression: 'DEFLATE'});
		fs.writeFileSync(path.join(this.options.buildPath, `archive.zip`), data, 'binary');
	}
}

module.exports = SimpleWebpackPlugin;