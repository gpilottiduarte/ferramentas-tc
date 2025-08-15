# Guia de Estilos do Segura para Escrita Técnica

Este guia de estilos foi desenvolvido para padronizar e otimizar a produção de documentações técnicas relacionadas ao **Segura**, garantindo clareza, consistência e acessibilidade. O documento aborda práticas recomendadas para redação em português e inglês, padronização de terminologia, formatação de textos, uso de negrito e itálico, estruturação de documentos, exemplos de código, e muito mais.

Além disso, este guia de estilos define como estruturar conteúdos específicos, como tutoriais, explicações, referências e listas de requisitos, oferecendo orientações detalhadas sobre como comunicar informações técnicas de forma eficaz. Este guia também inclui regras claras sobre terminologia a ser evitada e prioriza uma abordagem inclusiva e profissional, alinhada aos padrões globais de documentação técnica.

Este documento é essencial para todos os colaboradores responsáveis pela criação, revisão e manutenção de documentações técnicas no ambiente **Segura**.

## Uso de artigos

Para o português, tanto no título como ao referir-se ao produto e/ou funcionalidade dentro do texto, utilize o artigo correspondente.

**Por exemplo:**  
“Sobre o Citrix”.

## Terminologia para inglês e português

- Não usar "este artigo", usar "este documento" / "this document".  
- Para se referir aos passos que serão informados na lista numerada, utilize "(...) passos abaixo:"  
- IN/ON:  
  - "On Segura (...)".  
  - "In the (side) menu (...)"  
  - Por quê? Porque é uma instrução para escolher uma opção dentro do menu.  
    - Ex: In the side menu, select **Credentials \> SSH keys**.

## Títulos dos documentos

Utilize como padrão os seguintes títulos (de acordo com cada documento):

### Tutorial/How-To

#### **How To/Como**

**Por exemplo:**   
“Como cadastrar uma credencial no Segura”

### Explanation/Explicação

#### **About/Sobre**

**Por exemplo:**   
“Sobre o DevOps Secret Manager”

## Document vs. Documentation

### Document

Para se referir ao documento sendo escrito, não use palavras como artigo, utilize sempre documento.  
Um documento é o pedaço de papel ou arquivo de computador que contém as informações. Ele é contável e também um verbo.  
**Ex:** Os cientistas documentaram os experimentos de laboratório para provar as propriedades medicinais da erva.[^1]

### Documentation

Documentação é a ação de escrever o documento.  
A documentação é o ato de registrar essa informação por escrito.  
Ela é frequentemente usada para descrever a coleta e a compilação de informações provenientes de estudos ou pesquisas. É NÃO contável e NÃO é um verbo.  
**Ex:** Este é apenas um relatório, onde está a documentação de todo o projeto.[^2]

## Callouts/caixas de atenção

- O tipo de callout (Info, Atenção, Alerta) não deve estar em negrito.  
- **Caixa azul:** hierarquia mais baixa de atenção. Processos ou avisos que não impactam no funcionamento do produto. Boas práticas, sugestões, entre outras ações.  
  - **Título: Info/Info**  
    **Por exemplo:**  
    Info  
    Por padrão, o relatório exibe 30 registros por tela. Para ir para a próxima tela, clique no botão de avançar ao final do relatório.  
      
- **Caixa amarela:** hierarquia intermediária de atenção. Processos ou avisos que podem impactar no funcionamento do produto, mas que se não forem feitos ou não forem devidamente atendidos, não vão impedir o uso.  
  - **Título: Atenção/Attention**   
  - **Por exemplo:**  
    Atenção  
    Os comandos auditados cadastrados são carregados no início de cada sessão. Se uma sessão já estiver ativa e um novo comando for cadastrado, o mesmo não terá efeito sobre a sessão já iniciada.

- **Caixa vermelha:** hierarquia mais alta de atenção. Processos ou avisos que vão impactar no funcionamento do produto, vão impedir o uso deste ou travar/quebrar o produto.  
  - **Título: Alerta/Alert**  
    **Por exemplo:**  
    Alerta  
    Os campos com asterisco são obrigatórios.

## Negrito

Use o negrito nas seguintes situações:

- Nome do produto.  
  - Nome dos módulos do Segura.  
  - Nunca utilize negrito para outros produtos ou empresas.  
    - Por exemplo: **Domum, DevOps Secret Manager, PAM Core** vs. Microsoft, Apple ou Apple Intelligence.  
- Botões do produto/aplicação.  
- Títulos de janelas.  
- Os passos do fluxo de cadastro/edição do novo layout (4.0).  
  - Para se referir aos passos, utilizar H3.  
  - **Por exemplo**: \#\#\# Passo 1: registre a credencial. (H3)

## Itálico

Use o itálico nas seguintes situações:

- Palavras estrangeiras que não fazem parte da explicação/produto.  
- Enumerar opções.  
  - **Por exemplo**: as opções são: *Pendente, Aprovada* ou *Reprovada*.  
    - Note que não devemos usar negrito na conjunção da enumeração.

### Exceção

- Quando forem apenas duas opções, como por exemplo, **Sim** ou **Não**, use negrito.

## Mencionar números

- Usar sempre a representação numérica (0, 1, 2, 3\) mesmo em casos menores do que dez.

## Code fences

- Colocar entre *code fences* as palavras reservadas, extensões de arquivos, parâmetros de linha de comando, entre outros.  
  - **Por exemplo:** \`.jpg\`, \`.png\`.  
- Códigos-fonte.  
  - Quando for apenas uma linha (comando, *endpoint* ou outro tipo) use *code fence*; quando for um bloco de código, use code block.  
- Saída de comandos.  
- Identificação de diretórios.  
  - **Por exemplo**: `C:\Windows\Users\CapivaraSuicida`  
- Input de teclas.  
  - **Por exemplo**: Enter ou Delete

### Protocolos e linguagens técnicas

Termos como `TCP`, `UDP`, `SQL`, `HTTP` e `HTTPS` devem ser colocados entre *code fences* quando utilizados como:

- Valor técnico em campos da interface (por exemplo, ao selecionar um tipo de protocolo, linguagem ou formato).  
- Argumento ou parâmetro em comandos.  
- Opção selecionável em instruções técnicas.

#### Exemplos corretos de uso com code fence:

- Selecione TCP ou UDP no campo Protocolo.  
- Escolha SQL como tipo de script.  
- Rode o comando sqlcmd \-Q "SELECT \* FROM users".

Não utilizar *code fence* quando os termos forem mencionados apenas de forma descritiva, conceitual ou introdutória.

**Exemplos corretos de uso sem code fence:**

- O protocolo TCP é orientado à conexão.  
- A linguagem SQL é usada para manipular dados relacionais.

## Enumerações

- Sempre colocar ponto final, independente de quantas palavras ou verbos a frase tiver.

## Nomes das pastas/categorias

Sempre no singular e segundo a estrutura conforme abaixo:

- **EN**  
  - **How-to guides**  
  - **Explanation**  
  - **Reference**  
- **PT**  
  - **Guias**  
  - **Explicação**  
  - **Referência**

## Palavras e frases que devemos evitar em português e inglês

Evitar jargões, frases longas e palavras com conotações negativas. Evite o seguinte:

- **Permitir (Allow)**: sugere que estamos em uma posição de poder, permitindo que usuários ou clientes realizem determinadas atividades.  
- **A capacidade/habilidade de (The ability to)**: use "We can" (Nós podemos) em vez de "We have the ability to” (Nós temos a capacidade de).  
- **Eliminar (Eliminate).**  
- **Executar (Execute).**  
- **Terminar (Terminate).**  
- **Matar (Kill).**  
- **Disruptivo (Disruptive).**  
- **Explosivo (Explosive).**  
- **Potencializa (Leverage).**  
- **Usuário final** \- use apenas **usuário**.

## Padronização de termos

Principalmente no inglês, é importante padronizar os termos usados. Utilize estas variações nas documentações técnicas do Segura.

- Email (email) para o inglês e E-mail (e-mail) para o português.  
- Online.  
- Setup (noun), set up (verb).  
- Backup (noun), back up (verb).  
- Login (noun), log in (verb).  
- Web.  
- Website.  
- Internet.  
- Systems management.  
- Virtualization.  
- Space-separated, comma-delimited.  
- Load balancer.  
- Utilize somente letras maiúsculas como parte de um nome próprio.  
  - Por exemplo *Elastic Load Balancer*.  
- Multi-tenant é usado tanto em pt-BR como em EN.  
  - Em pt-BR, o hífen está errado gramaticalmente, então o termo fica em itálico para salientar que é a palavra/termo em EN. Por exemplo: *multi-tenant*.  
- Homepage.  
- Passo a passo.  
- Pop-up (noun/adjective) refers to websites popups, popup (verb) is the action of something appearing suddenly.  
- Subpasta.

## Palavras que devem ser traduzidas

Quando houver uma tradução direta e adequada, sempre opte pela versão em português.

| Inglês | Tradução recomendada |
| ----- | ----- |
| app | aplicativo |
| feature | funcionalidade |
| task | tarefa |
| update | atualização |
| run | rodar |
| tool | ferramenta |
| user | usuário |

## Não utilize essas contrações em inglês

| Contração | Significado | Notas |
| :---- | :---- | :---- |
| **ain’t** | is not | Coloquial demais, use isn’t. |
| **how’d** | how did / how would |  |
| **how’ll** | how will |  |
| **I’d** | I would | Não use a primeira pessoa. |
| **‘twas** | it was | Inglês antigo. |
| **something’s** | something is | Pode causar confusão com os pronomes possessivos. |
| **mayn’t** | may not |  |
| **may’ve** | may have |  |
| **mightn’t** | might not |  |
| **might’ve** | might have |  |
| **gonna** | going to |  |
| **gotta** | got to |  |

## Utilize essas contrações

| Contrações | Significado |
| :---- | :---- |
| **aren’t** | are not |
| **can’t** | cannot |
| **could’ve** | could have |
| **couldn’t** | could not |
| **didn’t** | did not |
| **doesn’t** | does not |
| **don’t** | do not |
| **hadn’t** | had not |
| **hasn’t** | has not |
| **haven’t** | have not |
| **it’s** | it has / it is |
| **isn’t** | is not |
| **mustn’t** | must not |
| **o’clock** | of the clock |
| **wasn’t** | was not |
| **we’ll** | we will |
| **we’re** | we are |
| **we’ve** | we have |
| **won’t** | will not |
| **would’ve** | would have |
| **wouldn’t** | would not |
| **you’d** | you had /you would |
| **you’ll** | you shall /you will |
| **you’re** | you are |
| **you’ve** | you have |

## Exemplos de código dentro do documento

Não use marcas de prompt (por exemplo, `$` ou `#`) em exemplos de código. Essas marcas podem causar problemas para os usuários que, às vezes, os digitam por engano ou que desejam copiar e colar seções de código. 

### Exemplo de como usar:

```
juju deploy wordpress 
juju deploy ntp-master --to 2   #colocates with wordpress
juju add-relation mysql wordpress
```

## Mensagens

- Sempre entre aspas e negrito.

## Dropdown

- Sem hífen e junto da palavra menu.  
  - **For example**: Click the dropdown menu and select **Edit**.

## That vs. which

- That defines.  
- Which informs.

## If vs. whether

- Use *Whether* em referência a uma escolha ou alternativas.  
  - **Por exemplo**: “Do this whether **it works or not**.”  
- Use *If* ao estabelecer uma condição  
  - **Por exemplo**: “Click here **if you want to do x**.”

## Como indicar caminhos de acesso

Por questões de acessibilidade, sempre indicamos o caminho utilizando `>`. Todo o caminho deve estar em negrito. Por exemplo: **Configurações \> Notificações \> E-mail \> SMTP**.

## Quando usar listas ordenadas e listas não-ordenadas

Quando for uma lista que indique uma sequência de passos que deve ser executada em uma determinada ordem, usamos uma lista ordenada.

Quando se tratar de uma lista que não tem uma hierarquia para seguir, ou seja, onde a ordem não importa, usamos listas não-ordenadas.

**Por exemplo:**

**Requisitos**

- Ter acesso de administrador no PAM core.  
- Ter acesso SSH à máquina.

# Estrutura do documento

## Explicação

O título da explicação deve ser sempre: **Sobre XX**

- Exceção feita quando o documento de explicação estiver contido dentro de uma categoria principal; neste caso, o título será o nome do módulo, espelhando o produto.

A estrutura da explicação deve conter, pelo menos, duas perguntas essenciais:

- **O que é / What is (H1)**  
  - Explicando o que é o módulo, o que ele faz e como ele se comporta.  
  - Não é necessário utilizar o título *“O que é XX”*, desde que o parágrafo de introdução dê conta de responder esta pergunta.  
- **Aplicabilidade (H2)**  
  - Features do módulo.  
- **Funcionalidade (H2)**  
  - Como o módulo funciona.  
- **Casos de uso (H2)**  
  - Opcional. Insira casos de uso apenas se tiver como.  
- **Conclusão (H2)**  
  - Quando o documento estiver em um tamanho grande, que necessite que seja feita uma retomada do que foi escrito anteriormente, usamos uma pequena conclusão.

## Referência

Segue a estrutura do **How-To Guide** de como indicar o caminho para acesso.

## Campos obrigatórios

Sempre que um campo for marcado como obrigatório, indique na documentação.

### Exemplo:

1. Na plataforma Segura, no canto superior esquerdo, clique em **Grid Men**u e selecione **Configurações**.  
2. Selecione **Parâmetros do sistema \>  Parâmetros do sistema**.   
3. Na aba **Sessão remota**, na sessão **Geral**:  
4. Localize o campo **Habilitar transferência de arquivos?\*** e escolha a opção **Sim**.  
5. Clique em **Salvar**.

Neste caso, o campo **Habilitar transferência de arquivos?\*** é obrigatório. No produto ele é marcado com um asterisco, na documentação, indicamos isso visualmente.

Adicionalmente, colocamos um aviso dentro de uma callout de INFO.

**:::(info) (Info)**  
**Os campos marcados com asterisco são obrigatórios.**  
**:::**

## Outras recomendações

- Evite o uso excessivo de pontuação nos títulos. Os títulos não devem terminar com ponto final.  
- Não utilize links nos títulos.  
- Não utilize *code fences* nos títulos.  
- Os imperativos devem ser usados para documentos no estilo "Como fazer..." em vez de gerúndios \[em inglês os terminados em \-ing\].  
  - Ex: **Criar uma instância** ao invés de **Criando uma instância**.  
- Não pule níveis da hierarquia de títulos (por exemplo, seguir um h1(\#) de um h3(\#\#\#)).  
- Evite deixar que os títulos fiquem “soltos”. Sempre que possível, coloque conteúdo logo abaixo do seu título.

## Nomenclatura e padronização das soluções Segura®

Para garantir consistência, clareza e alinhamento com a identidade da marca, todos os nomes da plataforma, produtos, módulos, add-ons e funcionalidades devem seguir as definições e regras abaixo.

### Regras gerais

- Sempre escrever Segura® com letra maiúscula e com o símbolo ®.  
- Sempre se referir ao conjunto de soluções como a Segura® Platform.  
- Segura® é uma marca e uma plataforma, não é um produto.  
- Todos os produtos, módulos e add-ons têm nome próprio e não devem ser traduzidos.  
- Nunca inserir adjetivos ou palavras auxiliares entre Segura® e o nome do produto.  
  Sempre aplicar negrito aos nomes dos produtos e módulos Segura® dentro dos textos.  
- Nunca aplicar negrito a nomes de produtos ou empresas de terceiros (ex: Microsoft, Apple).  
- Os nomes devem manter a capitalização oficial (ex: DevOps Secret Manager, e não Devops secret manager).  
- Utilize os artigos definidos corretos para garantir clareza no português técnico (ver tabela abaixo).

### Classificações e definições

#### Plataforma

Conjunto que engloba todos os produtos, módulos, add-ons, e funcionalidades.

- Nome correto: Segura® Platform  
- Não usar apenas “Segura®” para se referir ao conjunto.

Exemplo: A **Segura® Platform** oferece as seguintes soluções.

#### Produto

Um pedaço de software com PartNumber, comercializado separadamente.

- Certificate Manager  
- Cloud Entitlements (CIEM)  
- DevOps Secret Manager  
- Domum Remote Access  
- EPM Linux / macOS / Windows  
- Load Balancer  
- MySafe  
- PAM Core  
- Segura® Appliance  
- Provisioning

Exemplo: O **PAM Core** é um dos produtos da **Segura® Platform**.

#### Família de produtos

Agrupa mais de uma solução ou versão de um mesmo produto.

- Endpoint Privilege Manager:  
  - EPM Windows  
  - EPM macOS  
  - EPM Linux  
  - EPM AD Bridge

Exemplo: A família **Endpoint Privilege Manage**r inclui soluções para múltiplos sistemas operacionais.

#### Módulo

Software sem PartNumber, entregue junto com algum produto contratado.

- A2A  
- Change Audit  
- Cloud IAM  
- Discovery  
- Executions  
- Orbit Server Manager  
- Protected Information  
- Task Manager  
- User Behavior

Exemplo: O módulo **Discovery** está disponível junto ao produto **PAM Core**.

#### Add-on

Soluções complementares que agregam funcionalidades aos produtos (ex: extensões, agentes, conectores).

- Arbitrator  
- MySafe Browser Extension  
- Network Connector  
- Segura® Mobile App  
- Segura® Browser  
- Segura® Intelligence

Exemplo: O **Segura® Browser** foi desenvolvido para melhorar a segurança de sessões web.

#### Funcionalidade

Recurso disponível dentro de um produto.

Exemplos:

- Troca de senhas no PAM Core  
- Proxies (RDP, Terminal, Web, Database Proxy)  
- Notificações  
- Templates para troca de senhas  
- Integrações via SAML

### **Artigos definidos (O / A)**

Abaixo, a lista com os artigos corretos para cada nome registrado:

| Tipo | Nome | Artigo correto |
| ----- | ----- | ----- |
| Produto | Certificate Manager | O |
| Produto | Cloud Entitlements (CIEM) | O |
| Produto | DevOps Secret Manager | O |
| Produto | Domum Remote Access | O |
| Produto | EPM Linux / macOS / Windows | O |
| Produto | Load Balancer | O |
| Produto | MySafe | O |
| Produto | PAM Core | O |
| Produto | Provisioning | O |
| Produto | Segura® Appliance | O |
| Módulo | A2A | O |
| Módulo | Change Audit | O |
| Módulo | Cloud IAM | O |
| Módulo | Discovery | O |
| Módulo | Executions | O |
| Módulo | Orbit Server Manager | O |
| Módulo | Protected Information | O |
| Módulo | Task Manager | O |
| Módulo | User Behavior | O |
| Add-on | Arbitrator | O |
| Add-on | MySafe Browser Extension | O |
| Add-on | Network Connector | O |
| Add-on | Segura® Mobile App | O |
| Add-on | Segura® Browser | O |
| Add-on | Segura® Intelligence | O |

Apesar de “intelligence” ser um substantivo feminino em português, o uso do artigo masculino foi mantido para **Segura® Intelligence**, acompanhando a tendência de mercado (ex: O ChatGPT, O Midjourney).

[^1]: Original: A document is the actual piece of paper or computer file that contains the information. It is countable and also a verb. Ex: The scientists documented the lab experiments to prove the herb's medicinal properties.

[^2]:  Original: Documentation is the act of writing that information down. It is often used to describe the gathering and compilation of information from studies or research. It is NON-countable and is NOT a verb. Ex: This is just one report, where is the documentation for the whole project.