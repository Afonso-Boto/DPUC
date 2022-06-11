drop database dpuc;
create database dpuc;
use dpuc;

set character set UTF8;

CREATE TABLE tipo_utilizador (
  id     int NOT NULL,
  codigo text,
  PRIMARY KEY (id));

CREATE TABLE utilizadores (
  id                int NOT NULL AUTO_INCREMENT,
  nome              text,
  nmec              int,
  email             text,
  password          text,
  tipo_utilizadorid int NOT NULL,
  PRIMARY KEY (id),
  foreign key (tipo_utilizadorid) references tipo_utilizador(id));

CREATE TABLE unidade_organica (
  id                int NOT NULL,
  nome              text,
  sigla             text,
  utilizadoresid    int not null,
  PRIMARY KEY (id),
  foreign key (utilizadoresid) references utilizadores(id));

CREATE TABLE curso (
  id                 int NOT NULL AUTO_INCREMENT,
  nome               text,
  unidade_organicaid int NOT NULL,
  utilizadoresid     int not null,
  PRIMARY KEY (id),
  foreign key (unidade_organicaid) references unidade_organica(id),
  foreign key (utilizadoresid) references utilizadores(id));

CREATE TABLE estado (
  id        int NOT NULL,
  nome      text,
  descricao text,
  PRIMARY KEY (id));

CREATE TABLE periodo_letivo (
  id      int NOT NULL AUTO_INCREMENT,
  periodo text,
  PRIMARY KEY (id));

create table ac (
    id          int not null auto_increment,
    designacao  text,
    sigla       text,
    primary key (id)
);

create table uc(
    id int not null auto_increment,
    codigo text,
    designacao text,
    ects int,
    unidade_organicaid int not null,
    acid int not null,
    primary key (id),
    foreign key (unidade_organicaid) references unidade_organica(id),
    foreign key (acid) references ac(id)
);

CREATE TABLE curso_UC (
  curso_id int NOT NULL,
  UCid  int NOT NULL,
  PRIMARY KEY (curso_id,
  UCid),
  foreign key (curso_id) references curso(id),
  foreign key (UCid) references uc(id));

CREATE TABLE dpuc (
  id                    int NOT NULL AUTO_INCREMENT,
  criacao_edicao        tinyint(1),
  duracao               text,
  carga_horaria         text,
  horas_contacto        text,
  horas_trabalho        text,
  objetivos             text,
  conteudos             text,
  coerencia_conteudos   text,
  metodologias          text,
  coerencia_metodologia text,
  bibliografia          text,
  observacoes           text,
  regime_faltas         text,
  linguas               text,
  modalidade            text,
  requisitos            text,
  ficheiros             longblob,
  data_alteracao        text NULL,
  pagina_publica        text,
  funcionamento         text,
  aprendizagem          text,
  estadoid              int NOT NULL,
  periodo_letivoid      int NOT NULL,
  UCid                  int not null,
  utilizadoresid        int not null,
  PRIMARY KEY (id),
  foreign key (estadoid) references estado(id),
  foreign key (periodo_letivoid) references periodo_letivo(id),
  foreign key (UCid) references uc(id),
  foreign key (utilizadoresid) references utilizadores(id));

#Insert estados
insert into estado(id, nome, descricao) values (1, 'C1', 'Em criacão');
insert into estado(id, nome, descricao) values (2, 'C2', 'Em edicao');
insert into estado(id, nome, descricao) values (3, 'C3', 'Fechado');
insert into estado(id, nome, descricao) values (4, 'C4', 'Em aprovacao');
insert into estado(id, nome, descricao) values (5, 'C5', 'Aprovado');
insert into estado(id, nome, descricao) values (6, 'C6', 'Desativado');
insert into estado(id, nome, descricao) values (7, 'E1', 'Definição de regente');
insert into estado(id, nome, descricao) values (8, 'E2', 'Em edição');
insert into estado(id, nome, descricao) values (9, 'E3', 'Em aprovação');
insert into estado(id, nome, descricao) values (10, 'E4', 'Aprovado');

#Insert periodos letivos
insert into periodo_letivo(periodo) values ('1º Semestre');
insert into periodo_letivo(periodo) values ('2º Semestre');

#Insert tipos utilizador
insert into tipo_utilizador(id, codigo) values (0, 'SGA');
insert into tipo_utilizador(id, codigo) values (1, 'DUO');
insert into tipo_utilizador(id, codigo) values (2, 'DR');
insert into tipo_utilizador(id, codigo) values (3, 'DC');
insert into tipo_utilizador(id, codigo) values (4, 'D');

#Insert utilizadores
    #SGA
insert into utilizadores(nome, nmec, email, password, tipo_utilizadorid) values ('SGA', 1, 'sga@ua.pt', '123', 0);
    #DUO
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('João Manuel Nunes Torrão', 10313225, 'jtorrao@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Nuno Miguel Gonçalves Borges de Carvalho', 10315024, 'nbcarvalho@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Isabel Couto Neto da Silva Miranda', 10310635, 'miranda@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Fernando José Mendes Gonçalves', 10313932, 'fjmg@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Rui Ramos Ferreira e Silva', 10312035, 'rsilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Anabela Botelho Veloso', 80458146, 'anabela.botelho@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Manuel António Gonçalves Martins', 10312798, 'martins@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos José de Oliveira e Silva Rodrigues', 10315248, 'cjose@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('João Miguel Sequeira Silva Dias', 10310684, 'joao.dias@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Armando Jorge Domingues Silvestre', 10312665, 'armsil@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Eduardo Anselmo Ferreira da Silva', 10309074, 'eafsilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos Fernandes da Silva', 10321891, 'csilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Isabel Barreto Furtado Franco de Albuquerque Veloso', 10316053, 'aiv@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Robertt Angelo Fontes Valente', 10318601, 'robertt@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('José Claudino de Pinho Cardoso', 10308367, 'claudino@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Odete Abreu Beirão da Cruz e Silva', 10317600, 'odetecs@ua.pt', '123', 1);
    #DC
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('António Manuel Lopes Andrade', 10315073,'aandrade@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos Manuel Azevedo Costa', 10322010,'carlos.costa@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Paula Duarte Gomes', 10308626,'pgomes@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Salomé Fernandes Pinheiro de Almeida', 10313715,'salmeida@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Augusto Luís Barros Lopes', 10311839,'augusto@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Sílvia Luís Teixeira Pinto Ferreira Jorge', 10321373,'sjorge@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Elisa Carrancho Fernandes', 10321317,'maria.elisa@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Luís Miguel Simões Lucas Pires', 10318391,'mlucaspires@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Manuel António dos Santos Barroso', 10311062,'scpip@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Eduarda da Cunha Pereira', 10308913,'eduper@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria do Rosário Mascarenhas de Almeida Azevedo', 10308108,'mazevedo@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Sandra Conceição Ribeiro de Carvalho', 80648392,'sandrarc@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('António José Vassalo Neves Lourenço', 10315129,'vassalo.lourenco@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('João Alexandre Dias de Oliveira', 10327365,'jalex@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Fernanda da Silva Rodrigues', 10318755,'mfrodrigues@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Bruno Miguel Rodrigues das Neves', 80306414,'bruno.neves@ua.pt', '123', 3);
    #DR
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('António Nuno Rosmaninho Rolo', 10311482, 'rosmaninho@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('João Manuel de Oliveira e Silva Rodrigues', 10314156, 'jmr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Raquel Rocha Pinto', 10312973, 'raquel@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Helena Abreu Silva', 10310285, 'hsilva@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Augusto Luís Barros Lopes', 10311839, 'augusto.dr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jorge Manuel da Rocha São Marcos', 11707604, 'sao.marcos@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Natália da Costa Martins', 10312280, 'natalia@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Rodrigo Manuel de Mesquita Pomares Salgueiro de Carvalho', 10321611, 'rcarvalho@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ricardo Assis Guimarães Dias', 10315164, 'rdias@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria do Amparo Ferreira Faustino', 103315885, 'faustino@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Fernando Joaquim Fernandes Tavares Rocha', 10309858, 'tavares.rocha@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Marco Alexandre Barbosa de Vasconcelos', 80511143, 'mvasconcelos@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Joaquim Lourenço Fragoso Branco', 10320925, 'jlfbranco@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('António Gil D''Orey de Andrade Campos', 10321688, 'gilac@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('José Claudino de Pinho Cardoso', 10308367, 'claudino.dr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carla Alexandra Pina da Cruz Nunes', 10325566, 'alexandranunes@ua.pt', '123', 2);

#Insert unidades orgânicas
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (2, 'Departamento de Línguas e Culturas', 'DLC', 2);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (4, 'Departamento de Eletrónica, Telecomunicações e Informática', 'DETI', 3);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (7, 'Departamento de Ambiente e Ordenamento', 'DAO', 4);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (8, 'Departamento de Biologia', 'DBio', 5);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (9, 'Departamento de Engenharia de Materiais e Cerâmica', 'DEMaC', 5);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (10, 'Departamento de Economia, Gestão e Engenharia Industrial', 'DEGEIT', 6);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (11, 'Departamento de Matemática', 'DMat', 7);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (12, 'Departamento de Ciências Sociais, Políticas e do Território', 'DCSPT', 8);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (13, 'Departamento de Física', 'DFis', 9);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (15, 'Departamento de Química', 'DQ', 10);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (16, 'Departamento de Geociências', 'DGeo', 11);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (18, 'Departamento de Educação e Psicologia', 'DEP', 12);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (21, 'Departamento de Comunicação e Arte', 'DeCA', 13);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (22, 'Departamento de Engenharia Mecânica', 'DEM', 14);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (28, 'Departamento de Engenharia Civil', 'DECivil', 15);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (30, 'Departamento de Ciências Médicas', 'DCM', 16);

#Insert cursos
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (35, 'Licenciatura em Línguas e Estudos Editoriais', 2, 17);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (383, 'Licenciatura em Engenharia Informática', 4, 18);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (8318, 'Licenciatura em Engenharia do Ambiente', 7, 19);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (15, 'Licenciatura em Biologia e Geologia', 8, 20);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (483, 'Licenciatura em Engenharia de Materiais', 9, 21);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (21, 'Licenciatura em Economia', 10, 22);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (38, 'Licenciatura em Matemática', 11, 23);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (54, 'Licenciatura em Administração Pública', 12, 24);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (33, 'Licenciatura em Física', 13, 25);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (43, 'Licenciatura em Química', 15, 26);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (418, 'Licenciatura em Geologia', 16, 27);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (42, 'Licenciatura em Psicologia', 18, 28);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (40, 'Licenciatura em Música', 21, 29);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (482, 'Licenciatura em Engenharia Mecânica', 22, 30);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (491, 'Licenciatura em Engenharia Civil', 28, 31);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (18, 'Licenciatura em Ciências Biomédicas', 30, 32);

#Insert AC
insert into ac (designacao, sigla) VALUES ('Estudos Culturais', 'EC');
insert into ac (designacao, sigla) VALUES ('Informática', 'I');
insert into ac (designacao, sigla) VALUES ('Matemática', 'M');
insert into ac (designacao, sigla) VALUES ('Biologia', 'B');
insert into ac (designacao, sigla) VALUES ('Ciência e Engenharia dos Materiais', 'CEM');
insert into ac (designacao, sigla) VALUES ('Contabilidade', 'C');
insert into ac (designacao, sigla) VALUES ('Ciências Jurídicas', 'CJ');
insert into ac (designacao, sigla) VALUES ('Física', 'F');
insert into ac (designacao, sigla) VALUES ('Química', 'Q');
insert into ac (designacao, sigla) VALUES ('Geociências', 'GEO');
insert into ac (designacao, sigla) VALUES ('Psicologia', 'PSI');
insert into ac (designacao, sigla) VALUES ('Música', 'MU');
insert into ac (designacao, sigla) VALUES ('Engenharia Mecânica', 'EM');
insert into ac (designacao, sigla) VALUES ('Engenharia Civil', 'ECivil');
insert into ac (designacao, sigla) VALUES ('Ciências Biomédicas', 'CBM');

#Insert unidades curriculares
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (44535, 'Cultura Portuguesa Contemporânea', 6, 2, 1);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40379, 'Fundamentos de Programação', 6, 4, 2);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42709, 'Álgebra Linear e Geometria Analítica', 6, 7, 3);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40352, 'Biologia Celular', 6, 8, 4);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40787, 'Introdução à Engenharia de Materiais', 6, 9, 5);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (45702, 'Contabilidade Geral', 6, 10, 6);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42706, 'Análise Matemática I', 8, 11, 3);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (45824, 'Introdução Ao Direito', 4, 12, 7);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (47169, 'Mecânica Clássica', 6, 13, 8);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (41937, 'Fundamentos de Química', 6, 15, 9);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42240, 'Mineralogia', 6, 16, 10);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (47141, 'Introdução à Psicologia', 6, 18, 11);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (46713, 'Formação Auditiva A', 4, 21, 12);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (46493, 'Introdução à Engenharia Mecânica', 6, 22, 13);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42038, 'Introdução à Engenharia Civil', 2, 28, 14);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (41569, 'Laboratórios de Biomedicina 1', 4, 30, 15);

#Insert cursos_UC
insert into curso_UC (curso_id, UCid) VALUES (35, 1);
insert into curso_UC (curso_id, UCid) VALUES (383, 2);
insert into curso_UC (curso_id, UCid) VALUES (8318, 3);
insert into curso_UC (curso_id, UCid) VALUES (15, 4);
insert into curso_UC (curso_id, UCid) VALUES (483, 5);
insert into curso_UC (curso_id, UCid) VALUES (21, 6);
insert into curso_UC (curso_id, UCid) VALUES (38, 7);
insert into curso_UC (curso_id, UCid) VALUES (54, 8);
insert into curso_UC (curso_id, UCid) VALUES (33, 9);
insert into curso_UC (curso_id, UCid) VALUES (43, 10);
insert into curso_UC (curso_id, UCid) VALUES (418, 11);
insert into curso_UC (curso_id, UCid) VALUES (42, 12);
insert into curso_UC (curso_id, UCid) VALUES (40, 13);
insert into curso_UC (curso_id, UCid) VALUES (482, 14);
insert into curso_UC (curso_id, UCid) VALUES (491, 15);
insert into curso_UC (curso_id, UCid) VALUES (18, 16);

#Insert DPUC
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:3H/semana', 'I – A descoberta de Portugal na transição para o século XX
Apresentar o processo de desenvolvimento histórico da consciência nacional;
Problematizar os discursos sobre a identidade nacional portuguesa produzidos nos séculos XIX e XX;
Enunciar o contributo de alguns autores e movimentos intelectuais para o debate sobre a identidade nacional.
Apreciar o crescente interesse pelo conhecimento directo e generalizado de Portugal, ocorrido na transição para o século XX-
II – Antropologia nacional
Traçar o nascimento da etnografia em associação com a valorização da cultura popular e o desenvolvimento da consciência nacional;
Verificar o processo de estetização da cultura tradicional inerente à valorização desse património;
Observar o processo de estetização da cultura tradicional induzido pelo neogarrettismo e promovido pelo Estado Novo;
Integrar os ranchos folclóricos, as marchas populares e o concurso da «aldeia mais portuguesa de Portugal» (1938) no âmbito do processo de estetização da cultura tradicional:
Identificar e criticar a interpretação caracterológica da identidade nacional;
Expor e criticar a ideia de uma «personalidade-base» do Português, apresentada porJorge Dias;
Integrar o trabalho de Mendes Correia no contexto da antropologia anterior à II Guerra Mundial;
Apresentar criticamente as conclusões de Mendes Correia quanto à existência de uma identidade biológica de Portugal.
III – Artes portuguesas
Descrever o nascimento e o desenvolvimento da preocupação nacional na música, nas artes plásticas e na historiografia artística;
Avaliar os fundamentos ideológicos, artísticos e etnográficos da «casa portuguesa» e das outras «casas nacionais»;
Observar o processo de essencialização dos discursos nacionais;
Identificar os principais tópicos de debate suscitados pela interpretação nacional da arte;
Caracterizar artística e ideologicamente o neomanuelino e o neo-românico;
Identificar os influxos nacionalistas presentes no classicismo monumental totalitário;
Discernir o processo histórico de atribuição de qualidades estéticas à paisagem;
Discernir o processo de criação de paisagens nacionais;
Identificar os discursos nacionais presentes na procura de uma «escola portuguesa de pintura» e no desenvolvimento da pintura de história e de costumes, da fotografia pictorialista, da música erudita dos séculos XIX e XX e nos ataques contra o modernismo e o «internacionalismo».', 'I – A descoberta das culturas nacionais.
II – Antropologia nacional: Romantismo e folclore; estetização da cultura tradicional; leitura caracterológica da identidade nacional; Jorge Dias; Mendes Correia.
III – Artes portuguesas: a busca de uma arte portuguesa; manuelino e neomanuelino; «casa portuguesa»; classicismo monumental totalitário; «escola portuguesa de pintura»; pintura de costumes; fotografia pictorialista; músicas nacionais; a luta contra o internacionalismo.',
                  'Métodos de Ensino
- Análise de "casos de estudo"
- Método expositivo
- Investigação bibliográfica', 'LEAL, João - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publicações Dom Quixote, 2000. MATTOSO, José - A Identidade Nacional. Lisboa, Gradiva, 1998. MELO, Daniel – Salazarismo e Cultura Popular (1933-1958). Lisboa, Imprensa de Ciências Sociais, 2001. RAMOS, Rui - A Segunda Fundação (1890-1926). Lisboa, Círculo de Leitores, 1994. Volume 6 da «História»', 'Bibliografia recomendada
I – A descoberta de Portugal na transição para o século XX
BRITO, Sérgio Palma – Notas Sobre a Evolução do Viajar e a Formação do Turismo. Lisboa, Medialivros, 2003. Dois volumes.
HENRIQUES, Eduardo Brito – A Lisboa Turística. Entre o imaginário e a cidade. A construção de um lugar turístico urbano. Lisboa, Edições Colibri, 1996.
NORDMAN, Daniel – «Les Guides-Joanne. Ancêtres des Guides Bleus», in: Pierre Nora (dir.), Les Lieux de Mémoire. II – La Nation, tomo I. Paris, Gallimard, 1986, pp. 529-567.
RAMOS, Rui - A Segunda Fundação (1890-1926). Lisboa, Círculo de Leitores, 1994. Volume 6 da «História de Portugal», dirigida por José Mattoso.
ROSMANINHO, Nuno – «Coimbra e o imaginário», Actas do seminário internacional «Memórias da Cidade. Espaço, cultura e sociedade», realizado em Coimbra, no Teatro da Cerca de São Bernardo (Pátio da Inquisição), em 11 e 12 de Dezembro de 2007. No prelo.
ROSMANINHO, Nuno – Relatório da disciplina de Património e Identidade. Universidade de Aveiro, 2009, pp.35-66.
THIESSE, Anne-Marie – A Criação das Identidades Nacionais. Lisboa, Temas e Debates, 2000.
VASCONCELOS, J. Leite de – De Terra em Terra. Excursões arqueológico-etnográficas através de Portugal (Norte, Centro e Sul). Lisboa, Imprensa Nacional de Lisboa, 1927. Dois volumes.
VICENTE, Filipa Lowndes – Viagens e Exposições. D. Pedro V na Europa do século XIX. Lisboa, Gótica, 2003.
II – Antropologia nacional
DIAS, Jorge - Os Elementos Fundamentais da Cultura Portuguesa. Lisboa, Imprensa Nacional - Casa da Moeda, 1985. Publicado também no volume I dos Estudos de Antropologia, pp. 135-157.
FABRE, Daniel (dir.) – L’Europe Entre Cultures et Nations. Paris, Éditions dela Maison des Sciences de l’Homme, 1996.
HOBSBAWM, Eric; RANGER, Terence (orgs.) – A Invenção das Tradições. 4.ª ed. Rio de Janeiro, Paz e Terra, 2006.
LEAL, João – Antropologia em Portugal. Mestres, percursos, transições. Lisboa, Livros Horizonte, 2006.
LEAL, João - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publicações Dom Quixote, 2000.
MELO, Daniel – Salazarismo e Cultura Popular (1933-1958). Lisboa, Imprensa de Ciências Sociais, 2001.
ROSMANINHO, Nuno – Relatório da disciplina de Património e Identidade. Universidade de Aveiro, 2009, pp. 67-108.
III – Artes portuguesas
ANDRIEUX, Jean-Yves; CHEVALLIER, Fabienne; NEVANLINNA, Anja Kervanto (dir.) – Idée Nationale et Architecture en Europe (1860-1919). Finlande, Hongrie, Roumanie, Catalogne.Rennes, Presses Universitaires de Rennes, 2006.
CASCUDO, Teresa – «A década da invenção de Portugal na música erudita (1890-1899)», Revista Portuguesa de Musicologia, Lisboa, n.º 10, 2000, pp. 181-226.
L’ART Russe dans la Seconde Moitié du XIXe Siècle: en quête d’identité, Paris, 2005, pp. 162-173.
LEAL, João - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publicações Dom Quixote, 2000.
LOYER, Françoise; TOULIER, Bernard (dir.) –Le Régionalisme, Architecture et Identité. Paris, Monum – Éditions du Patrimoine, 2001.
POPESCU, Carmen – Le Style National Roumain. Cnstruire une nation à travers l’architecture (1881-1945). Rennes, Presses Universitaires de Rennes, 2004.
ROSMANINHO, Nuno – «A “casa portuguesa” e outras “casas nacionais”», Revista da Universidade de Aveiro. Letras, Aveiro, n.os 19-20, 2002-2003, pp. 225-250.
ROSMANINHO, Nuno – «António Ferro e a propaganda nacional antimoderna», in: Luís Reis Torgal e Heloísa Paulo (coord.), Estados Autoritários e Totalitários e Suas Representações. Coimbra, Imprensa da Universidade de Coimbra, 2008, pp. 289-299.
ROSMANINHO, Nuno – «As múltiplas facetas da arte nacional», in: António Pedro Pita e Luís Trindade (coord.), Transformações Estruturais do Campo Cultural Português (1900-1950), Coimbra, Ariadne Editora e CEIS20, 2005, pp. 373-400.
ROSMANINHO, Nuno – «O desamparo de Fernando Lopes-Graça. A música no contexto das artes nacionais», Revista da Universidade de Aveiro – Letras, Aveiro, n.º 23, 2006, pp. 51-58.
ROSMANINHO, Nuno – O Poder da Arte. O Estado Novo e a Cidade Universitária de Coimbra. Coimbra, Imprensa da Universidade, 2006.
ROSMANINHO, Nuno – Relatório da disciplina de Património e Identidade. Universidade de Aveiro, 2009, pp. 168-246.',
                  'Português', 'Nenhum', 'Nos termos do Regulamento de Estudos da Universidade de Aveiro (n.º 214 /2012), a avaliação é discreta e constituída por dois testes a realizar durante o período lectivo.', 'Os alunos devem cumprir os objectivos.', 5, 1, 1, 34, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:2H/semana; PL:2H/semana', 'Pretende-se dotar os alunos da capacidade para resolver problemas de pequena e média dimensão recorrendo a uma linguagem de programação multi-paradigma (Python)',
                                '- Valores e tipos de dados.
- Variáveis, operadores e expressões
- Funções, parâmetros e variáveis locais
- Instruções de decisão
- Instruções de repetição
- Recursividade
- Sequências: strings, listas, tuplos
- Conjuntos e dicionários
- Ficheiros
- Definições por compreensão e geradores
- Operadores funcionais: map, filter, reduce
- Utilização de módulos (numpy, matplotlib)
- Pesquisa e ordenação', 'Nas aulas teórico-práticas são apresentados conteúdos teóricos e são ilustrados com exemplos e exercícios discutidos com os alunos.  Por vezes recorre-se a pequenos questionários interativos para envolver os alunos na aprendizagem.
As aulas práticas são baseadas no desenvolvimento de pequenos programas pelos alunos, com o apoio do professor, que também poderá discutir alternativas de resolução.  Os problemas propostos procuram mostrar a utilidade e necessidade de aplicação dos tópicos apresentados nas aulas TP.
Fora das aulas, o aluno deve ainda ler a bibliografia recomendada em cada aula TP e resolver exercícios práticos que não tenha resolvido durante a aula prática.',
                                'Jeffrey Elkner, Allen B. Downey, and Chris Meyers. How to Think Like a Computer Scientist: Interactive Edition. (Livro interativo online)
Allen Downey. Think Python 2e. (Available online and in print)', null, 'Português', 'Nenhum', '1 momento de avaliação (P) a meio do semestre (API)
1 momento de avaliação (TP) no fim do semestre (ATP)
Exame final prático com cobrindo toda a matéria (EP)
Nota Final = 30% * API + 30% * ATP + 40% * EP', '- Compreender o que é um computador, como funciona, para que serve, que limitações tem e como se comunica com ele.
- Ser capaz de resolver problemas utilizando mecanismos correntes na programação funcional e procedimental.
- Conhecer e saber utilizar as estruturas de dados disponíveis nas linguagens de programação modernas.
- Ser capaz de implementar e utilizar algoritmos básicos de pesquisa e ordenação.
- Ser capaz de desenvolver, testar e corrigir programas de pequena/média dimensão numa linguagem de programação moderna (Python).', 5, 1, 2, 35, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:4H/semana', 'OT:1H/semana', 'Aquisição de conhecimentos básicos em Álgebra Linear e em Geometria Analítica.',
                                'Matrizes e sistemas de equações lineares: operações com matrizes e propriedades; método de eliminação de Gauss e de Gauss-Jordan; inversa de uma matriz.
Determinantes: propriedades; Teorema de Laplace; inversa de uma matriz à custa da adjunta; Regra de Cramer.
Espaços vetoriais: subespaços vetoriais; espaço gerado; independência linear, bases, dimensão; coordenadas e mudança de base.
Espaços com produto interno: produto escalar, norma, ângulo entre vetores; desigualdade de Cauchy–Schwarz. Produto vetorial em IR3. Bases ortonormais e projeção ortogonal em IRn.
Retas e planos: posição relativa, distâncias e ângulos.
Valores próprios e vetores próprios: diagonalização; diagonalização ortogonal de matrizes simétricas.
Cónicas e quádricas: equação geral; equações reduzidas; classificação de cónicas e quádricas.
Transformações lineares: matriz de uma aplicação linear; núcleo e imagem; isomorfismos.', 'As aulas TP destinam-se à exposição dos conteúdos programáticos, à explanação de exemplos chave e à resolução de alguns exercícios. Nas aulas OT privilegia-se o esclarecimento de dúvidas, complementando-se com a resolução de
problemas adicionais, para consolidação dos conhecimentos anteriormente adquiridos.
Os estudantes podem também esclarecer as suas dúvidas junto do seu professor em horário de atendimento disponibilizado para o efeito.
A modalidade de avaliação definida nesta unidade curricular é a designada por avaliação discreta, com alguns momentos de avaliação durante a parte letiva do semestre e um último momento de avaliação durante a época de exames. Se preferir, o estudante, pode realizar uma só prova escrita de avaliação final na época de exames.',
                                'Bernard Kolman e David R. Hill, Álgebra Linear com Aplicações, Editora LTC, Rio de Janeiro, 2013 (9.ª edição). ISBN: 978-85-216-2208-6;',
                                'Bibliografia recomendada
    Bernard Kolman, David R. Hill, Álgebra Linear com Aplicações, Ed. LTC. ISBN:9788521622086
    Bernard Kolman, David R. Hill, Elementary Linear Algebra with Applications, Pearson Education. ISBN: 9780132296540
    David C. Lay, Stephen R. Lay and Judy J. McDonald, Linear Algebra and Its Applications, Pearson Education. ISBN: 9780321982384
    David C. Lay, Álgebra Linear e suas Aplicações, Ed. LTC. ISBN: 9788521622093
    Gilbert Strang, Introduction to Linear Algebra, Wellesley-Cambridge Press. ISBN:9780980232776
    W. Keith Nicholson, Linear Algebra with Applications, McGraw Hill. ISBN: 9780070985100
    W. Keith Nicholson, Álgebra Linear, McGraw Hill. ISBN: 9788586804922
    Isabel Cabral, Carlos Saiago, Cecília Perdigão, Álgebra Linear: Teoria, Exercícios Resolvidos e Exercícios Propostos com Soluções, Escolar Editora. ISBN: 9789725925386
    Ana P. Santana, João F. Queiró, Introdução à Álgebra Linear, Gradiva. ISBN: 9789896163723
    João Nuno Tavares, Álgebra Linear (http://arquivo.escolar.org/handle/arquivo-e/32)', 'Português', 'Conhecimentos básicos de Matemática a nível do ensino secundário.',
                                'O estudante pode optar entre a "Avaliação discreta" e a "Avaliação por exame final".
Avaliação discreta: consta de 2 testes com as seguintes pesos na avaliação final:
    50.00%  (primeiro teste)
    50.00% (segundo teste )
Avaliação por exame final: um só exame que avalia a matéria toda e com peso de 100% na classificação final.', 'Nesta unidade curricular, lecionam-se alguns tópicos de álgebra linear e de geometria analítica que fornecem o quadro teórico conceptual e os instrumentos de cálculo necessários à compreensão e ao desenvolvimento de variadas e importantes aplicações da matemática a outras ciências e engenharias. Entre as competências fundamentais a desenvolver pelos estudantes, destacam-se a capacidade de cálculo formal algébrico, a formulação e resolução explícita de problemas algébricos, incluindo questões de geometria analítica; a capacidade de utilizar técnicas vetoriais e matriciais em diversas aplicações; a resolução de problemas, recorrendo a subespaços vetoriais, subespaços próprios e transformações lineares; a identificação e manipulação algébrica de cónicas e quádricas.',
                                5, 1, 3, 36, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (1, 'Semestral', 'T:2H/semana; PL:1H/semana', 'O objetivo geral da disciplina consiste em criar nos alunos uma perspetiva global da estrutura e função da célula, principais metodologias experimentais para o seu estudo e integração em organismos pluricelulares.
Para tal, ao frequentarem a disciplina, os alunos deverão atingir os seguintes objetivos específicos:
    descrever a estrutura e função dos diferentes componentes celulares
    identificar os organelos e estruturas celulares em microscopia (óptica e electrónica)
    compreender a  expressão e transmissão da informação genética
    descrever a divisão, comunicação e morte celular.
    Relacionar a constituição celular com a sua integração em tecidos', 'Componente Teórica ou Teórico-Prática
1. Métodos e técnicas em biologia celular
a. Microscopia óptica, de fluorescência, confocal, electrofisiologia e
actividade celular.
b. Microscopia electrónica de varrimento e de transmissão.
c. Cultura de células e fraccionamento celular.
2. Organização estrutural e funcional da célula.
a. Composição e estrutura da membrana celular.
b. Transporte transmembranar.
c. Propriedades eléctricas das membranas, iões e excitabilidade das
membranas. Parede celular (composição e funções).
d. Retículo endoplasmático, aparelho de Golgi e lisossomas. Secreção e
digestão celular. Produtos de reserva e outras inclusões.
e. Especializações de membrana. Comunicação celular.
f. O citosqueleto e a motilidade celular. Adesão e migração celular.
Matriz extracelular.
g. Conservação de energia: Mitocôndrias e cloroplastos.
h. Núcleo, seus constituintes e funções.
3. Ciclo celular e diferenciação
a. Fases, regulação e controlo.
b. Mecanismos de divisão celular. Gametogénese e hematopoiese.
c. Morte celular.
4. Células com funções especializadas.
a. Células germinativas e fertilização.
b. Célula nervosa e suas funções.
c. O eritrócito e suas funções.
d. Células vegetais especializadas.
e. Célula estaminal e neoplásica.
Componente Prática:
1. Métodos e técnicas em biologia celular.
2. Diagnóstico de estruturas celulares em imagens de microscopia óptica,
electrónica (transmissão e varrimento) e de fluorescência.
3. Diversidade celular e organitos celulares ex: vacúolos (inclusões minerais,
pigmentos e metabolitos secundários); plastos (cromoplastos, cloroplastos e
leucoplastos).
4. Métodos de deteção de substâncias de reserva em células vegetais e
animais.
5. Preparação de cariogramas em peixes.
6. Gametogénese. Divisão celular em células somáticas e sexuais.
7. Observação de células especializadas. Ex: Técnicas para o estudo morfofuncional
do espermatozóide (morfologia, densidade, vitalidade e
acrosoma); observação de neurónios e os três tipos de fibras musculares,
propriedades específicas do eritrócito, propriedades específicas da célula
vegetal.', 'A disciplina é lecionada recorrendo a métodos expositivos e demonstrativos. Inclui uma componente prática em que os estudantes são distribuídos em classes de 10 alunos no máximo, onde são desenvolvidos trabalhos experimentais sobre os assuntos lecionados. A UC inclui dois momentos de avaliação (avaliação discreta) de natureza teórico-prática.',
'Biologia Celular e Molecular. Azevedo C., 2005. Essential Cell Biology. Alberts B, Bray D, Hopkin K, Johnson K, Lewis J, Raff M, Roberts K, Walter P., 2003. ', 'Bibliografia recomendada
1. Alberts B., Brey D.; Hopkin K.; Johnson A.; Lewis J; Raff M., Roberts K. and Walter P. 2010. Essential Cell Biology. Third edition. Garland Science, New York. 731 pp.
2. Azevedo, C.; Sunkel, C.E. 2012. Biologia Celular e Molecular.5ª Edição. Lidel, Lisboa.629 pp.', 'Português', 'Pressupõe-se que os alunos conheçam os conceitos fundamentais de citologia, histologia, embriologia e bioquímica.',
'1. Componentes de Avaliação
A avaliação da disciplina compreende a média de dois testes de natureza
teórico-prática, um dos quais a efectuar a meio do semestre e o outro decorrerá durante o período de exames definido pelo Calendário Escolar da UA. Os alunos poderão ainda optar por efectuar apenas o exame final.
2. A frequência das aulas dos alunos em regime normal rege-se pelo regulamento em vigor na UA.
3. Aprovação na disciplina
O aluno será aprovado caso atinja o mínimo de 9,5 valores.
4. Exame de Recurso - rege-se pelo regulamento em vigor na UA.', '• Compreender e aplicar conceitos básicos de biologia celular
• Capacidade de correlacionar os fenómenos a nível celular necessários à compreensão dos mecanismos moleculares subjacentes.
• Capacidade de pesquisar informação científica com recurso às novas tecnologias da comunicação e de informação.
• Capacidade para integrar os conhecimentos adquiridos com os de outras disciplinas.', 5, 1, 4, 37, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T:1H/semana;TP:1H/semana;PL:2H/semana', 'OT:1H/semana', 'Com esta unidade curricular (UC) pretende-se iniciar os alunos na Engenharia dos Materiais.',
                                'I- Conceitos básicos sobre o fabrico de materiais e suas implicações sociais, ambientais e energéticas
    Contributo da engenharia de materiais para o desenvolvimento económico
    Classificação dos materiais segundo a natureza das ligações químicas e segundo a sua função
    Tipos de polímeros e seu processamento
    Obtenção de materiais metálicos e seu processamento
    Materiais cerâmicos e seu processamento
    Materiais e sustentabilidade
II - Conceitos básicos sobre materiais
    Comportamento mecânico dos materiais: ensaio de tração uniaxial. Definição de tensão e deformação. A lei de Hooke e o regime elástico. Tensão de cedência e o regime plástico
    Materiais cristalinos, amorfos e com grau de organização atómica intermédio. Propriedades isotrópicas e anisotrópicas
    Materiais monocristalinos e policristalinos
    Materiais monofásicos e polifásicos
    Diagramas de fases unários e binários e sua interpretação', 'Aulas teóricas expositivas. Aulas teórico-práticas para resolução de exercícios. Nas aulas práticas do módulo I, são realizadas visitas a unidades de processamento de materiais cerâmicos, metálicos e poliméricos e trabalhos de grupo onde serão explorados temas sobre o fabrico de objetos. Nas aulas práticas do módulo II, são realizados trabalhos laboratoriais e a resolução de exercícios.',
    '- W.D. Callister, Fundamentos da ciência e engenharia de materiais, LTC, 4.ª Ed., 2014
- W.F. Smith e J. Hashemi, Fundamentos de engenharia e ciência dos materiais, McGraw-Hill, 5ª ed., 2012
- J. L. Baptista & R. F. Silva, Diagramas de Fases, 2ª ed., Univ. Aveiro, Aveiro, 1998', null, 'Português', 'Nenhum', 'Módulo I:
    Relatórios – elemento de avaliação 1;
    teste final – elemento de avaliação 2.
Classificação da parte 1 = 0,3 x (elemento de avaliação 1) + 0,7 x (elem. de avaliação 2)
 Módulo II:
    Relatórios – elemento de avaliação 3;
    teste final – elemento de avaliação 4.
Classificação da parte 2 = 0,3 x (elemento de avaliação 3) + 0,7 x (elem. de avaliação 4)
 Classificação final = 0,4 x (classificação da parte 1) + 0,6 x (classificação da parte 2)', 'No fim da unidade curricular, o aluno deverá ser capaz de:
- descrever os principais métodos de fabrico dos materiais;
- distinguir as diversas classes dos materiais com base no tipo de ligações químicas;
- interpretar a curva de tração uniaxial, identificando o regime elástico e o regime plástico e determinar o módulo de elasticidade, a tensão de cedência e a tensão de rotura;
- interpretar diagramas unários e binários.', 5, 1, 5, 38, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:4H/semana', 'A Unidade Curricular de Contabilidade Geral tem como objetivo fundamental dotar os estudantes dos conhecimentos que lhes permitam reconhecer a Contabilidade enquanto sistema de informação, instrumento para a tomada de decisões a nível interno e externo. Dentro desta perspetiva sistémica, analisar-se-á o seu objeto nos planos científico-técnico.
Do ponto de vista estritamente científico-técnico procurar-se-á dotar os estudantes de um adequado suporte teórico e teórico-prático. Pretende-se que os estudantes desenvolvam as suas competências ao nível da preparação das demonstrações financeiras, especialmente do balanço e das demonstrações dos resultados, e descrevam o processo de registo contabilístico das principais operações da atividade empresarial.'
, ' 1. Conceitos de contabilidade e normalização contabilística
    2. Demonstrações Financeiras:
           2.1. Balanço
           2.2. Demonstração dos resultados
           2.3. Demonstração dos fluxos de caixa
      3. O processo de registo
      4. O ciclo contabilístico e as operações de fim de período', '- Duas sessões teórico-práticas semanais, de duas horas cada; e uma hora tutorial semanal.
- Exposição teórica dos conteúdos e respectiva ilustração com recurso a exemplos de aplicação.
- Resolução de casos práticos.', 'Borges, António, Rodrigues, Azevedo, e Rodrigues, Rogério (2021) Elementos de Contabilidade Geral, Áreas Editora, 27.ª Edição, Lisboa. Nabais, Carlos e Nabais, Francisco (2021) Prática Contabilística, Lidel, 7.ª Edição atualizada, Lisboa. Rodrigues, João (2021) Sistema de Normalização Contabilística Explicado – SNC Explicado, Porto Editora, 8.ª Edição atualizada, Porto.', 'Bibliografia recomendada
Borges, António, Rodrigues, Azevedo, e Rodrigues, Rogério (2021) Elementos de Contabilidade Geral, Áreas Editora, 27.ª Edição, Lisboa.
Nabais, Carlos e Nabais, Francisco (2021) Prática Contabilística, Lidel, 7.ª Edição atualizada, Lisboa.
Rodrigues, João (2021) Sistema de Normalização Contabilística Explicado – SNC Explicado, Porto Editora, 8.ª Edição atualizada, Porto.',
'Português', 'Nenhum', 'Avaliação discreta ou exame final, utilizando o Moodle e o Safe Exam Browser (SEB).', '- Conhecer o enquadramento e as obrigações contabilísticas aplicáveis às empresas portuguesas, em termos de contas individuais e coletivas e os princípios éticos subjacentes;
- Explicar o objetivo da Contabilidade e a sua evolução;
- Reconhecer os elementos e a utilidade de cada demonstração financeira;
- Preparar e interpretar o Balanço, a Demonstração dos Resultados e a Demonstração dos Fluxos de Caixa;
- Registar contabilisticamente as principais operações correntes de uma entidade;
- Conhecer o que envolve a prestação de contas de uma entidade;
- Relacionar uma variedade de conceitos associados à prestação de contas e à interpretação da informação financeira;
- Apontar soluções contabilísticas para casos reais com base no normativo aplicável;
- Perceber o impacto das soluções contabilísticas ao nível das demonstrações financeiras.', 5, 1, 6, 39, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:6H/semana', 'Obtenção da formação matemática fundamental em cálculo diferencial e integral unidimensional.',
'1. Reta real e sucessões
Axiomática dos reais, supremos e ínfimos, sucessões. Indução matemática.
2. Séries numéricas
Definição e exemplos (incluindo séries geométricas). Critérios de comparação, do limite, da razão, da raiz e de Leibniz.
3. Funções reais de variável real
Limites e Continuidade. Teoremas do valor intermédio e de Weierstrass. Diferenciabilidade. Regras da cadeia e da inversa. Teoremas de Fermat, Rolle, Lagrange e Cauchy. Regra de Cauchy. Fórmula de Taylor. Extremos.
4. Primitivação
Primitivas imediatas, por partes, por mudança de variável, por decomposição de funções racionais.
5. Integração
Partições, somas de Riemann, propriedades básicas do integral. Integral indefinido, teorema fundamental. Integração por partes, por mudança de variável. Integrais impróprios. Aplicações geométricas do integral.',
'Esta unidade curricular tem 8 créditos ECTS e uma escolaridade semanal de 6 horas de aulas teórico-práticas (TP)  e 1 hora de orientação tutorial (OT).
Nas aulas TP são ministrados os conteúdos do programa fixado para esta unidade curricular integrando a exploração teórica dos conceitos e os resultados teóricos com a apresentação de exemplos práticos e teórico-práticos significativos e de exercícios para serem resolvidos pelos estudantes.
A OT destina-se, fundamentalmente, ao acompanhamento da evolução do estudante, ao esclarecimento de dúvidas e à discussão dos exercícios que, em cada aula TP, possam ter sido deixados para resolução fora da sala de aula.',
'Cálculo com funções de uma variável, vol. 1 e vol. 2 (apenas Cap. 3), Virgínia Santos. Universidade de Aveiro, 2009/10 (correspondentes pdfs podem ser obtidos no espaço de Análise Matemática I em http://elearning.ua.pt/).
    Cálculo numa variável real, J. Paulo Santos. IST press, 2013.
    Análise Matemática I, Luís Castro. Universidade de Aveiro, 2010 (correspondente pdf pode ser obtido no espaço de Análise Matemática I em http://elearning.ua.pt/).
    Numbers and Functions: Steps to Analysis, R. P. Burn. Cambridge University Press, 2000.
    Introdução à Análise Matemática (sexta edicão), J. Campos Ferreira. Lisboa: Fundação Calouste Gulbenkian, 1995.
    Curso de Análise Matemática, J. J. M. Sousa Pinto. Universidade de Aveiro, 2010.
    Análise Matemática: unidades teórico-práticas, Dalila Almeida et. al.. Universidade de Aveiro, 2010.', null, 'Português', 'Matemática do Ensino Secundário', 'Avaliação discreta:
    50.00% TP Teste 1
    50.00% TP Teste 2
Avaliação Final:
    100.00% TP Exame final', 'Capacidade de análise qualitativa de funções reais de variável real, de análise da natureza das séries numéricas quanto à sua convergência, de primitivação e integração segundo Riemann (incluindo o seu uso justificado na resolução de problemas).', 5, 1, 7, 40, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 3H/semana', 'A disciplina visa proporcionar aos alunos conhecimentos uma abordagem genérica ao direito, que possa funcionar como um enquadramento às diversas disciplinas jurídicas de conteúdo mais especifico que serão leccionadas ao longo da licenciatura.',
                ' I – CONSIDERAÇÕES PRÉVIAS.
1 – Noção de direito.
2- A ordem social e as instituições;
3- A ordem jurídica e a coacção.
4- O direito e a Justiça.
II- A ORDEM JURÍDICA E A NORMA.
1 – Estrutura da norma jurídica.
2- Características da norma jurídica.
3- Classificação das normas jurídicas.
4- Direito subjectivo e direito objectivo.
    4.1. Direito potestativo e estado de sujeição.
III – MEIOS DE TUTELA
1- A auto- tutela e hetero- tutela;
2- A tutela Judiciaria:
    2.1. A Independência do sistema judicial e dos tribunais
    2.2. Princípios de organização judiciária
      2.2.1. Tribunal Constitucional
      2.2.2. Tribunais judiciais
      2.2.3. Tribunais administrativos e fiscais
      2.2.4. Tribunal de Contas
      2.2.5. Julgados de paz
    2.3. Tribunal arbitral.
      2.3.1. Arbitragem institucional
      2.3.2. Arbitragem ad hoc
3-A tutela administrativa.
4- A autotutela:
    a. Acção directa.
    b. Legítima defesa.
    c. Estado de necessidade
    d. Direito de retenção
    e. Excepção de não cumprimento
IV – FONTES DE DIREITO E VIGÊNCIA DAS NORMAS
1 – A lei.
2- O direito comunitário: o principio de primazia e o efeito direito das normas comunitárias.
3- O costume
4- A doutrina e a jurisprudência
5 – A hierarquia das normas.
6- Entrada em vigor da lei.
    6.1. Competência legislativa;
    6.2. Promulgação;
    6.3. Publicação;
    6.4. Vacatio legis.
7 – Cessação da vigência da lei.
V – INTERPRETAÇÃO E INTEGRAÇÃO DA NORMA JURIDICA.
1- A interpretação da norma: identificação do problema.
     1.1 - Identificação das classes de Interpretação.
     1.2 – Classes de Interpretação.
        1.2.1. Interpretação subjectiva e objectiva.
     1.3 – Elementos de interpretação.
     1.4 – Resultados de interpretação.
2- A integração da norma jurídica.
     2.1. A obrigação de julgar.
     2.2. A distinção entre interpretação e integração da norma jurídica; importância prática da distinção.
     2.3. A lacuna jurídica.
     2.4. O recurso à analogia e a criação da norma ad-hoc.
VI – DA RELAÇÃO JURÍDICA E DOS CONTRATOS
1- Noção de relação jurídica.
2- Elementos da relação jurídica.
     2.1. Sujeitos.
       2.1.1. Conceito de personalidade jurídica.
       2.1.2. Capacidade
     2.2. Objecto
     2.3. Facto jurídico
     2.4. Garantia.
3- O principio de liberdade contratual.', 'A informação será ministrada sob a forma de enquadramento genérico, seguida de discussão sobre casos práticos, permitindo aos alunos adquirirem flexibilidade de raciocínio e espirito critico.',
'Justo, Santos A. “Introdução ao Direito”, Almedina, ultima edição.Mendes, Castro, J. “Introdução ao Direito”, Coimbra, ultima edição.', null, 'Português, Inglês', 'A disciplina não contém requisitos específicos.', ' - Avaliação continua, composta por três momentos de avaliação escrita realizadas nas aulas.',
'Pretende-se que os alunos adquiram um conjunto de conhecimentos e de metodologias que lhes permita integrar e analisar as diversas unidades curriculares juridicas que fazem parte do programa do curso.', 5, 1, 8, 41, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T: 2H/semana; TP: 1H/semana; PL: 1H/semana', 'OT:1H/semana', 'Esta disciplina de Mecânica Clássica é destinada aos alunos das Licenciaturas em Física, Engenharia Física, Engenharia Biomédica, Engenharia Aeroespacial e Engenharia Computacional. A disciplina está dividida em aulas teóricas, teórico-práticas e práticas laboratoriais.
Nas aulas teóricas a disciplina desenvolve o estudo da mecânica newtoniana. Fornece ainda aos estudantes a prática de técnicas matemáticas fundamentais.
Nas aulas laboratoriais os alunos realizam um conjunto de actividades laboratoriais visando a compreensão de fenómenos físicos, e aprendizagem das competências práticas básicas como planear experiências, analisar dados e apresentar os mesmos de forma escrita e oral.',
'Programa Teórico (42h TP)
Cap. 1 – Cálculo vetorial
    Operações vetoriais e escalares elementares.
    Vetores unitários e ortogonalidade.
    Produto escalar.
    Produto vetorial (áreas e volumes).
    Derivadas de um vetor em ordem a um escalar
Tópicos suplementares:
    Sistemas de coordenadas:
        Coordenadas cartesianas.
        Coordenadas polares.
        Coordenadas cilíndricas.
        Coordenadas esféricas.
    Vetores de base.
Cap. 2 – Cinemática:
    Sistemas de referência
    Vetor posição e trajetória.
    Vetor velocidade e aceleração.
    Movimento uniforme e uniformemente
    Coordenadas curvilíneas, aceleração tangencial e
    Movimento
Tópicos suplementares:
    Velocidade e aceleração em coordenadas polares, cilíndricas e esféricas.
Cap. 3 – Dinâmica de uma partícula:
    Leis de Newton
    Forças de ligação (reação normal e tensão).
    Forças de atrito (estático, cinético e viscoso).
    Força elástica (lei de Hooke).
    Pressão hidrostática e força de impulsão.
    Força gravítica e campo gravítico.
Tópicos suplementares:
    Referenciais não inerciais:
    Sistema de coordenadas em rotação
    Força de Coriolis e força centrífuga.
Cap. 4 – Trabalho e energia:
    Trabalho e energia cinética.
    Forças conservativas
    Energia potencial.
    Gradiente, divergência e rotacional.
    Mínimo de energia e equilíbrio de uma partícula.
Cap. 5 – Oscilações:
    Oscilador harmónico.
    Pêndulo simples.
    Oscilações amortecidas
    Oscilações forçadas.
    Ressonância.
    Oscilações acopladas.
 Cap. 6 – Dinâmica de um sistema de partículas:
    Centro de massa
    Energia cinética.
    Momento linear.
    Colisões elásticas e inelásticas.
    Movimento dum foguetão.
    Momento angular.
    Momento da força.
    Teoremas de conservação.
Cap. 7 – Dinâmica do corpo rígido:
    Momento de inércia.
    Teorema de Steiner
    Eixos principais de inércia.
    Rotação do corpo rígido.
    Binários de forças.
    Equilíbrio do corpo rígido.
    Trabalho e energia.
Tópicos suplementares:
    Tensor de inércia e eixos principais de inércia.
Capítulo suplementar:
Cap. 8 – Forças centrais:
    Massa reduzida.
    Equações de movimento.
    Órbitas.
    As leis de Kepler.
    Sondas e assistência gravítica.
Programa  Laboratorial (6 aulas)
Trabalho nº1: Movimento de projécteis
Trabalho nº2: Viscosidade de um líquido
Trabalho nº3: Conservação da energia mecânica
Trabalho nº4: Pêndulos acoplados.', 'Os conceitos dos tópicos curriculares serão apresentados nas aulas Teóricas. No sentido de desenvolver as competências teóricas e as capacidades de resolução de problemas serão fornecidos conjuntos de problemas para cada tópico do programa e resolvidos alguns problemas-tipo nas aulas Teórico-práticas.

As aulas práticas laboratoriais são dedicadas a trabalho de laboratório com 4 trabalhos experimentais de mecânica e subdividem-se em turmas tipicamente com 15 alunos, sendo os trabalhos experimentais realizados em grupo (3 alunos por grupo).

O laboratório está equipado com computadores de modo a promover a utilização de ferramentas computacionais na aquisição, tratamento e análise dos dados experimentais. Os alunos podem igualmente levar o seu computador portátil e/ou máquina de calcular gráfica. Na componente laboratorial o desempenho do aluno é avaliado de forma cumulativa através de um teste individual sobre todos os quatro trabalhos práticos, e de três minirrelatórios incidindo sobre  trabalhos diferentes.',
'-J. B. Marion e S. Thornton, Classical Dynamics of Particles and Systems, 4ª ed., Saunders College Publishing (1995). - R.A. Serway, Physics for Scientists and Engineers with Modern Physics, 2000, Saunders College Publishing.',
'Bibliografia recomendada
- Material didáctico (resumos teóricos, problemas, etc..) em elearning.ua.pt
- R.A. Serway, Physics for Scientists and Engineers with Modern Physics, 2000, Saunders College Publishing.
- J. B. Marion e S. Thornton, Classical Dynamics of Particles and Systems, 4ª ed., Saunders College Publishing (1995).
- Walter Greiner, Classical Mechanics, Point Particles and Relativity, Springer-Verlag, New York (2004).
- John R. Taylor, Classical Mechanics, University Science Books, California (2005).
- H. Goldstein, C. P. Poole e J. Safko, Classical Mechanics - Prentice Hall (2002).
- H. Goldstein, Classical Mechanics, Addison-Wesley Publishing (1980).
- W. Hauser, Introduction to the Principles of Mechanics, Addison-Wesley Publishing (1965).
- Murray R. Spiegel, Schaum''s Outline of Theoretical Mechanics.
- Feynman Lectures of Physics.
- Alonso - Finn, Física: um curso universitário, Vol. I -Mecânica
- L. Landau e E. Lifshitz, Mecânica, Editora MIR.
- Docentes da disciplina, Apontamentos de Física 1, Guia de Trabalhos práticos, 2000/2001.
Outros:
- Jearl Walker, The Flying Circus of Physics, Wiley (2006).
- J. Dias de Deus e outros. Introdução à Física, 2000, Mc-Graw-Hill
- D. Halliday e R. Resnick, Fundamentos de Física, 1993, Livros Técnicos e Científicos Editora.', 'Português', 'Não aplicável.', 'A avaliação da disciplina será feita segundo uma das duas modalidades descritas nas tabelas seguintes. A presença no 1º teste implica a opção pelo regime de avaliação mista. A aprovação à disciplina é concedida aos alunos que obtenham uma nota final superior ou igual a 10, de acordo com o Regulamento dos Estudos de Licenciatura (R.E.L.). Caso o aluno não obtenha aprovação poderá ainda realizar o Exame de Recurso, de acordo com o calendário escolar.
A - Avaliação final
    Componente                                               Peso (%)
    Escrita [1]                                                     70
    Exame final, duração 2h30
    Prática [3,4]                                                 30
    Teste Individual                  40
    1º minirrelatório                 20
    2º minirrelatório                 20
    3º minirrelatório                 20
B - Avaliação Discreta (*)
Componente                                               Peso (%)
Escrita [1]                                                     70
1º teste, 15 de dezembro de 2021       35
Teste final, data do exame                  35
Prática [3,4]                                                 30
Teste Individual                  40
1º minirrelatório                 20
2º minirrelatório                 20
3º minirrelatório                 20
(*) método de avaliação por defeito', 'Pretende-se que os alunos adquiram as seguintes competências/conhecimentos:
    Conhecimento da mecânica newtoniana e sua aplicação a problemas físicos básicos como o oscilador harmónico simples, o movimento planetário, o movimento circular, etc. Compreensão das leis de conservação e suas aplicações em mecânica. Conhecimento da dinâmica do corpo rígido.
    Além da aquisição destes conhecimentos específicos pretende-se que os estudantes desenvolvam as suas competências de resolução de problemas, requerendo a aplicação de técnicas matemáticas fundamentais e princípios básicos da Física. Espera-se que aprendam a produzir e apresentar uma solução bem estruturada, expondo com clareza o raciocínio.
    Pretende-se que o aluno desenvolva a capacidade de trabalhar em laboratório, individualmente e em grupo, de planear uma experiência, de descrever, analisar e criticar os dados experimentais, e retirar a informação relevante e interpretá-la ou extrapolá-la à luz das leis e princípios básicos da Física.
    Pretende-se também que o aluno desenvolva as suas competências de comunicação escrita e oral de modo a elaborar relatórios fluentes e bem estruturados.', 5, 1, 9, 42, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:3H/semana; PL:1H/semana', 'OT:1H/semana', 'A unidade curricular de Fundamentos de Química tem como objetivo providenciar aos estudantes dos primeiros ciclos em ciências e em engenharias conhecimento fundamental e competências em química com aplicação noutras áreas. No final do curso, o estudante deverá ser capaz de:
Reconhecer a importância da química;
Descrever a ligação química em moléculas com diferentes geometrias utilizando um modelo de teoria apropriado;
Descrever e fazer cálculos de equilíbrio químico;
Identificar ácidos e bases, explicar e fazer cálculos envolvendo pH;
Explicar matematicamente o comportamento de ácidos e base fracas e de sais e a variação de pH numa titulação;
Descrever o comportamento de soluções tampão;
Explicar o comportamento de substâncias pouco solúveis e fazer cálculos envolvendo Ks;
Explicar os conceitos de entropia, energia livre de Gibbs, e relacioná-los com a espontaneidade das reações e com Ke e fazer cálculos associados;
Descrever uma célula galvânica o conceito de potencial padrão de redução e da célula; calcular potenciais padrão de reação e aplicar a Eq. de Nernst;
Aplicar os conceitos básicos da cinética das reações químicas.', 'Estrutura atómica e propriedades periódicas dos elementos;
    Ligação Química;
Ligações covalentes e iónicas;
Exceções à regra do octeto;
Modelo RPECV;
Teoria do enlace de valência;
Teoria das orbitais moleculares;
    Equilíbrio químico;
Constante de equilíbrio;
Fatores que afetam o equilíbrio;
    Ácidos e bases;
Ácidos e bases de Brønsted-Lowry;
Escala de pH;
Ácidos e bases fracas;
    Equilíbrios em meio aquoso;
Titulações ácido-base;
Soluções tampão;
Produto de solubilidade;
Precipitação seletiva;
    6. Termodinâmica;
Sistemas, funções de estado, e energia;
Entalpia das reações químicas;
Entropia;
Energia livre de Gibbs e equilíbrio químico;
    Eletroquímica;
Pilhas galvanicas;
Potenciais normais de redução;
Equação de Nernst;
Eletrólise. Corrosão;
Cinética;
Lei de velocidade e ordem de reação;
Tempo de meia vida;
Equação de Arhenius.', 'O Programa de Fundamentos de Química encontra-se organizado de modo que os alunos do primeiro ano adquiram de forma estruturada os conteúdos e conhecimentos necessários, devidamente ilustrados com a resolução de exercícios tipo e exemplos de aplicação.

Os conceitos são ainda ilustrados com a pratica laboratorial que permite em simultâneo dotar o alunos de competências em operações laboratoriais básicas.

Globalmente os objetivos da unidade curricular e os conteúdos programáticos, estão desenhados de forma a dotar os alunos do primeiro dos cursos de Ciências e Engenharia da Universidade de Aveiro de uma formação sólida e homogénea, capacidade de análise e resolução de problemas concretos no que concerne aos princípios fundamentais da química, necessários para a prossecução dos seus estudos nas diferentes áreas de formação.',
'Bibliografia base:
Chang, J. Overby “Chemistry”, 13th edition, 2019 ISBN-13: 978-1259911156
R Chang, KA Goldsby, Química, Mc Graw Hill, 2012, 11ª Ed.
R Chang, Química, Mc Graw Hill, 1994, 5ª Ed.
Outras obras:
TL Brown et al., Chemistry, Pearson, 2010, 2ª Ed.
D Reger et al., Química: Princípios e Aplicações, Fundação Calouste Gulbenkian, 1997.
Sendo Fundamentos de Química uma UC curricular do 1º ano, as metodologias de ensino adotadas implicam uma ligação estreita entre os materiais de apoio e uma obra base.
Embora os docentes recomendem a utilização de obras em Inglês desde o início do ciclo de estudos constata-se que isto ainda representa um obstáculo para alguns alunos. A bibliografia base adotada, além de abordar adequadamente os conteúdos programáticos definidos, permite fazer a ligação estreita acima referida com as edições inglesa e portuguesa, permitindo ao alunos trabalhar com qualquer delas.',
null, 'Português', 'N.a.', 'A UC está organizada em três períodos semanais de contacto ( 2 x 1.5h TP +1hOT) e 2h PL a cada duas semanas.
As aulas são suportadas por material didático (MA), disponível na plataforma de e-learning. Os MA estão preparados em ligação com a bibliografia base, para a qual o aluno é frequentemente remetido.
Nas TP, são abordados em detalhe os conceitos fundamentais de cada conteúdo programático e ilustrados com a resolução/discussão detalhada de problemas tipo disponíveis nos MA. Dos MA consta ainda questões propostas para estudo individual e posterior discussão na TP ou OT.
Na PL os alunos executam trabalhos que ilustram os conceitos abordados nas TP.
A UC funciona em “Avaliação Discreta”, com dois testes contando cada um 37.5% cada na nota final. A componente Laboratorial representa 25% da classificação final. Os alunos podem optar por Exame Final e têm ainda acesso a uma época de Recurso/Melhoria, mantendo-se nestes casos o peso de 25% para a componente laboratorial.',
'O programa de Fundamentos de Química engloba alguns dos tópicos presentes em livros de texto dedicados aos conceitos e leis fundamentais da química. A seleção de tópicos foi determinada pelas necessidades de conhecimento em química dos alunos dos diversos cursos de Cie^ncias e Engenharia da Universidade de Aveiro. Os tópicos serão lecionados em maior ou menor detalhe, dependendo do nível de conhecimento adquirido pelos alunos nos 10.º, 11.º e 12.º anos do ensino secundário. Na abordagem das matérias será dada particular ênfase aos aspetos quantitativos, pelo que esta UC, com um programa extenso, requer como pré-requisito formação em matemática básica. Os tópicos I e II, sobre estrutura e propriedades da matéria, estão relacionados com os primeiros dois objetivos, enquanto que os tópicos de III a VIII, sobre química em solução, permitem alcançar os restantes objetivos de aprendizagem.
A unidade curricular permite ainda dotar os alunos de competências laboratoriais básicas, através da execução de trabalhos laboratoriais adequadamente articulados e ilustrativos dos conteúdos programáticos abordados ao longo do semestre.', 5, 1, 10, 43, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 2H/semana; PL: 2H/semana', 'Conhecer os conceitos básicos de Cristalografia.
Conhecer a simetria.
Conhecer os sistemas cristalográficos e as classes de simetria.
Conhecer o modo como os cristais se projectam em projecção estereográfica.
Conhecer a sistemática mineralógica.
Saber utilizar as principais técnicas de estudo dos minerais em microscopia de luz transmitida.', 'Teórico-práticas: Conceito de cristal. Simetria macroscópica: sistemas cristalográficos; índices de Miller; projecção estereográfica. Simetria microscópica. Propriedades físicas dos minerais. Fundamentos de cristaloquímica. Classificação químico-estrutural de minerais. Mineralogia sistemática: silicatos, elementos nativos, sulfuretos, carbonatos, fosfatos, sulfatos, óxidos, halogenetos, outros.
Práticas: Técnicas de estudo de minerais por microscopia de luz transmitida.', 'Cristalografia: aulas teórico-práticas com apresentação da matéria, manuseamento de modelos cristalográficos em madeira e plástico, para identificação da simetria, e exercícios sobre a projecção estereográfica.
Mineralogia sistemática: aulas teórico-práticas sobre as bases da classificação dos minerais, a sua divisão em diferentes categorias, a descrição das classes e a apresentação das características das espécies minerais mais importantes.
Mineralogia óptica: aulas práticas com utilização individual de microscópio de luz transmitida para o estudo de lâminas delgadas.',
'Kerr, P.F (1977) - Optical Mineralogy. McGraw-Hill. 492 pp.
Klein, C. & Dutrow, B. (2008) - The Manual of Mineral Science (after J.D. Dana). John Wiley & Sons. 716 pp.
Kostov, I. (1968) – Mineralogy. Oliver & Boyd. 587 pp.
Nesse, W.D. (2011) - Introduction to Mineralogy. Oxford University Press. 496 pp.
Nesse, W.D. (2012) - Introduction to Optical Mineralogy. Oxford University Press. 384 pp.
Putnis, A. (1992) - An Introduction to Mineral Sciences. Cambridge University Press. 480 pp.', null, 'Português', 'Química; Geologia Geral', 'Dois testes teórico-práticos (60%) e um teste prático (40%).', 'Conhecer os conceitos básicos de cristalografia; conhecer a simetria; conhecer os sistemas cristalográficos e classes de simetria; conhecer o modo como os cristais se projectam em projecção estereográfica. Conhecer a sistemática mineralógica. Conhecer as propriedades ópticas dos minerais e o modo de funcionamento do microscópio de luz transmitida.', 5, 1, 11, 44, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T: 2H/semana; TP: 2H/semana', 'OT:1H/semana', '
    Sensibilizar os alunos para a compreensão dos fenómenos psicológicos, com particular ênfase nos aspetos biopsicossociais.
    Fornecer as competências e conhecimentos básicos relativos às principais áreas temáticas da Psicologia.
    Dotar os alunos de competências necessárias para complementar as demais unidades curriculares do 1º ciclo de Psicologia.
    Estimular o desenvolvimento pessoal e a aquisição de competências relacionais.', 'Introdução:
- Definição e objeto de estudo da Psicologia;
- Temas atuais da Psicologia;
Fundamentos históricos e epistemológicos da Psicologia:
- A história da Psicologia e o papel da Psicologia na História;
- Epistemologia da Psicologia: Ciência e Psicologia científica;
- Temas, autores e escolas epistemológicas;
Linguagem e Pensamento:
- Comunicação;
- Classificar e categorizar;
- Resolução de problemas;
- Tomada de decisão;
Personalidade:
- Conceptualização e avaliação da personalidade;
- O desenvolvimento da personalidade;
- O debate pessoa-situação;
Stress e Saúde:
- A experiência de stress;
- Reação ao stress prolongado;
- Gestão do stress;
- Estilos de vida saudáveis e promoção da saúde;
Psicopatologia:
- Conceito de psicopatologia;
- Classificação de perturbações psicológicas;
- Modelos biológicos, cognitivos e ambientais da psicopatologia;
Psicoterapia:
- Terapias biomédicas;
- Psicoterapia psicodinâmica;
- Psicoterapia comportamental;
- Psicoterapia cognitiva;', 'As aulas têm um cariz teórico-prático. Pretende-se uma relação muito estreita da teoria com a prática da investigação, através da exposição e discussão de casos práticos, assim como a realização de exercícios de aplicação dos princípios teóricos apresentados (e.g., replicação de experiências clássicas relativas aos diferentes conteúdos temáticos abordados) e visionamento de vídeos. Os materiais de apoio às aulas serão disponibilizados através da plataforma de e-learning Moodle.',
'Eysenck, M. W., & Kaene, M. (2005) Cognitive Psychology: A Student’s Handbook. Hove: Psychology Press;
    Goodwin, C. J. (2009). Research Methods in Psychology: Methods and Design (6th ed). New York: Wiley;
    Gorman, P. (2004). Motivation and emotion. London: Routledge;
    Hergenhahn, B. R. (2009). An introduction to thehistory of psychology. Belmont, CA: Wadsworth;
    Nairne, J. (2013). Psychology (6th Ed). Belmont: Thomson / Wadsworth;
    Quinlan, P., & Dyson, B. (2008). Cognitivepsychology. Harlow: PearsonEducation;
    Reeve, J. (2005). Understanding motivation andemotion. Hoboken (NJ): John Wiley & Sons;
    Weiten, W. (2002). Introdução à psicologia : Temas evariações. São Paulo: Pioneira Thomson Learning;
Nota: Será disponibilizada bibliografia adicional no final de cada aula, ao longo do semestre.', null, 'Português', 'Não aplicável.', 'Em relação à avaliação dos alunos, e conforme o Regulamento da UA, esta pode ser discreta ou final. A avaliação discreta compreende: 1) Trabalho prático que consiste na elaboração de um relatório, a realizar em grupo (30%); 2) Apresentação e discussão de um artigo científico relativo a uma das temáticas incluídas no programa da Unidade Curricular (20%). 3) Realização de uma prova escrita individual (50%). A avaliação final consiste numa prova de avaliação escrita sobre toda a matéria (T/P).',
'Compreender os fenómenos psicológicos, com particular ênfase nos aspetos biopsicossociais;
Adquirir as competências e conhecimentos básicos relativos às principais áreas temáticas da Psicologia;
Adquirir as competências necessárias para complementar as demais unidades curriculares do 1º ciclo de Psicologia;
Adquirir competências relacionais.', 5, 1, 12, 45, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'PL: 2H/semana', 'Espera-se com esta unidade curricular desenvolver a percepção e o ouvido crítico do aluno relativamente ao objeto musical.
O ritmo, melodia e harmonia, em contextos de música clássica e pop são aptidões que o estudante deverá também aprofundar.', 'Os conteúdos dividem-se em quatro áreas de saber fundamentais:
Ritmo:
             Estruturas rímicas simples;
             Métricas binária e ternária;
             Síncopa e contratempo na Bossa-Nova;
Melodia:
             Modalismo;
             Os modos enquanto sistemas de “orgânicos” de alturas;
             Melodia em contexto tonal clássico;
Harmonia:
             Harmonia clássica: os acordes diatónicos nos modos maior e menor;
             Acordes de 7ª da dominante e 7ª diminuta;
             Tonicização e modulação;
             Audição tímbrica;
             Cifra funcional.', 'As metodologias desenvolvem-se sobretudo com base em repertório específico, ilustrativo de cada âmbito enunciado nos conteúdos programáticos. O trabalho é fundamentalmente ao nível empírico. Pressupõe a audição ativa em vários modelos. O processo implica ainda a tradução posterior para o domínio conceptual. Assim:
Ritmo:
Repertório fundamentalmente do Barroco e Clássico; ainda, Pop e rock;
Melodia:
Repertório fundamentalmente da música medieval e renascentista;
Pop e Rock;
Harmonia:
Repertório fundamentalmente Classicismo;
Pop/Rock.', 'A bibliografia consiste principalmente em repertório variado do Classicismo.', null, 'Português e Inglês', 'Admissão e inscrição na Licenciatura em Música.', 'Avaliação Final:
    50.00% P Tarefas práticas;
    30.00% P Teste escrito;
    20.00% P Participação nas aulas.', 'A unidade curricular Formação Auditiva A tem como objetivo geral oferecer uma preparação especializada do ouvido, voltada para as necessidades específicas da profissão musical, tanto no domínio da interpretação como no exercício da docência, assim como contribuir para a sensibilização diante de distintos estilos. Também, fornecer os elementos teóricos e argumentos de racionalização do discurso musical necessários para a eficiente compreensão do fenómeno musical.', 5, 1, 13, 46, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 1H/semana; PL: 3H/semana', 'OT:1H/semana', 'A UC tem dois objetivos gerais:
    Promover a inserção dos estudantes da LEM no Departamento de Engenharia Mecânica, fomentando o contacto com os vários docentes e dando a conhecer as principais áreas de intervenção;
    Garantir que todos os estudantes consigam conhecer as áreas de atividade da Engenharia Mecânica, permitindo-lhes obter conhecimentos e sensibilidades base para promover um claro entendimento das matérias que receberão a jusante no curso, percebendo a interligação e aplicabilidade das mesmas.
Em termos de objetivos de aprendizagem, pretende-se que os estudantes desenvolvam capacidades de:
    Abordar e decidir sobre estratégias de resolução de problemas de engenharia, em particular os de engenharia mecânica, nomeadamente nas subáreas genéricas que fazem parte do programa da disciplina;
    Raciocinar autonomamente sobre questões de engenharia, iniciando o desenvolvimento de espírito crítico integrado que se pretende numa formação em engenharia;
    Comunicação e escrita científica.
Adicionalmente, os objectivos secundários da disciplina de Introdução à Engenharia Mecânica são desenvolver nos alunos a capacidade de abordar e decidir sobre estratégias de resolução de problemas de engenharia, em particular os de engenharia mecânica. É ainda objectivo que os alunos tenham um primeiro contacto e ganhem sensibilidade às questões da ética e deontologia profissional e a técnicas genéricas de apresentação oral e escrita.',
'Sendo esta uma UC integradora de primeiro ano, os conteúdos podem resumir-se nos seguintes tópicos:
    A profissão do Engenheiro Mecânico; algumas noções de ética e deontologia profissional; o papel da Ordem dos Engenheiros; carreiras e aprendizagem para a vida;
    Resolução de problemas e técnicas de comunicação; realizar um relatório escrito; preparar e fazer uma apresentação oral; técnicas de comunicação;
    Esforços em estruturas e máquinas;
    Introdução aos materiais e ao comportamento de materiais de engenharia; Tensões e deformações;
    Movimento e transmissão de potência;
    Introdução ao projeto mecânico;
    Conceitos básicos de mecânica dos fluidos;
    Introdução à transmissão de calor e aos sistemas energéticos;
    Automação e sistemas flexíveis da produção;
    Robótica;
    Nano-materiais.', 'A UC desenvolve-se em aulas teórico-práticas de apresentação de matérias base, promovidas por diferentes docentes do departamento, em paralelo com atividades de aplicação nas aulas práticas. Nas aulas teórico-práticas serão discutidos os conteúdos teóricos fundamentais, exemplificados com a resolução de exercícios práticos de aplicação da matéria. Nas aulas práticas serão desenvolvidos pequenos trabalhos de grupo com apoio tutorial dos docentes envolvidos. Estes são de pequena duração (2-3 semanas) e focados em problemas simples, mas aplicados, de engenharia mecânica. Dá-se particular relevo a trabalhos de aplicação industrial ou social que permitam sobretudo o contacto com nomenclaturas, práticas e conceitos-chave por parte dos estudantes, num esforço de aprendizagem ativa e proporcionando uma visão geral sobre as áreas de intervenção do curso, bem como a justificação do seu plano curricular.',
'"An Introduction to Mechanical Engineering", J. Wickert, Thomson Engineering, 2nd Ed (2005) ', 'Bibliografia recomendada
Bibliografia adoptada (obrigatória):
J. Wickert; An Introduction to Mechanical Engineering, Thomson Engineering, 2nd Ed., 2005.
Bibliografia adicional (facultativa):
[1] R. Rizza; Introduction to Mechanical Engineering; E-Source, Prentice Hall, 2001.
[2] B.M. Das, A. Kassimali, S. Sami; Engineering Mechanics - Statics; Irwin, 1994.
[3] F.P. Beer, E.R. Johnston; Mecânica Vectorial para Engenheiros (vol. 2), 6a Ed.; McGraw-Hill, 2000.
[4] C. Moura Branco; Mecânica dos Materiais; Fundação Calouste Gulbenkian, 1985.
[5] V.L. Streeter, E.B. Wylie, K.W. Bedford; Fluid Mechanics; McGraw-Hill Book Company, 1998.
[6] Y. Çengel, M.A. Boles; Termodinâmica; McGraw-Hill, Lisboa, 1998.', 'Português', 'Não são necessários conhecimentos de base para frequentar a disciplina de Introdução à Engenharia Mecânica.', 'Avaliação contínua:
    100.00% TP Avaliação por módulos (testes+relatórios);
Avaliação Final:
    100.00% TP Exame final por módulos (testes+relatórios).', 'Capacidade de abordar e decidir sobre estratégias de resolução de problemas de engenharia, em particular os de engenharia mecânica, nas áreas genéricas que fazem parte do programa da disciplina. Capacidade de raciocinar autonomamente sobre questões de engenharia. Desenvolver capacidade mínima para apresentar e comunicar oralmente e por escrito.
Conhecimento das várias áreas da Engenharia Mecânica, despertando o interesse e curiosidade.', 5, 1, 14, 47, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:1H/semana', 'A unidade curricular de Introdução à Engenharia Civil tem como objetivo fundamental que os estudantes conheçam o âmbito de aplicação desta Engenharia.
Tem-se assim como objetivos:
- Identificar e analisar a importância e impactos da Engenharia Civil, a nível social, económico e ambiental;
- Resolver, em ambiente de equipa, um problema social concreto, através de soluções de Engenharia Civil.', 'História e evolução da Engenharia Civil;
O contributo da Engenharia Civil para os desafios científicos e societais atuais, tendo por base os 17 Objetivos de Desenvolvimento Sustentável das Nações Unidas para 2030', 'Esta unidade curricular centra-se na realização de um trabalho baseado em situações próximas do mundo real. Os projetos têm uma componente de trabalho obrigatória em equipa que pode ser concretizada de duas formas:
a) Os alunos formam equipas com 2 a 3 elementos.
b) Os alunos podem trabalhar em colaboração com outros alunos de anos mais avançados do DECivil.
Os trabalhos são propostos e orientados por docentes da LEC e do MEC. A evolução dos trabalhos também é discutida nas aulas com os docentes da unidade curricular e as equipas devem preparar um plano de atividades semanal por cada elemento do grupo. Cada meta está associada a uma apresentação oral para discussão dos resultados atingidos.
A metodologia a aplicar centra-se no desenvolvimento de problem based learning.', 'H.R. Shercliff (2011). Guide to Report Writing. Department of Engineering, University of Cambridge. http://to.eng.cam.ac.uk/teaching/teachoff/study_skills/ReportWritingGuide/downloads/ReportWritingGuide_1st_edition_2011_Exposition.pdf. Accessed June 28, 2019;
Ana Carla Madeira (2007). Comunicar em ciência. Escolar Editora. ISBN 9789725921654;
University of Chicago (2010). The Chicago Manual of style (16th edition);
http://www.chicagomanualofstyle.org/16/contents.html. Accessed June 28, 2019;
História Breve da Engenharia Civil Pilar da Civilização Ocidental. Ordem dos Engenheiros;
Guerra, Franklin (2010). História da Engenharia em Portugal – 2ªEd., F. G. Editor, Porto. BPG 62 (469)(091) - G;
Bibliografia aconselhada pelos Professores.', null, 'Português', 'N.a', 'Esta unidade curricular centra-se na realização de um trabalho baseado em situações próximas do mundo real. Os projetos têm uma componente de trabalho obrigatória em equipa que pode ser concretizada de duas formas:
 a) Os alunos formam equipas com 2 a 3 elementos;
 b) Os alunos podem trabalhar em colaboração com outros alunos de anos mais avançados do DECivil.', 'Ao pretender-se que o estudante analise e encontre, em ambiente de equipa, possíveis soluções, para um problema societal concreto, tem-se por objetivo que o façam aplicando soluções de Engenharia civil e que aprofundem o seu conhecimento quanto ao âmbito da respetiva aplicação, em ambiente colaborativo, desenvolvendo as suas capacidades de trabalho em grupo, de pesquisa e de comunicação.', 5, 1, 15, 48, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'PL: 3H/semana', 'A UC Laboratórios de Biomedicina 1 tem como objetivo geral proporcionar ao estudante uma aprendizagem de diferentes ferramentas de química e bioquímica fundamentais para a formação da Licenciatura em Ciências Biomédicas e que serão basilares para a realização de trabalhos práticos dos Laboratórios de Biomedicina 2, 3, 4 e 5.
No final desta UC o aluno deverá:
    1. Aplicar regras de segurança e biossegurança de acordo com o trabalho laboratorial a desenvolver.
    2. Analisar um protocolo laboratorial.
    3. Interpretar e discutir os resultados laboratoriais obtidos.
    4. Preparar relatórios das atividades laboratoriais realizadas.
    5. Realizar operações unitárias da prática laboratorial introdutória nas áreas da Química e Bioquímica aplicadas às ciências da saúde.
    6. Aplicar metodologias de análise quantitativas e qualitativas de espécies químicas e biomoléculas importantes para o funcionamento do corpo humano.', 'A. Regras de segurança em laboratórios de química e na manipulação de amostras biológicas.
B. Técnicas de medição de volumes. Preparação de soluções, diluições e cálculo de concentrações.
C. Curva de titulação de um aminoácido. Determinação do ponto isoeléctrico de uma proteína.
D. Análise e quantificação de açucares. Determinação de glucose no sangue.
E. Extração e quantificação do conteúdo proteico de amostras biológicas e análise por SDS-PAGE.
F. Velocidade de uma reação - cinética enzimática da amilose.
G. Separação da albumina e da hemoglobina por cromatografia de troca iónica. Espectros de absorção de oxihemoglobina e da metahemoglobina.
H. Extração de lípidos de uma amostra biológica e análise por cromatografia em camada fina.
I. Extração, purificação, quantificação e detecção de ácidos nucleicos.
J. Determinação da vitamina C em alimentos.
K. Determinação de cálcio e fósforo na urina.', 'A aprendizagem desta UC baseia-se em aulas práticas de laboratório sempre precedidas duma contextualização. Pressupõe-se que os estudantes se preparem autonomamente para cada aula prática de modo a saberem exatamente o que vão fazer no laboratório e saibam explicar o procedimento e a teoria por detrás deste. Após a conclusão e entrega do relatório o professor terá 1 semana para dar feedback aos estudantes e estes terão a oportunidade de atempadamente esclarecerem dúvidas acerca dos relatórios realizados. No meio e no final do semestre haverá uma aula dedicada à discussão dos trabalhos realizados.',
'McMurry, M. E. Castellion, D. S. Ballantine, Fundamentals of General, Organic, and Biological Chemistry, Pearson Prentice Hall, London, 2007.
G. Smith, Principles of General, Organic, & Biological Chemistry, McGraw-Hill, New York, 2012.
McMurry, T. Begley, The Organic Chemistry of Biological Pathways, Roberts & Company, Greenwood Village, 2005.
M. Dewick, Essentials of Organic Chemistry, John Wiley & Sons, Ltd, London, 2006.
H. Jeffery, J. Bassett, J. Mendham, R. C. Denney, VOGEL, Análise Química Quantitativa, 5ª ed., Editora Guanabara Koogan S.A., Rio de Janeiro, 1992, cap.10.
Guia da disciplina a realizar pelos docentes.', null, 'Português', 'Existem 5 UC de Laboratórios de Biomedicina – LabBM - (1 a 5, semestrais) sendo o objetivo global a aplicação prática dos conhecimentos teóricos e o desenvolvimento de competências ao nível do trabalho em ambiente de laboratório. Esta componente de aprendizagem é um pilar na formação dos licenciados em Ciências Biomédicas. Destas 5 UC, 2 (1 e 2) são lecionadas no 1º ano da licenciatura e as outras 2 (3 e 4) no 2º ano e por fim os LabBM5 no 3º ano, 1º semestre.
Foram estruturados 6 objetivos de aprendizagem (OA), relacionados com os conteúdos programáticos da seguinte forma:
OA1 - conteúdos A.
OA2 a OA6 - conteúdos B a K.
Os objetivos da UC referem-se de modo integrado aos conteúdos programáticos propostos.', 'A avaliação é contínua e inclui igual percentagem para cada um dos relatórios que resultar de cada aula prática (10 trabalhos práticos).
O teste de avaliação escrito (que incluirá questões sobre os trabalhos 2 a 10) terá um peso de 50%, 40% corresponderão à avaliação dos relatórios das atividades laboratoriais (cada relatório contribuirá para 4% da classificação final) e os restantes 10% corresponderão ao desempenho nas aulas práticas que inclui assiduidade, pontualidade e empenho na realização dos trabalhos.
A avaliação ocorre em 3 momentos: recurso/melhoria, época especial e final com estrutura semelhante ao da época normal.',
'A metodologia de ensino da UC está adaptada à escolaridade (3PL).

Existirão 10 aulas práticas que incluirão para além do procedimento prático a sua contextualização. Os estudantes terão acesso aos procedimentos antes da aula e assim podem preparar a aula convenientemente. No fim de cada aula os estudantes realizam um relatório, cujo formato será previamente acordado com os professores, onde descrevem os resultados obtidos e os discutem individualmente. Prevê-se que se realizem 10 trabalhos práticos e consequentemente 10 relatórios. Todos terão o mesmo peso e correspondem a 80% da nota final. Na última aula será realizado um teste escrito baseado nos conteúdos das aulas práticas (20% da nota final).

O objetivo global da UC é que o estudante apreenda diferentes ferramentas de química e bioquímica fundamentais para as ciências da saúde. Na primeira aula serão apresentadas regras de segurança e bio-segurança e as regras para a realização dos relatórios e funcionamento da disciplina. Nos 10 trabalhos laboratoriais propostos os estudantes realizarão experiências que envolvam operações unitárias da prática laboratorial das áreas da Química e Bioquímica aplicadas às ciências da saúde e que apliquem metodologias de análise quantitativas e qualitativas de espécies químicas e biomoléculas importantes para o funcionamento do corpo humano (aminoácidos, proteínas, açúcares, vitaminas, lípidos, minerais). Os trabalhos práticos realizados e respetivos relatórios serão discutidos em dois momentos do semestre.', 5, 1, 16, 49, '2021-09-01');

insert into ac(id, designacao, sigla) VALUES (0, 'Sem AC', 'SAC');

LOAD DATA LOCAL INFILE 'D:/drs.csv'
INTO TABLE utilizadores
character set UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'D:/ucs.csv'
INTO TABLE uc
CHARACTER SET UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'D:/dpucs.csv'
INTO TABLE dpuc
CHARACTER SET UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
/*
select * from utilizadores;
select * from uc;
select * from dpuc;
select * from unidade_organica;
select * from ac;
select * from curso_UC;
select * from curso;
select * from periodo_letivo;
select * from tipo_utilizador;
select * from estado;
*/