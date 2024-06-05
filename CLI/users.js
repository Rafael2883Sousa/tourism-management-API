const fs = require('fs');

function registrarUsuario(username, password, additionalInfo = {}) {
    // Verificar se o arquivo Users.json existe
    fs.access('Users.json', fs.constants.F_OK, (err) => {
        if (err) {
            // Se o arquivo não existir, criar uma estrutura inicial
            const data = { users: [] };
            adicionarUsuario(data, username, password, additionalInfo);
        } else {
            // Se o arquivo existir, ler os dados e adicionar o novo usuário
            fs.readFile('Users.json', (err, data) => {
                if (err) throw err;
                const jsonData = JSON.parse(data);
                adicionarUsuario(jsonData, username, password, additionalInfo);
            });
        }
    });
}

function adicionarUsuario(data, username, password, additionalInfo) {
    // Verificar se o nome de usuário já existe
    const usuarioExistente = data.users.find((user) => user.username === username);
    if (usuarioExistente) {
        console.log('Erro: Nome de usuário já existe.');
        return;
    }

    // Adicionar novo usuário à lista
    const newUser = { username, password, ...additionalInfo };
    data.users.push(newUser);

    // Salvar os dados atualizados no arquivo Users.json
    fs.writeFile('Users.json', JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
        console.log('Usuário registrado com sucesso.');
    });
}

// Exemplo
registrarUsuario('user1', 'senha123', { email: 'user1@example.com', nome: 'Fulano' });