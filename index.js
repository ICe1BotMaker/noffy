import { CLIApplication, CLILabel } from 'nodecli-gui';
import chalk from 'chalk';

const app = new CLIApplication();

let cli_console_arr = [];

const key = new CLILabel({ text: `none` });
app.addComponent(key.return(), { x: 0, y: 1 });

const method = new CLILabel({ text: `method: none` });
app.addComponent(method.return(), { x: 13, y: -1 });

const url = new CLILabel({ text: `url: none` });
app.addComponent(url.return(), { x: 27, y: -1 });

const header = new CLILabel({ text: `none` });
app.addComponent(header.return(), { x: 0, y: 1 });

const line = new CLILabel({ text: `─`.repeat(process.stdout.columns) });
app.addComponent(line.return(), { x: 0, y: 1 });

const cli_console = new CLILabel({ text: cli_console_arr.join(`\n\n`) });
app.addComponent(cli_console.return(), { x: 0, y: 1 });

app.show();

export default function noffy() {
    return (req, res, next) => {
        app.modifyText(key, { text: res.socket.server._connectionKey });
        app.modifyText(method, { text: `method: ${res.socket.parser.incoming.method}` });
        app.modifyText(url, { text: `url: ${res.socket.parser.incoming.url}` });

        app.modifyText(header, { text: req.rawHeaders.join(` `) });

        cli_console_arr = [`${chalk.bgCyanBright.black(` ${res.socket.parser.incoming.method} `)} ${chalk.bgMagenta.whiteBright(` ${res.socket.parser.incoming.url} `)} ${res.socket.server._connectionKey} ${chalk.underline(req.clientIp)}`, ...cli_console_arr];

        app.modifyText(cli_console, { text: cli_console_arr.slice(0, process.stdout.rows - 25).join(`\n\n`) });

        next();
    }
}