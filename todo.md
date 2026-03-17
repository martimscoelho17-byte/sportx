# SportX - TODO

## Backend
- [x] Schema da base de dados (marcas, categorias, produtos, carrinho, encomendas)
- [x] Seed de produtos (Nike, Adidas, New Balance, Puma com preços €159.99–€299.99)
- [x] tRPC routers: produtos, marcas, categorias, carrinho, encomendas
- [x] Autenticação Google OAuth

## Frontend - Layout
- [x] App.tsx com rotas e ThemeProvider (claro/escuro)
- [x] Header com logo SportX, navegação por marcas com dropdowns, tema, login, carrinho
- [x] Footer com modais: Sobre, Política de Privacidade, Contactos, WhatsApp

## Frontend - Páginas
- [x] Home: hero section com "SPORTX" (Sport #660000, X #001a4d) + slogan
- [x] Catálogo por marca/categoria com filtros avançados e ordenação
- [x] Detalhe de produto com seleção de tamanho e botão adicionar ao carrinho
- [x] Drawer de carrinho lateral com quantidade, remover, total, checkout
- [x] Checkout com morada, país UE com bandeiras, pagamento, resumo
- [x] Confirmação de encomenda com número de rastreamento

## Frontend - Modais
- [x] Modal de login (email/password + Google)
- [x] Modal de registo com campos completos e países UE
- [x] Modal Sobre (missão SportX)
- [x] Modal Política de Privacidade (RGPD)
- [x] Modal Contactos (SportX@gmail.pt, 963430023, Coimbra, WhatsApp)

## Testes
- [x] Testes vitest para routers de produtos, carrinho e encomendas (17 testes passados)
- [x] Testes vitest para múltiplas imagens de produtos (12 testes passados)
- [x] Testes vitest para features (desconto, envio, IVA, total, favoritos, carrinho) (16 testes passados)
- [x] Total: 45 testes passados


## Reorganização (Nova)
- [x] Header: Logo esquerda, 4 marcas centro com dropdowns, tema/login/carrinho direita
- [x] Footer: 4 tópicos (Sobre, Contactos, Localização, Privacidade) + copyright
- [x] Testar layout responsivo e checkpoint
- [x] Substituir logo SportX por ícone azul (#001a4d)
- [x] Página principal: hero com SportX + slogan (sem marcas por baixo)
- [x] Ordem das marcas: Nike, Adidas, New Balance, Puma

## Múltiplas Imagens de Produtos (Nova)
- [x] Criar tabela productImages para armazenar múltiplas imagens por produto
- [x] Migrar esquema com `pnpm db:push`
- [x] Adicionar função getProductWithImages() em server/db.ts
- [x] Atualizar router de produtos para usar getProductWithImages()
- [x] Popular base de dados com 10 chuteiras reais de 4 marcas
- [x] Atualizar ProductDetail.tsx para exibir galeria de imagens
- [x] Implementar navegação entre imagens (anterior/próximo)
- [x] Corrigir navegação para detalhe do produto (sem dupla barra)
- [x] Criar testes vitest para validar produtos e imagens (12 testes passados)


## Novas Funcionalidades (Implementadas)
- [x] Alterar ícone de carrinho no header
- [x] Adicionar ícone de favoritos (coração) no header entre login e carrinho
- [x] Implementar sistema de favoritos funcional (guardar/remover produtos favoritos)
- [x] Implementar carrinho de compras funcional (adicionar/remover/atualizar quantidade)
- [x] Implementar desconto de 10% no checkout
- [x] Implementar cálculo de envio (grátis para pedidos >= 100€)
- [x] Implementar página de checkout com resumo de pedido
- [x] Implementar sistema de pagamento (4 métodos: Cartão, MB Way, Transferência, Multibanco)
- [x] Implementar página de confirmação de pedido com número de rastreamento
- [x] Testar fluxo completo: adicionar ao carrinho → favoritos → checkout → pagamento → confirmação
- [x] Criar testes vitest para validar desconto, envio, IVA, total (16 testes passados)


## Melhorias (Implementadas)
- [x] Atualizar página de Favoritos com mensagem centrada quando vazia

## Ajustes (Implementados)
- [x] Alterar texto do botão de "Ir para checkout" para "Finalizar compra"
- [x] Alterar CartDrawer para mostrar desconto (10%) em vez de IVA


## Checkout (Implementado)
- [x] Logo SportX já aparece no header do checkout
- [x] Título "Finalizar compra" (centrado, em vez de "Checkout")
- [x] Opções de "Envio" e "Levantamento" logo abaixo do título com ícones
- [x] Campos de Morada de Entrega depois das opções
- [x] Implementar seleção de método de entrega


## Campos do Checkout (Implementado)
- [x] Remover placeholders dos campos (Nome, Apelido, Email, Telefone, Morada, Código Postal)
- [x] Ordenar países da UE alfabeticamente (27 países)
- [x] Mostrar apenas nomes dos países (sem bandeiras)


## Campos Condicionais (Implementado)
- [x] Mostrar "Morada de Entrega" quando "Envio" é selecionado
- [x] Mostrar "Loja de Levantamento" quando "Levantamento" é selecionado
- [x] Adicionar 4 lojas de levantamento (Lisbon, Porto, Covilha, Braga)
- [x] Envio grátis quando "Levantamento" é selecionado


## Alterações (Implementadas)
- [x] Remover opção "Levantamento" do checkout
- [x] Deixar apenas "Envio" como opção de entrega


## Dropdown de País (Implementado)
- [x] Alterar placeholder de "Portugal" para "Selecione um país"
- [x] Adicionar ícone de lupa (Search) antes do texto


## Resumo da Encomenda (Implementado)
- [x] Remover IVA (23%) do resumo (Checkout e OrderConfirmation)
- [x] Remover métodos de pagamento do checkout (movidos para página separada)


## Fluxo de Pag## Fluxo de Pagamento (Implementado)
- [x] Remover métodos de pagamento do checkout
- [x] Criar página de pagamento separada
- [x] Redirecionar para pagamento após confirmar encomenda
- [x] Reorganizar layout: resumo da encomenda abaixo da morada

## Validação (Implementado)
- [x] Adicionar borda vermelha em campos vazios ao clicar em "Confirmar Encomenda"
- [x] Criar testes vitest para validação de formulário (16 testes passados)
- [x] Validação funciona corretamente (bordas vermelhas aplicadas aos campos obrigatórios vazios)


## Perfil do Utilizador (Implementado)
- [x] Criar página de perfil do utilizador
- [x] Implementar funcionalidade de edição de perfil
- [x] Adicionar campos editáveis: nome, email, telefone, morada, código postal, país
- [x] Adicionar botão para guardar alterações
- [x] Adicionar validação de campos
- [x] Integrar com o menu de conta do header

## Fluxo de Logout (Em Desenvolvimento)
- [ ] Ao clicar em "Terminar sessão", abrir modal de login automaticamente
- [ ] Permitir fazer login novamente ou criar nova conta
- [ ] Corrigir problema com remoção de cookie de sessão


## Problemas Identificados (Corrigidos)
- [x] Rodapé não estava visível na página inicial (corrigido: ajustado min-h-[calc(100vh-64px-57px)])
- [x] Página de perfil redireciona para home mesmo com utilizador autenticado (corrigido: adicionado loading check no useEffect)
- [x] Menu de conta funciona corretamente com opções de perfil e logout


## Menu Dropdown de Categorias (Implementado)
- [x] Implementar dropdown ao passar cursor sobre marcas
- [x] Adicionar subcategorias: Nike (Mercurial, Phantom, Tiempo), Adidas (Predator, F50, Copa), New Balance (Tekela, Furon), Puma (Future, Ultra)
- [x] Dropdown deve permanecer visível até cursor sair da área
- [x] Testar funcionalidade em todos os navegadores
- [x] Corrigir layout do dropdown para coluna vertical
- [x] Atualizar nomes das categorias com prefixo da marca (Nike Mercurial, Adidas Predator, etc.)
- [x] Testar todas as 4 marcas com nomes corretos


## Adicionar Produtos (Concluído)
- [x] Pesquisar 3 produtos para Nike Mercurial no site oficial
- [x] Pesquisar 3 produtos para Nike Phantom no site oficial
- [x] Pesquisar 3 produtos para Nike Tiempo no site oficial
- [x] Pesquisar 3 produtos para Adidas Predator no site oficial
- [x] Pesquisar 3 produtos para Adidas F50 no site oficial
- [x] Pesquisar 3 produtos para Adidas Copa no site oficial
- [x] Pesquisar 3 produtos para New Balance Tekela no site oficial
- [x] Pesquisar 3 produtos para New Balance Furon no site oficial
- [x] Pesquisar 3 produtos para Puma Future no site oficial
- [x] Pesquisar 3 produtos para Puma Ultra no site oficial
- [x] Adicionar todos os 24 produtos à base de dados
- [x] Testar exibição dos produtos no catálogo

## Correções Aplicadas (Implementadas)
- [x] Corrigir conexão com a base de dados (ENV.databaseUrl em vez de process.env.DATABASE_URL)
- [x] Corrigir IDs de marca e categoria na base de dados (30001-30010)
- [x] Testar todas as 4 marcas com produtos exibindo corretamente
  - Nike: 9 produtos (3 Mercurial + 3 Phantom + 3 Tiempo)
  - Adidas: 9 produtos (3 Predator + 3 F50 + 3 Copa)
  - New Balance: 6 produtos (3 Tekela + 3 Furon)
  - Puma: 6 produtos (3 Future + 3 Ultra)
  - Total: 30 produtos


## Logos das Marcas (Concluído)
- [x] Adicionar logo da New Balance na página de produtos


## Ajustes Finais (Concluído)
- [x] Remover frase "Última atualização: Janeiro de 2026" da Política de Privacidade


## Ajustes do Carrinho (Concluído)
- [x] Remover texto "Adicione produtos para continuar" do carrinho vazio
- [x] Remover botão "Continuar a comprar" do carrinho vazio
- [x] Deixar apenas o ícone do carrinho vazio com mensagem "O seu carrinho está vazio"


## Página de Favoritos (Concluído)
- [x] Adicionar título "Favoritos" em negrito no canto superior esquerdo da página
