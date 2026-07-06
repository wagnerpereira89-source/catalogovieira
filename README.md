# Vieira Pneus — Catálogo

Site de catálogo com orçamento por WhatsApp + painel admin.
React + Vite · Vercel · Supabase (banco, fotos e login).

---

## PASSO A PASSO: ligar o Supabase (fazer 1 vez)

### 1. Criar o projeto
1. Entre em https://supabase.com e crie uma conta (grátis).
2. **New project** → dê um nome (ex: `vieira-pneus`), escolha uma senha forte
   pro banco (guarde ela) e região **South America (São Paulo)**.
3. Espere ~2 min o projeto criar.

### 2. Criar as tabelas
1. No menu lateral: **SQL Editor** → **New query**.
2. Abra o arquivo `supabase-setup.sql` (está na raiz deste projeto),
   copie TUDO e cole no editor.
3. Clique **RUN**. Deve aparecer "Success". Pronto: tabelas, segurança,
   bucket de fotos e categorias iniciais criados.

### 3. Criar o usuário admin
1. Menu lateral: **Authentication** → **Users** → **Add user** → **Create new user**.
2. Coloque o e-mail e uma senha (é com isso que você vai logar no /admin).
3. Marque **Auto Confirm User** e crie.

### 4. Pegar as chaves
1. Menu lateral: **Project Settings** (engrenagem) → **API**.
2. Copie dois valores:
   - **Project URL** (ex: `https://xxxx.supabase.co`)
   - **anon public** key (um token longo)

### 5. Colar as chaves na Vercel
1. No painel da Vercel, abra o projeto → **Settings** → **Environment Variables**.
2. Adicione:
   - `VITE_SUPABASE_URL` = o Project URL
   - `VITE_SUPABASE_ANON_KEY` = a anon key
3. **Deployments** → nos 3 pontinhos do último deploy → **Redeploy**.

### 6. Usar
- Site: continua igual, mas agora lendo do banco.
- Painel: acesse **`/admin`**, logue com o usuário do passo 3 e cadastre produtos.
- Sem as chaves configuradas, o site roda em modo demonstração (produtos fake)
  e o /admin mostra um aviso.

---

## Coisas pra trocar depois
- **Número do WhatsApp**: `src/lib/whatsapp.js` (constante `WHATSAPP_NUMBER`).
- **Cores**: `src/theme.js`.
- **Ícones do app (PWA)**: `public/icon-192.png` e `public/icon-512.png`.
