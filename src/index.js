const inquirer = require('inquirer');
var shell = require('shelljs');
var figlet = require('figlet');
import Listr from 'listr';
import chalk from 'chalk';

const cli = require('meow')(`
  Usage: generate-npm-package

  Other options:
    -h, --help         show usage information
    -v, --version      print version info and exit
`, {
  boolean: ['help', 'version'],
  alias: { h: 'help', v: 'version' }
});

const  generateProject = async (options) => {
    const tasks = new Listr([
        {
            title: 'Created project',
            task: () => cloneProject(options),
        },
        {
            title: 'Installed dependencies.',
            task: () => {
                options.isInstall ? 
                installDependencies() :
                null
            },
            skip: () => {
                return !options.isInstall ? 
                    'Pass --install dependencies'
                    : undefined
            }
        },
    ]);

    await tasks.run();
    console.log(chalk.green(`Project '${options.projectName}' created successfully.`));
}

const cloneProject = (options) => {
    if ( !shell.which('git') ) {
        shell.echo(chalk.red('Error:: This script requires git'), 'Install Git');
        shell.echo(chalk.cyan('$ sudo apt-get update \n$ sudo apt-get install git'));
        shell.exit(1);
    }

    shell.exec('git --version')
    console.log('Running :: git clone https://github.com/aniltako/create-npm-package-js.git', '')
    if ( shell.exec(`git clone https://github.com/aniltako/create-npm-package-js.git`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    initGit(options);
    initPackageJson(options);
    initSemanticRelease(options);
    initTravis(options);

}

const initGit = (options) => {

    if ( options.projectName !== 'create-npm-package-js') {
        if ( shell.exec(`mv create-npm-package-js ${options.projectName}`).code !== 0 ) {
            shell.echo(chalk.red('Error: Create project fail'));
            shell.exit(1);
        } 
    }

    if ( shell.cd(`${options.projectName}`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.exec('rm -rf .git/').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

}

const initSemanticRelease = (options) => {
    if ( options.isSemanticRelease ) {
        setupSemanticRelease(options);
    } else {
        setupDefaultConfig(options);
    }
}

const initPackageJson = () => {
    if ( shell.exec('rm package.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.exec('rm package-lock.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }
}

const setupSemanticRelease = (options) => {
    if ( shell.exec('rm package.template.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.sed('-i', 'create-npm-package-js', options.projectName, 'package.semantic.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 

    if ( shell.exec(`mv package.semantic.json package.json`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 
}

const setupDefaultConfig = (options) => {
    if ( shell.exec('rm package.semantic.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.sed('-i', 'create-npm-package-js', options.projectName, 'package.template.json').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 

    if ( shell.exec(`mv package.template.json package.json`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 
}

const initTravis = (options) => {
    if ( shell.exec('rm .travis.yml').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( options.isTravis && options.isSemanticRelease ) {
        setupSemanticReleaseTravis();
    } else if ( options.isTravis && !options.isSemanticRelease ) {
        setupTravis();
    } else {
        if ( shell.exec('rm .travis.template.yml').code !== 0 ) {
            shell.echo(chalk.red('Error: Create project fail'));
            shell.exit(1);
        }
        if ( shell.exec('rm .travis.semantic.yml').code !== 0 ) {
            shell.echo(chalk.red('Error: Create project fail'));
            shell.exit(1);
        }
    }
}

const setupSemanticReleaseTravis = () => {

    if ( shell.exec('rm .travis.template.yml').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.exec(`mv .travis.semantic.yml .travis.yml`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 
}


const setupTravis = () => {
    if ( shell.exec('rm .travis.semantic.yml').code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    }

    if ( shell.exec(`mv .travis.template.yml .travis.yml`).code !== 0 ) {
        shell.echo(chalk.red('Error: Create project fail'));
        shell.exit(1);
    } 
}

const installDependencies = () => {
    console.log('Running :: ', `npm install`)
    if ( shell.exec(`npm install`).code !== 0 ) {
        shell.echo(chalk.red('Error: Install Dependencies failed.'));
        shell.exit(1);
    }
}

const init = () => {
    console.log(
      chalk.green(
        figlet.textSync("Create NPM package.", {
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
}

const askQuestions = () => {
    const questions = [
        {
            name: 'projectName',
            message: 'project name?',
            default: 'create-npm-package-js',
            validate: function (input) {
                  if (!input) {
                    return 'You need to provide a project name';
                  }
                  return true;
              }
        },
        {
            type: 'confirm',
            name: 'isSemanticRelease',
            message: 'Use Semantic Release ?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'isTravis',
            message: 'Travis setup ?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'isInstall',
            message: 'Do you want to install dependencies ?',
            default: false,
        }
    ]
    return inquirer.prompt(questions);
}



const run = async (argv, cli) => {
    if ( cli.flags.v ) {
        cli.showVersion();
    }

    init();
    const answers = await askQuestions();
    const options = {
        ...answers,
        projectName: answers.projectName || 'create-npm-package-js'
    }
    generateProject(options)
}

run(process.argv, cli);