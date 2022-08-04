# GITHUB REPOS API

## An API that search Github profiles and return that information

Regra de negocio:
A aplicação consistirá em desenvolver uma entidade que tem como papel armazenar diferentes niveis de dados de perfis do github, com isto, é necessário se atentar que a ação de UPDATE nada mais será do que uma mudança de estado da entidade e não a alteração dos dados em si.

Funcionalidades:

- Adicionar Profiles(CREATE) :
  Esta permitirá que eu adicione um user com dados de seu perfil no github

- Visualizar Profiles(READ) :
  Esta lerá todos os perfis salvos

- Atualizar Profiles(UPDATE) :
  Esta atualizará o estado do perfil na plataforma (UNDEFINED) 

- Deletar Profiles(DELETE) :
  Esta deletará o perfil selecionado

- Pesquisar Profiles

- Overview Profiles


Para acessar a aplicação primeiro você deve ter um banco de dados MONGODB previamente criado