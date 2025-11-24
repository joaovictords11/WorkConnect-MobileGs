# 🚀 Work Connect - Mobile (Global Solution)

Este repositório contém a aplicação móvel da plataforma **Work Connect**, desenvolvida como parte da avaliação **Global Solution**. O aplicativo foi construído utilizando **React Native** com **Expo Router** e consome a API RESTful hospedada no Azure, permitindo que trabalhadores e estudantes compartilhem conhecimentos, dicas e oportunidades de desenvolvimento profissional.

## 📋 Descrição da Solução

O **Work Connect** é uma Comunidade Colaborativa de Aprendizagem focada em resolver o problema da falta de redes de apoio acessíveis para qualificação profissional. O aplicativo móvel permite:

- **Autenticação Segura**: Criação de conta e login para acesso personalizado.
- **Compartilhamento de Conhecimento**: Feed interativo onde usuários publicam dicas, cursos e mentorias.
- **Gestão de Conteúdo**: Funcionalidades completas de CRUD (Criar, Ler, Atualizar e Excluir) para as publicações.
- **Perfil Profissional**: Gestão de dados pessoais e profissionais do usuário.

A solução mobile integra-se perfeitamente ao ecossistema Work Connect, consumindo a mesma base de dados e regras de negócio da aplicação Web/Backend.

## 👥 Integrantes do Grupo

- **João Victor de Souza** - RM: 555290
- **Gustavo Tonato Maia** - RM: 555393
- **Diogo Paquete Weyne** - RM: 558380

---

## 📺 Demonstração (Vídeo)

Confira o vídeo de demonstração com todas as funcionalidades do aplicativo rodando:

[**🔗 CLIQUE AQUI PARA ASSISTIR AO VÍDEO NO YOUTUBE**](https://www.youtube.com/shorts/AaApM39emV4)

---

## 🛠️ Tecnologias Utilizadas

- **React Native** (Framework principal)
- **Expo** (Plataforma de desenvolvimento e build)
- **Expo Router** (Navegação baseada em arquivos)
- **Axios** (Cliente HTTP para integração com API Java/Spring)
- **AsyncStorage** (Persistência de sessão local)
- **TypeScript** (Tipagem estática para maior segurança)

## 📱 Funcionalidades

1.  **Autenticação**:
    - Login (`POST /usuarios/login`)
    - Cadastro (`POST /usuarios/cadastro`)
    - Logout (Limpeza de sessão)
2.  **Feed de Dicas (Home)**:
    - Listagem de dicas (`GET /dicas`)
    - Busca por título/palavra-chave (`GET /dicas?busca=...`)
3.  **Gerenciamento de Dicas**:
    - Publicar nova dica (`POST /dicas`)
    - Ver detalhes da dica
    - Editar dica própria (`PUT /dicas/{id}`)
    - Excluir dica própria (`DELETE /dicas/{id}`)
4.  **Perfil do Usuário**:
    - Visualização de dados
    - Edição de perfil (`PUT /usuarios/{id}`)
    - Exclusão de conta (`DELETE /usuarios/{id}`)
5.  **Extras**:
    - Tela "Sobre" com Hash do Commit de referência.
    - Proteção de rotas (Acesso apenas para usuários logados).

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (LTS recomendado).
- Gerenciador de pacotes (NPM ou Yarn).
- Aplicativo **Expo Go** instalado no celular (Android/iOS) ou um emulador configurado.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/joaovictords11/WorkConnect-MobileGs
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o projeto:**

    ```bash
    npx expo start
    ```

4.  **Teste no dispositivo:**
    - **Celular físico:** Abra o app **Expo Go** e escaneie o QR Code exibido no terminal.
    - **Emulador:** Pressione `a` para abrir no Android Emulator ou `i` para o iOS Simulator.

## 📂 Estrutura do Projeto

```text
/work-connect
│
├── /app                  # Rotas e Telas (Expo Router)
│   ├── /(auth)           # Login e Cadastro (Rotas públicas)
│   ├── /(tabs)           # Abas principais (Feed, Criar, Perfil - Rotas privadas)
│   ├── /dica             # Detalhes e Edição de Dica (Rota dinâmica)
│   ├── _layout.tsx       # Configuração raiz, Contexto de Auth e Proteção de Rotas
│   └── about.tsx         # Tela Sobre o App
│
├── /src
│   ├── /components       # Componentes visuais reutilizáveis
│   ├── /constants        # Cores (Colors.ts) e estilos globais
│   ├── /context          # AuthContext (Gerenciamento de sessão)
│   ├── /services         # Configuração da API (Axios)
│   └── /types            # Interfaces TypeScript (Usuario, Dica)
│
└── package.json          # Dependências do projeto
```
