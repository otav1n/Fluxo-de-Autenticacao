# 🔐 Fluxo de Autenticação com JWT e Redis

Este projeto implementa e integra o fluxo completo de autenticação na API, permitindo:

Registro de usuários (POST /auth/register) com validação e persistência no PostgreSQL (via Sequelize).

Login de usuários (POST /auth/login) com verificação de credenciais e geração de JWT assinado.

Acesso a rotas protegidas via Bearer Token, validado em middleware dedicado.

Logout seguro (POST /auth/logout) com gerenciamento de sessão no Redis, utilizando blacklist para tokens inválidos.

# 🔑 Funcionalidades principais

Middleware de autenticação que valida JWTs e checa blacklist no Redis.

Integração com Docker Desktop para execução do Redis (via redis.yml).

Documentação atualizada no Swagger (/api-docs) com os endpoints de autenticação.

Suporte à evolução do projeto, garantindo base sólida para novas funcionalidades.

# ✅ Critérios de Aceite

Usuário pode registrar-se e logar, recebendo um JWT válido.

Rotas protegidas retornam 401 Unauthorized para tokens inválidos, ausentes ou revogados.

Logout adiciona o token na blacklist do Redis com TTL correspondente ao tempo de expiração.
