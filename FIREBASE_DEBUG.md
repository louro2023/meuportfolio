# 🔍 Guia de Diagnóstico - Firebase Não Persiste Dados

## Como Debugar o Problema

### 1. **Abrir Console do Navegador (F12)**
   - Vá para a aba **Console**
   - Procure por mensagens que indicam se o Firebase está conectando

### 2. **Verificar Logs de Inicialização**
   Você deve ver mensagens como:
   ```
   ✅ Imagem de perfil carregada do Firebase
   ✅ Projetos carregados do Firebase
   ✅ Informações de contato carregadas do Firebase
   🔄 Configurando listeners em tempo real...
   ```

   Se ver:
   ```
   ❌ Firebase não configurado
   ⚠️ Erro ao carregar...
   ```
   Significa que o Firebase NÃO está inicializando corretamente.

### 3. **Testar uma Alteração e Observar Logs**
   1. Abra AdminPanel
   2. Altere a foto de perfil
   3. Procure no console por:
      ```
      ✅ Imagem de perfil atualizada no Firebase
      🔔 Imagem de perfil atualizada via listener
      ```

### 4. **Verificar Regras do Firebase Console**

   **CRÍTICO**: As regras de segurança precisam permitir ESCRITAS! 

   Vá para: **Firebase Console** → Seu Projeto → **Realtime Database** → **Regras**

   Regras correntes (que BLOQUEIAM escritas):
   ```json
   {
     "rules": {
       "portfolio": {
         ".read": true,
         ".write": false  // ❌ BLOQUEADO!
       },
       "projects": {
         ".read": true,
         ".write": false  // ❌ BLOQUEADO!
       }
     }
   }
   ```

   Regras CORRETAS (durante desenvolvimento):
   ```json
   {
     "rules": {
       "portfolio": {
         ".read": true,
         ".write": true  // ✅ PERMITIDO
       },
       "projects": {
         ".read": true,
         ".write": true  // ✅ PERMITIDO
       }
     }
   }
   ```

   ⚠️ **IMPORTANTE**: Isso é apenas para desenvolvimento! Para produção, use autenticação.

### 5. **Verificar Estrutura do Banco**

   No **Firebase Console** → **Realtime Database**, você deve ver:

   ```
   portfolio/
   ├── contactInfo/
   │   ├── whatsappNumber
   │   ├── location
   │   ├── email
   │   ├── name
   │   ├── role
   │   └── updatedAt
   └── profileImage/
       ├── url
       └── updatedAt

   projects/
   ├── -NxxxxxXxx/
   │   ├── title
   │   ├── shortDescription
   │   ├── fullDescription
   │   ├── technologies
   │   ├── imageUrl
   │   ├── type
   │   ├── createdAt
   │   └── updatedAt
   ```

   Se não existir nada, significa que as escritas estão sendo bloqueadas.

### 6. **Verificar Variáveis de Ambiente**

   Seu `.env` tem TODAS estas variáveis?
   ```
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_AUTH_DOMAIN=xxx
   VITE_FIREBASE_PROJECT_ID=xxx
   VITE_FIREBASE_DATABASE_URL=xxx  ← CRÍTICO!
   VITE_FIREBASE_STORAGE_BUCKET=xxx
   VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
   VITE_FIREBASE_APP_ID=xxx
   ```

   **Especialmente `VITE_FIREBASE_DATABASE_URL`!**

### 7. **Testar Conexão Direta**

   Cole isto no console (F12) e execute:
   ```javascript
   console.log('DB:', window.__db__ || 'Não disponível')
   ```

## ✅ Checklist para Resolver

- [ ] Abri o Console (F12) e vejo logs de sucesso?
- [ ] Meu `.env` tem todas as 7 variáveis Firebase?
- [ ] Meu `VITE_FIREBASE_DATABASE_URL` está correto?
- [ ] As regras do Firebase permitem `.write: true`?
- [ ] Quando altero dados, vejo mensagens `✅` no console?
- [ ] Quando recarrego (F5), os dados permanecem?
- [ ] Em outro navegador, os dados aparecem?

## Se ainda não funcionar:

1. **Limpar cache**: Ctrl+Shift+Delete → Limpar cache do site
2. **Recarregar hard**: Ctrl+F5
3. **Verificar Console de Erros**: Procure por mensagens em vermelho
4. **Verificar Firebase Console**: Veja se há dados sendo salvos

## Exemplo de Logs Corretos

```
✅ Imagem de perfil carregada do Firebase
✅ Projetos carregados do Firebase: 5
✅ Informações de contato carregadas do Firebase
🔄 Configurando listeners em tempo real...
[Usuario abre AdminPanel e altera foto]
✅ Imagem de perfil atualizada no Firebase: data:image/jpeg...
🔔 Imagem de perfil atualizada via listener
```

Se ver TODOS esses logs, a sincronização está funcionando! ✨
