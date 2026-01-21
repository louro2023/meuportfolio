# DevPortfólio - Henrique Louro

Este projeto é um portfólio profissional desenvolvido com **React**, **TypeScript** e **Tailwind CSS**. Este guia ajudará você a configurar e executar o ambiente de desenvolvimento localmente usando o Visual Studio Code.

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

1.  **Node.js** (Versão 18 ou superior): [Baixar Node.js](https://nodejs.org/)
    *   O Node.js inclui o gerenciador de pacotes `npm`, necessário para instalar as dependências.
2.  **Visual Studio Code**: [Baixar VS Code](https://code.visualstudio.com/)

## 🚀 Como Iniciar no VS Code

Siga os passos abaixo para rodar o projeto em sua máquina:

### 1. Abrir o Projeto
1.  Abra o Visual Studio Code.
2.  Vá em **File** > **Open Folder...** (Arquivo > Abrir Pasta...).
3.  Selecione a pasta onde os arquivos deste projeto estão salvos.

### 2. Configurar a Foto de Perfil
Para que sua foto apareça no site:
1.  Crie uma pasta chamada **`public`** na raiz do projeto (fora da pasta `src` ou `components`).
2.  Coloque sua foto dentro dessa pasta `public`.
3.  Renomeie a foto para **`profile.jpg`**.

*Nota: Você também pode alterar a foto diretamente pela Área do Desenvolvedor no site rodando.*

### 3. Abrir o Terminal
No VS Code, abra o terminal integrado:
*   Pressione as teclas `Ctrl + '` (aspas simples).
*   Ou vá no menu superior: **Terminal** > **New Terminal**.

### 4. Instalar Dependências
No terminal que abriu na parte inferior, digite o seguinte comando e aperte Enter:

```bash
npm install
```

*Aguarde o término da instalação. Uma pasta chamada `node_modules` será criada automaticamente.*

### 5. Rodar o Projeto
Após a instalação, inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

O terminal exibirá uma mensagem parecida com:
`  ➜  Local:   http://localhost:5173/`

Segure a tecla **Ctrl** e clique no link `http://localhost:5173/` para abrir o portfólio no seu navegador padrão.

## 🔐 Área do Desenvolvedor (Admin)

O site possui uma área restrita para editar o conteúdo localmente.

1.  Role a página até o **rodapé (Footer)**.
2.  Procure por um pequeno ícone de **cadeado (🔒)** ao lado dos créditos "Desenvolvido com React...".
3.  Clique nele para abrir o painel.
4.  Lá você poderá:
    *   Fazer upload de uma nova foto de perfil.
    *   Adicionar novos projetos ao portfólio.
    *   As alterações são salvas no seu navegador (LocalStorage).

## 🛠 Comandos Úteis

*   `npm run dev`: Inicia o servidor de desenvolvimento.
*   `npm run build`: Gera a versão otimizada para produção na pasta `dist`.
*   `npm run preview`: Visualiza a versão de produção localmente.

## 📁 Estrutura de Arquivos

*   `public/`: Local para imagens estáticas (coloque seu `profile.jpg` aqui).
*   `components/`: Contém os componentes React.
*   `context/`: Gerenciamento de estado (Area do Desenvolvedor).
*   `index.html`: Arquivo principal HTML.
*   `index.tsx`: Ponto de entrada da aplicação React.
*   `constants.tsx`: Dados iniciais padrão.
