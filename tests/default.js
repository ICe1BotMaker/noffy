import express from 'express';
import requestIp from 'request-ip';
import noffy from '../index.js';

const app = express();

app.use(requestIp.mw());
app.use(noffy());

app.post(`/post`, (req, res) => {
    res.send(`siiiii`);
});

app.get(`/`, (req, res) => {
    fetch(`http://127.0.0.1:8080/post`, {
        method: `POST`,
        body: JSON.stringify({})
    });

    res.send(`send`);
});

app.listen(8080);