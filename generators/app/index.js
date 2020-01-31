var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            
            {
                type: "input",
                name: "project_name",
                message: "Project name? (gulp-twig)",
                default: "gulp-twig"
            },
            {
                type: "input",
                name: "project_version",
                message: "Project version? (1.0.0)",
                default: "1.0.0"
            },
            {
                type: "input",
                name: "project_main",
                message: "Project main end point? (index.js)",
                default: "index.js"
            },
            {
                type: "input",
                name: "project_license",
                message: "License? (MIT)",
                default: "MIT"
            },
            {
                type: "input",
                name: "branch",
                message: "Deploy branch? (master)",
                default: "master"
            },
            {
                type: "input",
                name: "assets",
                message: "Assets directory name? (assets)",
                default: "assets"
            },
            {
                type: "input",
                name: "src",
                message: "Development directory? (src)",
                default: "src"
            },
            {
                type: "input",
                name: "build",
                message: "Build directory? (build)",
                default: "build"
            }
        ])
    }
    writing() {
        this.fs.copyTpl(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore'),
            {
                build: this.answers.build
            }
        )
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            {
                branch: this.answers.branch,
                assets: this.answers.assets,
                src: this.answers.src,
                build: this.answers.build
            }
        )
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                project_license: this.answers.project_license,
                project_name: this.answers.project_name,
                project_main: this.answers.project_main,
                project_version: this.answers.project_version
            }
        )

        this.fs.copyTpl(
            this.templatePath('src/assets/scss/style.scss'),
            this.destinationPath(`${this.answers.src}/assets/scss/style.scss`)
        )
        this.fs.copyTpl(
            this.templatePath('src/shared/main.twig'),
            this.destinationPath(`${this.answers.src}/shared/main.twig`)
        )
        this.fs.copyTpl(
            this.templatePath('src/pages/index.twig'),
            this.destinationPath(`${this.answers.src}/pages/index.twig`)
        )
        this.fs.copyTpl(
            this.templatePath('src/pages/page_1.twig'),
            this.destinationPath(`${this.answers.src}/pages/page_1.twig`)
        )
        this.fs.copyTpl(
            this.templatePath('src/pages/page_2.twig'),
            this.destinationPath(`${this.answers.src}/pages/page_2.twig`)
        )
        this.fs.copyTpl(
            this.templatePath('src/pages/page_2.js'),
            this.destinationPath(`${this.answers.src}/pages/page_2.js`)
        )
    }
    async install() {
        const answers = await this.prompt([
            {
                type: "list",
                name: "install",
                message: "Yarn or Npm?",
                choices: ["Yarn", "Npm", "Install later"]
            }
        ])
        if(answers.install !== "Install later") {
            this.log("Installing......");
            if(answers.install === "Npm") {
                await this.npmInstall();
            }
            if(answers.install === "Yarn") {
                await this.yarnInstall();
            }
        }
    }
};