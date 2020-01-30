var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    writing() {
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            {
                branch: "master",
                assets: "assets",
                src: "src",
                dist: "dist"
            }
        )
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                project_license: "MIT",
                project_name: "hehe",
                project_main: "index.js",
                project_version: "1.0.0"
            }
        )
    }
};