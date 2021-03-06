
create database dpuc;
use dpuc;

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
insert into estado(id, nome, descricao) values (1, 'C1', 'Em criac??o');
insert into estado(id, nome, descricao) values (2, 'C2', 'Em edicao');
insert into estado(id, nome, descricao) values (3, 'C3', 'Fechado');
insert into estado(id, nome, descricao) values (4, 'C4', 'Em aprovacao');
insert into estado(id, nome, descricao) values (5, 'C5', 'Aprovado');
insert into estado(id, nome, descricao) values (6, 'C6', 'Desativado');
insert into estado(id, nome, descricao) values (7, 'E1', 'Defini????o de regente');
insert into estado(id, nome, descricao) values (8, 'E2', 'Em edi????o');
insert into estado(id, nome, descricao) values (9, 'E3', 'Em aprova????o');
insert into estado(id, nome, descricao) values (10, 'E4', 'Aprovado');

#Insert periodos letivos
insert into periodo_letivo(periodo) values ('1?? Semestre');
insert into periodo_letivo(periodo) values ('2?? Semestre');

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
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jo??o Manuel Nunes Torr??o', 10313225, 'jtorrao@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Nuno Miguel Gon??alves Borges de Carvalho', 10315024, 'nbcarvalho@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Isabel Couto Neto da Silva Miranda', 10310635, 'miranda@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Fernando Jos?? Mendes Gon??alves', 10313932, 'fjmg@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Rui Ramos Ferreira e Silva', 10312035, 'rsilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Anabela Botelho Veloso', 80458146, 'anabela.botelho@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Manuel Ant??nio Gon??alves Martins', 10312798, 'martins@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos Jos?? de Oliveira e Silva Rodrigues', 10315248, 'cjose@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jo??o Miguel Sequeira Silva Dias', 10310684, 'joao.dias@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Armando Jorge Domingues Silvestre', 10312665, 'armsil@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Eduardo Anselmo Ferreira da Silva', 10309074, 'eafsilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos Fernandes da Silva', 10321891, 'csilva@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Isabel Barreto Furtado Franco de Albuquerque Veloso', 10316053, 'aiv@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Robertt Angelo Fontes Valente', 10318601, 'robertt@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jos?? Claudino de Pinho Cardoso', 10308367, 'claudino@ua.pt', '123', 1);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Odete Abreu Beir??o da Cruz e Silva', 10317600, 'odetecs@ua.pt', '123', 1);
    #DC
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ant??nio Manuel Lopes Andrade', 10315073,'aandrade@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carlos Manuel Azevedo Costa', 10322010,'carlos.costa@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ana Paula Duarte Gomes', 10308626,'pgomes@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Salom?? Fernandes Pinheiro de Almeida', 10313715,'salmeida@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Augusto Lu??s Barros Lopes', 10311839,'augusto@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('S??lvia Lu??s Teixeira Pinto Ferreira Jorge', 10321373,'sjorge@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Elisa Carrancho Fernandes', 10321317,'maria.elisa@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Lu??s Miguel Sim??es Lucas Pires', 10318391,'mlucaspires@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Manuel Ant??nio dos Santos Barroso', 10311062,'scpip@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Eduarda da Cunha Pereira', 10308913,'eduper@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria do Ros??rio Mascarenhas de Almeida Azevedo', 10308108,'mazevedo@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Sandra Concei????o Ribeiro de Carvalho', 80648392,'sandrarc@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ant??nio Jos?? Vassalo Neves Louren??o', 10315129,'vassalo.lourenco@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jo??o Alexandre Dias de Oliveira', 10327365,'jalex@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Fernanda da Silva Rodrigues', 10318755,'mfrodrigues@ua.pt', '123', 3);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Bruno Miguel Rodrigues das Neves', 80306414,'bruno.neves@ua.pt', '123', 3);
    #DR
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ant??nio Nuno Rosmaninho Rolo', 10311482, 'rosmaninho@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jo??o Manuel de Oliveira e Silva Rodrigues', 10314156, 'jmr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Raquel Rocha Pinto', 10312973, 'raquel@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria Helena Abreu Silva', 10310285, 'hsilva@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Augusto Lu??s Barros Lopes', 10311839, 'augusto.dr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jorge Manuel da Rocha S??o Marcos', 11707604, 'sao.marcos@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Nat??lia da Costa Martins', 10312280, 'natalia@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Rodrigo Manuel de Mesquita Pomares Salgueiro de Carvalho', 10321611, 'rcarvalho@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ricardo Assis Guimar??es Dias', 10315164, 'rdias@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Maria do Amparo Ferreira Faustino', 103315885, 'faustino@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Fernando Joaquim Fernandes Tavares Rocha', 10309858, 'tavares.rocha@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Marco Alexandre Barbosa de Vasconcelos', 80511143, 'mvasconcelos@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Joaquim Louren??o Fragoso Branco', 10320925, 'jlfbranco@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Ant??nio Gil D''Orey de Andrade Campos', 10321688, 'gilac@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Jos?? Claudino de Pinho Cardoso', 10308367, 'claudino.dr@ua.pt', '123', 2);
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('Carla Alexandra Pina da Cruz Nunes', 10325566, 'alexandranunes@ua.pt', '123', 2);

#Insert unidades org??nicas
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (2, 'Departamento de L??nguas e Culturas', 'DLC', 2);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (4, 'Departamento de Eletr??nica, Telecomunica????es e Inform??tica', 'DETI', 3);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (7, 'Departamento de Ambiente e Ordenamento', 'DAO', 4);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (8, 'Departamento de Biologia', 'DBio', 5);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (9, 'Departamento de Engenharia de Materiais e Cer??mica', 'DEMaC', 5);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (10, 'Departamento de Economia, Gest??o e Engenharia Industrial', 'DEGEIT', 6);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (11, 'Departamento de Matem??tica', 'DMat', 7);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (12, 'Departamento de Ci??ncias Sociais, Pol??ticas e do Territ??rio', 'DCSPT', 8);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (13, 'Departamento de F??sica', 'DFis', 9);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (15, 'Departamento de Qu??mica', 'DQ', 10);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (16, 'Departamento de Geoci??ncias', 'DGeo', 11);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (18, 'Departamento de Educa????o e Psicologia', 'DEP', 12);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (21, 'Departamento de Comunica????o e Arte', 'DeCA', 13);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (22, 'Departamento de Engenharia Mec??nica', 'DEM', 14);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (28, 'Departamento de Engenharia Civil', 'DECivil', 15);
insert into unidade_organica (id, nome, sigla, utilizadoresid) VALUES (30, 'Departamento de Ci??ncias M??dicas', 'DCM', 16);

#Insert cursos
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (35, 'Licenciatura em L??nguas e Estudos Editoriais', 2, 17);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (383, 'Licenciatura em Engenharia Inform??tica', 4, 18);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (8318, 'Licenciatura em Engenharia do Ambiente', 7, 19);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (15, 'Licenciatura em Biologia e Geologia', 8, 20);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (483, 'Licenciatura em Engenharia de Materiais', 9, 21);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (21, 'Licenciatura em Economia', 10, 22);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (38, 'Licenciatura em Matem??tica', 11, 23);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (54, 'Licenciatura em Administra????o P??blica', 12, 24);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (33, 'Licenciatura em F??sica', 13, 25);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (43, 'Licenciatura em Qu??mica', 15, 26);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (418, 'Licenciatura em Geologia', 16, 27);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (42, 'Licenciatura em Psicologia', 18, 28);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (40, 'Licenciatura em M??sica', 21, 29);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (482, 'Licenciatura em Engenharia Mec??nica', 22, 30);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (491, 'Licenciatura em Engenharia Civil', 28, 31);
insert into curso (id, nome, unidade_organicaid, utilizadoresid) VALUES (18, 'Licenciatura em Ci??ncias Biom??dicas', 30, 32);

#Insert AC
insert into ac (designacao, sigla) VALUES ('Estudos Culturais', 'EC');
insert into ac (designacao, sigla) VALUES ('Inform??tica', 'I');
insert into ac (designacao, sigla) VALUES ('Matem??tica', 'M');
insert into ac (designacao, sigla) VALUES ('Biologia', 'B');
insert into ac (designacao, sigla) VALUES ('Ci??ncia e Engenharia dos Materiais', 'CEM');
insert into ac (designacao, sigla) VALUES ('Contabilidade', 'C');
insert into ac (designacao, sigla) VALUES ('Ci??ncias Jur??dicas', 'CJ');
insert into ac (designacao, sigla) VALUES ('F??sica', 'F');
insert into ac (designacao, sigla) VALUES ('Qu??mica', 'Q');
insert into ac (designacao, sigla) VALUES ('Geoci??ncias', 'GEO');
insert into ac (designacao, sigla) VALUES ('Psicologia', 'PSI');
insert into ac (designacao, sigla) VALUES ('M??sica', 'MU');
insert into ac (designacao, sigla) VALUES ('Engenharia Mec??nica', 'EM');
insert into ac (designacao, sigla) VALUES ('Engenharia Civil', 'ECivil');
insert into ac (designacao, sigla) VALUES ('Ci??ncias Biom??dicas', 'CBM');

#Insert unidades curriculares
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (44535, 'Cultura Portuguesa Contempor??nea', 6, 2, 1);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40379, 'Fundamentos de Programa????o', 6, 4, 2);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42709, '??lgebra Linear e Geometria Anal??tica', 6, 7, 3);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40352, 'Biologia Celular', 6, 8, 4);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (40787, 'Introdu????o ?? Engenharia de Materiais', 6, 9, 5);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (45702, 'Contabilidade Geral', 6, 10, 6);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42706, 'An??lise Matem??tica I', 8, 11, 3);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (45824, 'Introdu????o Ao Direito', 4, 12, 7);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (47169, 'Mec??nica Cl??ssica', 6, 13, 8);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (41937, 'Fundamentos de Qu??mica', 6, 15, 9);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42240, 'Mineralogia', 6, 16, 10);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (47141, 'Introdu????o ?? Psicologia', 6, 18, 11);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (46713, 'Forma????o Auditiva A', 4, 21, 12);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (46493, 'Introdu????o ?? Engenharia Mec??nica', 6, 22, 13);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (42038, 'Introdu????o ?? Engenharia Civil', 2, 28, 14);
insert into uc (codigo, designacao, ects, unidade_organicaid, acid) VALUES (41569, 'Laborat??rios de Biomedicina 1', 4, 30, 15);

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
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:3H/semana', 'I ??? A descoberta de Portugal na transi????o para o s??culo XX
Apresentar o processo de desenvolvimento hist??rico da consci??ncia nacional;
Problematizar os discursos sobre a identidade nacional portuguesa produzidos nos s??culos XIX e XX;
Enunciar o contributo de alguns autores e movimentos intelectuais para o debate sobre a identidade nacional.
Apreciar o crescente interesse pelo conhecimento directo e generalizado de Portugal, ocorrido na transi????o para o s??culo XX-
II ??? Antropologia nacional
Tra??ar o nascimento da etnografia em associa????o com a valoriza????o da cultura popular e o desenvolvimento da consci??ncia nacional;
Verificar o processo de estetiza????o da cultura tradicional inerente ?? valoriza????o desse patrim??nio;
Observar o processo de estetiza????o da cultura tradicional induzido pelo neogarrettismo e promovido pelo Estado Novo;
Integrar os ranchos folcl??ricos, as marchas populares e o concurso da ??aldeia mais portuguesa de Portugal?? (1938) no ??mbito do processo de estetiza????o da cultura tradicional:
Identificar e criticar a interpreta????o caracterol??gica da identidade nacional;
Expor e criticar a ideia de uma ??personalidade-base?? do Portugu??s, apresentada porJorge Dias;
Integrar o trabalho de Mendes Correia no contexto da antropologia anterior ?? II Guerra Mundial;
Apresentar criticamente as conclus??es de Mendes Correia quanto ?? exist??ncia de uma identidade biol??gica de Portugal.
III ??? Artes portuguesas
Descrever o nascimento e o desenvolvimento da preocupa????o nacional na m??sica, nas artes pl??sticas e na historiografia art??stica;
Avaliar os fundamentos ideol??gicos, art??sticos e etnogr??ficos da ??casa portuguesa?? e das outras ??casas nacionais??;
Observar o processo de essencializa????o dos discursos nacionais;
Identificar os principais t??picos de debate suscitados pela interpreta????o nacional da arte;
Caracterizar art??stica e ideologicamente o neomanuelino e o neo-rom??nico;
Identificar os influxos nacionalistas presentes no classicismo monumental totalit??rio;
Discernir o processo hist??rico de atribui????o de qualidades est??ticas ?? paisagem;
Discernir o processo de cria????o de paisagens nacionais;
Identificar os discursos nacionais presentes na procura de uma ??escola portuguesa de pintura?? e no desenvolvimento da pintura de hist??ria e de costumes, da fotografia pictorialista, da m??sica erudita dos s??culos XIX e XX e nos ataques contra o modernismo e o ??internacionalismo??.', 'I ??? A descoberta das culturas nacionais.
II ??? Antropologia nacional: Romantismo e folclore; estetiza????o da cultura tradicional; leitura caracterol??gica da identidade nacional; Jorge Dias; Mendes Correia.
III ??? Artes portuguesas: a busca de uma arte portuguesa; manuelino e neomanuelino; ??casa portuguesa??; classicismo monumental totalit??rio; ??escola portuguesa de pintura??; pintura de costumes; fotografia pictorialista; m??sicas nacionais; a luta contra o internacionalismo.',
                  'M??todos de Ensino
- An??lise de "casos de estudo"
- M??todo expositivo
- Investiga????o bibliogr??fica', 'LEAL, Jo??o - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publica????es Dom Quixote, 2000. MATTOSO, Jos?? - A Identidade Nacional. Lisboa, Gradiva, 1998. MELO, Daniel ??? Salazarismo e Cultura Popular (1933-1958). Lisboa, Imprensa de Ci??ncias Sociais, 2001. RAMOS, Rui - A Segunda Funda????o (1890-1926). Lisboa, C??rculo de Leitores, 1994. Volume 6 da ??Hist??ria??', 'Bibliografia recomendada
I ??? A descoberta de Portugal na transi????o para o s??culo XX
BRITO, S??rgio Palma ??? Notas Sobre a Evolu????o do Viajar e a Forma????o do Turismo. Lisboa, Medialivros, 2003. Dois volumes.
HENRIQUES, Eduardo Brito ??? A Lisboa Tur??stica. Entre o imagin??rio e a cidade. A constru????o de um lugar tur??stico urbano. Lisboa, Edi????es Colibri, 1996.
NORDMAN, Daniel ??? ??Les Guides-Joanne. Anc??tres des Guides Bleus??, in: Pierre Nora (dir.), Les Lieux de M??moire. II ??? La Nation, tomo I. Paris, Gallimard, 1986, pp. 529-567.
RAMOS, Rui - A Segunda Funda????o (1890-1926). Lisboa, C??rculo de Leitores, 1994. Volume 6 da ??Hist??ria de Portugal??, dirigida por Jos?? Mattoso.
ROSMANINHO, Nuno ??? ??Coimbra e o imagin??rio??, Actas do semin??rio internacional ??Mem??rias da Cidade. Espa??o, cultura e sociedade??, realizado em Coimbra, no Teatro da Cerca de S??o Bernardo (P??tio da Inquisi????o), em 11 e 12 de Dezembro de 2007. No prelo.
ROSMANINHO, Nuno ??? Relat??rio da disciplina de Patrim??nio e Identidade. Universidade de Aveiro, 2009, pp.35-66.
THIESSE, Anne-Marie ??? A Cria????o das Identidades Nacionais. Lisboa, Temas e Debates, 2000.
VASCONCELOS, J. Leite de ??? De Terra em Terra. Excurs??es arqueol??gico-etnogr??ficas atrav??s de Portugal (Norte, Centro e Sul). Lisboa, Imprensa Nacional de Lisboa, 1927. Dois volumes.
VICENTE, Filipa Lowndes ??? Viagens e Exposi????es. D. Pedro V na Europa do s??culo XIX. Lisboa, G??tica, 2003.
II ??? Antropologia nacional
DIAS, Jorge - Os Elementos Fundamentais da Cultura Portuguesa. Lisboa, Imprensa Nacional - Casa da Moeda, 1985. Publicado tamb??m no volume I dos Estudos de Antropologia, pp. 135-157.
FABRE, Daniel (dir.) ??? L???Europe Entre Cultures et Nations. Paris, ??ditions dela Maison des Sciences de l???Homme, 1996.
HOBSBAWM, Eric; RANGER, Terence (orgs.) ??? A Inven????o das Tradi????es. 4.?? ed. Rio de Janeiro, Paz e Terra, 2006.
LEAL, Jo??o ??? Antropologia em Portugal. Mestres, percursos, transi????es. Lisboa, Livros Horizonte, 2006.
LEAL, Jo??o - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publica????es Dom Quixote, 2000.
MELO, Daniel ??? Salazarismo e Cultura Popular (1933-1958). Lisboa, Imprensa de Ci??ncias Sociais, 2001.
ROSMANINHO, Nuno ??? Relat??rio da disciplina de Patrim??nio e Identidade. Universidade de Aveiro, 2009, pp. 67-108.
III ??? Artes portuguesas
ANDRIEUX, Jean-Yves; CHEVALLIER, Fabienne; NEVANLINNA, Anja Kervanto (dir.) ??? Id??e Nationale et Architecture en Europe (1860-1919). Finlande, Hongrie, Roumanie, Catalogne.Rennes, Presses Universitaires de Rennes, 2006.
CASCUDO, Teresa ??? ??A d??cada da inven????o de Portugal na m??sica erudita (1890-1899)??, Revista Portuguesa de Musicologia, Lisboa, n.?? 10, 2000, pp. 181-226.
L???ART Russe dans la Seconde Moiti?? du XIXe Si??cle: en qu??te d???identit??, Paris, 2005, pp. 162-173.
LEAL, Jo??o - Etnografias Portuguesas (1870-1970). Cultura popular e identidade nacional. Lisboa, Publica????es Dom Quixote, 2000.
LOYER, Fran??oise; TOULIER, Bernard (dir.) ???Le R??gionalisme, Architecture et Identit??. Paris, Monum ??? ??ditions du Patrimoine, 2001.
POPESCU, Carmen ??? Le Style National Roumain. Cnstruire une nation ?? travers l???architecture (1881-1945). Rennes, Presses Universitaires de Rennes, 2004.
ROSMANINHO, Nuno ??? ??A ???casa portuguesa??? e outras ???casas nacionais?????, Revista da Universidade de Aveiro. Letras, Aveiro, n.os 19-20, 2002-2003, pp. 225-250.
ROSMANINHO, Nuno ??? ??Ant??nio Ferro e a propaganda nacional antimoderna??, in: Lu??s Reis Torgal e Helo??sa Paulo (coord.), Estados Autorit??rios e Totalit??rios e Suas Representa????es. Coimbra, Imprensa da Universidade de Coimbra, 2008, pp. 289-299.
ROSMANINHO, Nuno ??? ??As m??ltiplas facetas da arte nacional??, in: Ant??nio Pedro Pita e Lu??s Trindade (coord.), Transforma????es Estruturais do Campo Cultural Portugu??s (1900-1950), Coimbra, Ariadne Editora e CEIS20, 2005, pp. 373-400.
ROSMANINHO, Nuno ??? ??O desamparo de Fernando Lopes-Gra??a. A m??sica no contexto das artes nacionais??, Revista da Universidade de Aveiro ??? Letras, Aveiro, n.?? 23, 2006, pp. 51-58.
ROSMANINHO, Nuno ??? O Poder da Arte. O Estado Novo e a Cidade Universit??ria de Coimbra. Coimbra, Imprensa da Universidade, 2006.
ROSMANINHO, Nuno ??? Relat??rio da disciplina de Patrim??nio e Identidade. Universidade de Aveiro, 2009, pp. 168-246.',
                  'Portugu??s', 'Nenhum', 'Nos termos do Regulamento de Estudos da Universidade de Aveiro (n.?? 214 /2012), a avalia????o ?? discreta e constitu??da por dois testes a realizar durante o per??odo lectivo.', 'Os alunos devem cumprir os objectivos.', 5, 1, 1, 34, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:2H/semana; PL:2H/semana', 'Pretende-se dotar os alunos da capacidade para resolver problemas de pequena e m??dia dimens??o recorrendo a uma linguagem de programa????o multi-paradigma (Python)',
                                '- Valores e tipos de dados.
- Vari??veis, operadores e express??es
- Fun????es, par??metros e vari??veis locais
- Instru????es de decis??o
- Instru????es de repeti????o
- Recursividade
- Sequ??ncias: strings, listas, tuplos
- Conjuntos e dicion??rios
- Ficheiros
- Defini????es por compreens??o e geradores
- Operadores funcionais: map, filter, reduce
- Utiliza????o de m??dulos (numpy, matplotlib)
- Pesquisa e ordena????o', 'Nas aulas te??rico-pr??ticas s??o apresentados conte??dos te??ricos e s??o ilustrados com exemplos e exerc??cios discutidos com os alunos.  Por vezes recorre-se a pequenos question??rios interativos para envolver os alunos na aprendizagem.
As aulas pr??ticas s??o baseadas no desenvolvimento de pequenos programas pelos alunos, com o apoio do professor, que tamb??m poder?? discutir alternativas de resolu????o.  Os problemas propostos procuram mostrar a utilidade e necessidade de aplica????o dos t??picos apresentados nas aulas TP.
Fora das aulas, o aluno deve ainda ler a bibliografia recomendada em cada aula TP e resolver exerc??cios pr??ticos que n??o tenha resolvido durante a aula pr??tica.',
                                'Jeffrey Elkner, Allen B. Downey, and Chris Meyers. How to Think Like a Computer Scientist: Interactive Edition. (Livro interativo online)
Allen Downey. Think Python 2e. (Available online and in print)', null, 'Portugu??s', 'Nenhum', '1 momento de avalia????o (P) a meio do semestre (API)
1 momento de avalia????o (TP) no fim do semestre (ATP)
Exame final pr??tico com cobrindo toda a mat??ria (EP)
Nota Final = 30% * API + 30% * ATP + 40% * EP', '- Compreender o que ?? um computador, como funciona, para que serve, que limita????es tem e como se comunica com ele.
- Ser capaz de resolver problemas utilizando mecanismos correntes na programa????o funcional e procedimental.
- Conhecer e saber utilizar as estruturas de dados dispon??veis nas linguagens de programa????o modernas.
- Ser capaz de implementar e utilizar algoritmos b??sicos de pesquisa e ordena????o.
- Ser capaz de desenvolver, testar e corrigir programas de pequena/m??dia dimens??o numa linguagem de programa????o moderna (Python).', 5, 1, 2, 35, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:4H/semana', 'OT:1H/semana', 'Aquisi????o de conhecimentos b??sicos em ??lgebra Linear e em Geometria Anal??tica.',
                                'Matrizes e sistemas de equa????es lineares: opera????es com matrizes e propriedades; m??todo de elimina????o de Gauss e de Gauss-Jordan; inversa de uma matriz.
Determinantes: propriedades; Teorema de Laplace; inversa de uma matriz ?? custa da adjunta; Regra de Cramer.
Espa??os vetoriais: subespa??os vetoriais; espa??o gerado; independ??ncia linear, bases, dimens??o; coordenadas e mudan??a de base.
Espa??os com produto interno: produto escalar, norma, ??ngulo entre vetores; desigualdade de Cauchy???Schwarz. Produto vetorial em IR3. Bases ortonormais e proje????o ortogonal em IRn.
Retas e planos: posi????o relativa, dist??ncias e ??ngulos.
Valores pr??prios e vetores pr??prios: diagonaliza????o; diagonaliza????o ortogonal de matrizes sim??tricas.
C??nicas e qu??dricas: equa????o geral; equa????es reduzidas; classifica????o de c??nicas e qu??dricas.
Transforma????es lineares: matriz de uma aplica????o linear; n??cleo e imagem; isomorfismos.', 'As aulas TP destinam-se ?? exposi????o dos conte??dos program??ticos, ?? explana????o de exemplos chave e ?? resolu????o de alguns exerc??cios. Nas aulas OT privilegia-se o esclarecimento de d??vidas, complementando-se com a resolu????o de
problemas adicionais, para consolida????o dos conhecimentos anteriormente adquiridos.
Os estudantes podem tamb??m esclarecer as suas d??vidas junto do seu professor em hor??rio de atendimento disponibilizado para o efeito.
A modalidade de avalia????o definida nesta unidade curricular ?? a designada por avalia????o discreta, com alguns momentos de avalia????o durante a parte letiva do semestre e um ??ltimo momento de avalia????o durante a ??poca de exames. Se preferir, o estudante, pode realizar uma s?? prova escrita de avalia????o final na ??poca de exames.',
                                'Bernard Kolman e David R. Hill, ??lgebra Linear com Aplica????es, Editora LTC, Rio de Janeiro, 2013 (9.?? edi????o). ISBN: 978-85-216-2208-6;',
                                'Bibliografia recomendada
    Bernard Kolman, David R. Hill, ??lgebra Linear com Aplica????es, Ed. LTC. ISBN:9788521622086
    Bernard Kolman, David R. Hill, Elementary Linear Algebra with Applications, Pearson Education. ISBN: 9780132296540
    David C. Lay, Stephen R. Lay and Judy J. McDonald, Linear Algebra and Its Applications, Pearson Education. ISBN: 9780321982384
    David C. Lay, ??lgebra Linear e suas Aplica????es, Ed. LTC. ISBN: 9788521622093
    Gilbert Strang, Introduction to Linear Algebra, Wellesley-Cambridge Press. ISBN:9780980232776
    W. Keith Nicholson, Linear Algebra with Applications, McGraw Hill. ISBN: 9780070985100
    W. Keith Nicholson, ??lgebra Linear, McGraw Hill. ISBN: 9788586804922
    Isabel Cabral, Carlos Saiago, Cec??lia Perdig??o, ??lgebra Linear: Teoria, Exerc??cios Resolvidos e Exerc??cios Propostos com Solu????es, Escolar Editora. ISBN: 9789725925386
    Ana P. Santana, Jo??o F. Queir??, Introdu????o ?? ??lgebra Linear, Gradiva. ISBN: 9789896163723
    Jo??o Nuno Tavares, ??lgebra Linear (http://arquivo.escolar.org/handle/arquivo-e/32)', 'Portugu??s', 'Conhecimentos b??sicos de Matem??tica a n??vel do ensino secund??rio.',
                                'O estudante pode optar entre a "Avalia????o discreta" e a "Avalia????o por exame final".
Avalia????o discreta: consta de 2 testes com as seguintes pesos na avalia????o final:
    50.00%  (primeiro teste)
    50.00% (segundo teste )
Avalia????o por exame final: um s?? exame que avalia a mat??ria toda e com peso de 100% na classifica????o final.', 'Nesta unidade curricular, lecionam-se alguns t??picos de ??lgebra linear e de geometria anal??tica que fornecem o quadro te??rico conceptual e os instrumentos de c??lculo necess??rios ?? compreens??o e ao desenvolvimento de variadas e importantes aplica????es da matem??tica a outras ci??ncias e engenharias. Entre as compet??ncias fundamentais a desenvolver pelos estudantes, destacam-se a capacidade de c??lculo formal alg??brico, a formula????o e resolu????o expl??cita de problemas alg??bricos, incluindo quest??es de geometria anal??tica; a capacidade de utilizar t??cnicas vetoriais e matriciais em diversas aplica????es; a resolu????o de problemas, recorrendo a subespa??os vetoriais, subespa??os pr??prios e transforma????es lineares; a identifica????o e manipula????o alg??brica de c??nicas e qu??dricas.',
                                5, 1, 3, 36, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (1, 'Semestral', 'T:2H/semana; PL:1H/semana', 'O objetivo geral da disciplina consiste em criar nos alunos uma perspetiva global da estrutura e fun????o da c??lula, principais metodologias experimentais para o seu estudo e integra????o em organismos pluricelulares.
Para tal, ao frequentarem a disciplina, os alunos dever??o atingir os seguintes objetivos espec??ficos:
    descrever a estrutura e fun????o dos diferentes componentes celulares
    identificar os organelos e estruturas celulares em microscopia (??ptica e electr??nica)
    compreender a  express??o e transmiss??o da informa????o gen??tica
    descrever a divis??o, comunica????o e morte celular.
    Relacionar a constitui????o celular com a sua integra????o em tecidos', 'Componente Te??rica ou Te??rico-Pr??tica
1. M??todos e t??cnicas em biologia celular
a. Microscopia ??ptica, de fluoresc??ncia, confocal, electrofisiologia e
actividade celular.
b. Microscopia electr??nica de varrimento e de transmiss??o.
c. Cultura de c??lulas e fraccionamento celular.
2. Organiza????o estrutural e funcional da c??lula.
a. Composi????o e estrutura da membrana celular.
b. Transporte transmembranar.
c. Propriedades el??ctricas das membranas, i??es e excitabilidade das
membranas. Parede celular (composi????o e fun????es).
d. Ret??culo endoplasm??tico, aparelho de Golgi e lisossomas. Secre????o e
digest??o celular. Produtos de reserva e outras inclus??es.
e. Especializa????es de membrana. Comunica????o celular.
f. O citosqueleto e a motilidade celular. Ades??o e migra????o celular.
Matriz extracelular.
g. Conserva????o de energia: Mitoc??ndrias e cloroplastos.
h. N??cleo, seus constituintes e fun????es.
3. Ciclo celular e diferencia????o
a. Fases, regula????o e controlo.
b. Mecanismos de divis??o celular. Gametog??nese e hematopoiese.
c. Morte celular.
4. C??lulas com fun????es especializadas.
a. C??lulas germinativas e fertiliza????o.
b. C??lula nervosa e suas fun????es.
c. O eritr??cito e suas fun????es.
d. C??lulas vegetais especializadas.
e. C??lula estaminal e neopl??sica.
Componente Pr??tica:
1. M??todos e t??cnicas em biologia celular.
2. Diagn??stico de estruturas celulares em imagens de microscopia ??ptica,
electr??nica (transmiss??o e varrimento) e de fluoresc??ncia.
3. Diversidade celular e organitos celulares ex: vac??olos (inclus??es minerais,
pigmentos e metabolitos secund??rios); plastos (cromoplastos, cloroplastos e
leucoplastos).
4. M??todos de dete????o de subst??ncias de reserva em c??lulas vegetais e
animais.
5. Prepara????o de cariogramas em peixes.
6. Gametog??nese. Divis??o celular em c??lulas som??ticas e sexuais.
7. Observa????o de c??lulas especializadas. Ex: T??cnicas para o estudo morfofuncional
do espermatoz??ide (morfologia, densidade, vitalidade e
acrosoma); observa????o de neur??nios e os tr??s tipos de fibras musculares,
propriedades espec??ficas do eritr??cito, propriedades espec??ficas da c??lula
vegetal.', 'A disciplina ?? lecionada recorrendo a m??todos expositivos e demonstrativos. Inclui uma componente pr??tica em que os estudantes s??o distribu??dos em classes de 10 alunos no m??ximo, onde s??o desenvolvidos trabalhos experimentais sobre os assuntos lecionados. A UC inclui dois momentos de avalia????o (avalia????o discreta) de natureza te??rico-pr??tica.',
'Biologia Celular e Molecular. Azevedo C., 2005. Essential Cell Biology. Alberts B, Bray D, Hopkin K, Johnson K, Lewis J, Raff M, Roberts K, Walter P., 2003. ', 'Bibliografia recomendada
1. Alberts B., Brey D.; Hopkin K.; Johnson A.; Lewis J; Raff M., Roberts K. and Walter P. 2010. Essential Cell Biology. Third edition. Garland Science, New York. 731 pp.
2. Azevedo, C.; Sunkel, C.E. 2012. Biologia Celular e Molecular.5?? Edi????o. Lidel, Lisboa.629 pp.', 'Portugu??s', 'Pressup??e-se que os alunos conhe??am os conceitos fundamentais de citologia, histologia, embriologia e bioqu??mica.',
'1. Componentes de Avalia????o
A avalia????o da disciplina compreende a m??dia de dois testes de natureza
te??rico-pr??tica, um dos quais a efectuar a meio do semestre e o outro decorrer?? durante o per??odo de exames definido pelo Calend??rio Escolar da UA. Os alunos poder??o ainda optar por efectuar apenas o exame final.
2. A frequ??ncia das aulas dos alunos em regime normal rege-se pelo regulamento em vigor na UA.
3. Aprova????o na disciplina
O aluno ser?? aprovado caso atinja o m??nimo de 9,5 valores.
4. Exame de Recurso - rege-se pelo regulamento em vigor na UA.', '??? Compreender e aplicar conceitos b??sicos de biologia celular
??? Capacidade de correlacionar os fen??menos a n??vel celular necess??rios ?? compreens??o dos mecanismos moleculares subjacentes.
??? Capacidade de pesquisar informa????o cient??fica com recurso ??s novas tecnologias da comunica????o e de informa????o.
??? Capacidade para integrar os conhecimentos adquiridos com os de outras disciplinas.', 5, 1, 4, 37, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T:1H/semana;TP:1H/semana;PL:2H/semana', 'OT:1H/semana', 'Com esta unidade curricular (UC) pretende-se iniciar os alunos na Engenharia dos Materiais.',
                                'I- Conceitos b??sicos sobre o fabrico de materiais e suas implica????es sociais, ambientais e energ??ticas
    Contributo da engenharia de materiais para o desenvolvimento econ??mico
    Classifica????o dos materiais segundo a natureza das liga????es qu??micas e segundo a sua fun????o
    Tipos de pol??meros e seu processamento
    Obten????o de materiais met??licos e seu processamento
    Materiais cer??micos e seu processamento
    Materiais e sustentabilidade
II - Conceitos b??sicos sobre materiais
    Comportamento mec??nico dos materiais: ensaio de tra????o uniaxial. Defini????o de tens??o e deforma????o. A lei de Hooke e o regime el??stico. Tens??o de ced??ncia e o regime pl??stico
    Materiais cristalinos, amorfos e com grau de organiza????o at??mica interm??dio. Propriedades isotr??picas e anisotr??picas
    Materiais monocristalinos e policristalinos
    Materiais monof??sicos e polif??sicos
    Diagramas de fases un??rios e bin??rios e sua interpreta????o', 'Aulas te??ricas expositivas. Aulas te??rico-pr??ticas para resolu????o de exerc??cios. Nas aulas pr??ticas do m??dulo I, s??o realizadas visitas a unidades de processamento de materiais cer??micos, met??licos e polim??ricos e trabalhos de grupo onde ser??o explorados temas sobre o fabrico de objetos. Nas aulas pr??ticas do m??dulo II, s??o realizados trabalhos laboratoriais e a resolu????o de exerc??cios.',
    '- W.D. Callister, Fundamentos da ci??ncia e engenharia de materiais, LTC, 4.?? Ed., 2014
- W.F. Smith e J. Hashemi, Fundamentos de engenharia e ci??ncia dos materiais, McGraw-Hill, 5?? ed., 2012
- J. L. Baptista & R. F. Silva, Diagramas de Fases, 2?? ed., Univ. Aveiro, Aveiro, 1998', null, 'Portugu??s', 'Nenhum', 'M??dulo I:
    Relat??rios ??? elemento de avalia????o 1;
    teste final ??? elemento de avalia????o 2.
Classifica????o da parte 1 = 0,3 x (elemento de avalia????o 1) + 0,7 x (elem. de avalia????o 2)
 M??dulo II:
    Relat??rios ??? elemento de avalia????o 3;
    teste final ??? elemento de avalia????o 4.
Classifica????o da parte 2 = 0,3 x (elemento de avalia????o 3) + 0,7 x (elem. de avalia????o 4)
 Classifica????o final = 0,4 x (classifica????o da parte 1) + 0,6 x (classifica????o da parte 2)', 'No fim da unidade curricular, o aluno dever?? ser capaz de:
- descrever os principais m??todos de fabrico dos materiais;
- distinguir as diversas classes dos materiais com base no tipo de liga????es qu??micas;
- interpretar a curva de tra????o uniaxial, identificando o regime el??stico e o regime pl??stico e determinar o m??dulo de elasticidade, a tens??o de ced??ncia e a tens??o de rotura;
- interpretar diagramas un??rios e bin??rios.', 5, 1, 5, 38, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:4H/semana', 'A Unidade Curricular de Contabilidade Geral tem como objetivo fundamental dotar os estudantes dos conhecimentos que lhes permitam reconhecer a Contabilidade enquanto sistema de informa????o, instrumento para a tomada de decis??es a n??vel interno e externo. Dentro desta perspetiva sist??mica, analisar-se-?? o seu objeto nos planos cient??fico-t??cnico.
Do ponto de vista estritamente cient??fico-t??cnico procurar-se-?? dotar os estudantes de um adequado suporte te??rico e te??rico-pr??tico. Pretende-se que os estudantes desenvolvam as suas compet??ncias ao n??vel da prepara????o das demonstra????es financeiras, especialmente do balan??o e das demonstra????es dos resultados, e descrevam o processo de registo contabil??stico das principais opera????es da atividade empresarial.'
, ' 1. Conceitos de contabilidade e normaliza????o contabil??stica
    2. Demonstra????es Financeiras:
           2.1. Balan??o
           2.2. Demonstra????o dos resultados
           2.3. Demonstra????o dos fluxos de caixa
      3. O processo de registo
      4. O ciclo contabil??stico e as opera????es de fim de per??odo', '- Duas sess??es te??rico-pr??ticas semanais, de duas horas cada; e uma hora tutorial semanal.
- Exposi????o te??rica dos conte??dos e respectiva ilustra????o com recurso a exemplos de aplica????o.
- Resolu????o de casos pr??ticos.', 'Borges, Ant??nio, Rodrigues, Azevedo, e Rodrigues, Rog??rio (2021) Elementos de Contabilidade Geral, ??reas Editora, 27.?? Edi????o, Lisboa. Nabais, Carlos e Nabais, Francisco (2021) Pr??tica Contabil??stica, Lidel, 7.?? Edi????o atualizada, Lisboa. Rodrigues, Jo??o (2021) Sistema de Normaliza????o Contabil??stica Explicado ??? SNC Explicado, Porto Editora, 8.?? Edi????o atualizada, Porto.', 'Bibliografia recomendada
Borges, Ant??nio, Rodrigues, Azevedo, e Rodrigues, Rog??rio (2021) Elementos de Contabilidade Geral, ??reas Editora, 27.?? Edi????o, Lisboa.
Nabais, Carlos e Nabais, Francisco (2021) Pr??tica Contabil??stica, Lidel, 7.?? Edi????o atualizada, Lisboa.
Rodrigues, Jo??o (2021) Sistema de Normaliza????o Contabil??stica Explicado ??? SNC Explicado, Porto Editora, 8.?? Edi????o atualizada, Porto.',
'Portugu??s', 'Nenhum', 'Avalia????o discreta ou exame final, utilizando o Moodle e o Safe Exam Browser (SEB).', '- Conhecer o enquadramento e as obriga????es contabil??sticas aplic??veis ??s empresas portuguesas, em termos de contas individuais e coletivas e os princ??pios ??ticos subjacentes;
- Explicar o objetivo da Contabilidade e a sua evolu????o;
- Reconhecer os elementos e a utilidade de cada demonstra????o financeira;
- Preparar e interpretar o Balan??o, a Demonstra????o dos Resultados e a Demonstra????o dos Fluxos de Caixa;
- Registar contabilisticamente as principais opera????es correntes de uma entidade;
- Conhecer o que envolve a presta????o de contas de uma entidade;
- Relacionar uma variedade de conceitos associados ?? presta????o de contas e ?? interpreta????o da informa????o financeira;
- Apontar solu????es contabil??sticas para casos reais com base no normativo aplic??vel;
- Perceber o impacto das solu????es contabil??sticas ao n??vel das demonstra????es financeiras.', 5, 1, 6, 39, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:6H/semana', 'Obten????o da forma????o matem??tica fundamental em c??lculo diferencial e integral unidimensional.',
'1. Reta real e sucess??es
Axiom??tica dos reais, supremos e ??nfimos, sucess??es. Indu????o matem??tica.
2. S??ries num??ricas
Defini????o e exemplos (incluindo s??ries geom??tricas). Crit??rios de compara????o, do limite, da raz??o, da raiz e de Leibniz.
3. Fun????es reais de vari??vel real
Limites e Continuidade. Teoremas do valor interm??dio e de Weierstrass. Diferenciabilidade. Regras da cadeia e da inversa. Teoremas de Fermat, Rolle, Lagrange e Cauchy. Regra de Cauchy. F??rmula de Taylor. Extremos.
4. Primitiva????o
Primitivas imediatas, por partes, por mudan??a de vari??vel, por decomposi????o de fun????es racionais.
5. Integra????o
Parti????es, somas de Riemann, propriedades b??sicas do integral. Integral indefinido, teorema fundamental. Integra????o por partes, por mudan??a de vari??vel. Integrais impr??prios. Aplica????es geom??tricas do integral.',
'Esta unidade curricular tem 8 cr??ditos ECTS e uma escolaridade semanal de 6 horas de aulas te??rico-pr??ticas (TP)  e 1 hora de orienta????o tutorial (OT).
Nas aulas TP s??o ministrados os conte??dos do programa fixado para esta unidade curricular integrando a explora????o te??rica dos conceitos e os resultados te??ricos com a apresenta????o de exemplos pr??ticos e te??rico-pr??ticos significativos e de exerc??cios para serem resolvidos pelos estudantes.
A OT destina-se, fundamentalmente, ao acompanhamento da evolu????o do estudante, ao esclarecimento de d??vidas e ?? discuss??o dos exerc??cios que, em cada aula TP, possam ter sido deixados para resolu????o fora da sala de aula.',
'C??lculo com fun????es de uma vari??vel, vol. 1 e vol. 2 (apenas Cap. 3), Virg??nia Santos. Universidade de Aveiro, 2009/10 (correspondentes pdfs podem ser obtidos no espa??o de An??lise Matem??tica I em http://elearning.ua.pt/).
    C??lculo numa vari??vel real, J. Paulo Santos. IST press, 2013.
    An??lise Matem??tica I, Lu??s Castro. Universidade de Aveiro, 2010 (correspondente pdf pode ser obtido no espa??o de An??lise Matem??tica I em http://elearning.ua.pt/).
    Numbers and Functions: Steps to Analysis, R. P. Burn. Cambridge University Press, 2000.
    Introdu????o ?? An??lise Matem??tica (sexta edic??o), J. Campos Ferreira. Lisboa: Funda????o Calouste Gulbenkian, 1995.
    Curso de An??lise Matem??tica, J. J. M. Sousa Pinto. Universidade de Aveiro, 2010.
    An??lise Matem??tica: unidades te??rico-pr??ticas, Dalila Almeida et. al.. Universidade de Aveiro, 2010.', null, 'Portugu??s', 'Matem??tica do Ensino Secund??rio', 'Avalia????o discreta:
    50.00% TP Teste 1
    50.00% TP Teste 2
Avalia????o Final:
    100.00% TP Exame final', 'Capacidade de an??lise qualitativa de fun????es reais de vari??vel real, de an??lise da natureza das s??ries num??ricas quanto ?? sua converg??ncia, de primitiva????o e integra????o segundo Riemann (incluindo o seu uso justificado na resolu????o de problemas).', 5, 1, 7, 40, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 3H/semana', 'A disciplina visa proporcionar aos alunos conhecimentos uma abordagem gen??rica ao direito, que possa funcionar como um enquadramento ??s diversas disciplinas jur??dicas de conte??do mais especifico que ser??o leccionadas ao longo da licenciatura.',
                ' I ??? CONSIDERA????ES PR??VIAS.
1 ??? No????o de direito.
2- A ordem social e as institui????es;
3- A ordem jur??dica e a coac????o.
4- O direito e a Justi??a.
II- A ORDEM JUR??DICA E A NORMA.
1 ??? Estrutura da norma jur??dica.
2- Caracter??sticas da norma jur??dica.
3- Classifica????o das normas jur??dicas.
4- Direito subjectivo e direito objectivo.
    4.1. Direito potestativo e estado de sujei????o.
III ??? MEIOS DE TUTELA
1- A auto- tutela e hetero- tutela;
2- A tutela Judiciaria:
    2.1. A Independ??ncia do sistema judicial e dos tribunais
    2.2. Princ??pios de organiza????o judici??ria
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
    a. Ac????o directa.
    b. Leg??tima defesa.
    c. Estado de necessidade
    d. Direito de reten????o
    e. Excep????o de n??o cumprimento
IV ??? FONTES DE DIREITO E VIG??NCIA DAS NORMAS
1 ??? A lei.
2- O direito comunit??rio: o principio de primazia e o efeito direito das normas comunit??rias.
3- O costume
4- A doutrina e a jurisprud??ncia
5 ??? A hierarquia das normas.
6- Entrada em vigor da lei.
    6.1. Compet??ncia legislativa;
    6.2. Promulga????o;
    6.3. Publica????o;
    6.4. Vacatio legis.
7 ??? Cessa????o da vig??ncia da lei.
V ??? INTERPRETA????O E INTEGRA????O DA NORMA JURIDICA.
1- A interpreta????o da norma: identifica????o do problema.
     1.1 - Identifica????o das classes de Interpreta????o.
     1.2 ??? Classes de Interpreta????o.
        1.2.1. Interpreta????o subjectiva e objectiva.
     1.3 ??? Elementos de interpreta????o.
     1.4 ??? Resultados de interpreta????o.
2- A integra????o da norma jur??dica.
     2.1. A obriga????o de julgar.
     2.2. A distin????o entre interpreta????o e integra????o da norma jur??dica; import??ncia pr??tica da distin????o.
     2.3. A lacuna jur??dica.
     2.4. O recurso ?? analogia e a cria????o da norma ad-hoc.
VI ??? DA RELA????O JUR??DICA E DOS CONTRATOS
1- No????o de rela????o jur??dica.
2- Elementos da rela????o jur??dica.
     2.1. Sujeitos.
       2.1.1. Conceito de personalidade jur??dica.
       2.1.2. Capacidade
     2.2. Objecto
     2.3. Facto jur??dico
     2.4. Garantia.
3- O principio de liberdade contratual.', 'A informa????o ser?? ministrada sob a forma de enquadramento gen??rico, seguida de discuss??o sobre casos pr??ticos, permitindo aos alunos adquirirem flexibilidade de racioc??nio e espirito critico.',
'Justo, Santos A. ???Introdu????o ao Direito???, Almedina, ultima edi????o.Mendes, Castro, J. ???Introdu????o ao Direito???, Coimbra, ultima edi????o.', null, 'Portugu??s, Ingl??s', 'A disciplina n??o cont??m requisitos espec??ficos.', ' - Avalia????o continua, composta por tr??s momentos de avalia????o escrita realizadas nas aulas.',
'Pretende-se que os alunos adquiram um conjunto de conhecimentos e de metodologias que lhes permita integrar e analisar as diversas unidades curriculares juridicas que fazem parte do programa do curso.', 5, 1, 8, 41, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T: 2H/semana; TP: 1H/semana; PL: 1H/semana', 'OT:1H/semana', 'Esta disciplina de Mec??nica Cl??ssica ?? destinada aos alunos das Licenciaturas em F??sica, Engenharia F??sica, Engenharia Biom??dica, Engenharia Aeroespacial e Engenharia Computacional. A disciplina est?? dividida em aulas te??ricas, te??rico-pr??ticas e pr??ticas laboratoriais.
Nas aulas te??ricas a disciplina desenvolve o estudo da mec??nica newtoniana. Fornece ainda aos estudantes a pr??tica de t??cnicas matem??ticas fundamentais.
Nas aulas laboratoriais os alunos realizam um conjunto de actividades laboratoriais visando a compreens??o de fen??menos f??sicos, e aprendizagem das compet??ncias pr??ticas b??sicas como planear experi??ncias, analisar dados e apresentar os mesmos de forma escrita e oral.',
'Programa Te??rico (42h TP)
Cap. 1 ??? C??lculo vetorial
    Opera????es vetoriais e escalares elementares.
    Vetores unit??rios e ortogonalidade.
    Produto escalar.
    Produto vetorial (??reas e volumes).
    Derivadas de um vetor em ordem a um escalar
T??picos suplementares:
    Sistemas de coordenadas:
        Coordenadas cartesianas.
        Coordenadas polares.
        Coordenadas cil??ndricas.
        Coordenadas esf??ricas.
    Vetores de base.
Cap. 2 ??? Cinem??tica:
    Sistemas de refer??ncia
    Vetor posi????o e trajet??ria.
    Vetor velocidade e acelera????o.
    Movimento uniforme e uniformemente
    Coordenadas curvil??neas, acelera????o tangencial e
    Movimento
T??picos suplementares:
    Velocidade e acelera????o em coordenadas polares, cil??ndricas e esf??ricas.
Cap. 3 ??? Din??mica de uma part??cula:
    Leis de Newton
    For??as de liga????o (rea????o normal e tens??o).
    For??as de atrito (est??tico, cin??tico e viscoso).
    For??a el??stica (lei de Hooke).
    Press??o hidrost??tica e for??a de impuls??o.
    For??a grav??tica e campo grav??tico.
T??picos suplementares:
    Referenciais n??o inerciais:
    Sistema de coordenadas em rota????o
    For??a de Coriolis e for??a centr??fuga.
Cap. 4 ??? Trabalho e energia:
    Trabalho e energia cin??tica.
    For??as conservativas
    Energia potencial.
    Gradiente, diverg??ncia e rotacional.
    M??nimo de energia e equil??brio de uma part??cula.
Cap. 5 ??? Oscila????es:
    Oscilador harm??nico.
    P??ndulo simples.
    Oscila????es amortecidas
    Oscila????es for??adas.
    Resson??ncia.
    Oscila????es acopladas.
 Cap. 6 ??? Din??mica de um sistema de part??culas:
    Centro de massa
    Energia cin??tica.
    Momento linear.
    Colis??es el??sticas e inel??sticas.
    Movimento dum foguet??o.
    Momento angular.
    Momento da for??a.
    Teoremas de conserva????o.
Cap. 7 ??? Din??mica do corpo r??gido:
    Momento de in??rcia.
    Teorema de Steiner
    Eixos principais de in??rcia.
    Rota????o do corpo r??gido.
    Bin??rios de for??as.
    Equil??brio do corpo r??gido.
    Trabalho e energia.
T??picos suplementares:
    Tensor de in??rcia e eixos principais de in??rcia.
Cap??tulo suplementar:
Cap. 8 ??? For??as centrais:
    Massa reduzida.
    Equa????es de movimento.
    ??rbitas.
    As leis de Kepler.
    Sondas e assist??ncia grav??tica.
Programa  Laboratorial (6 aulas)
Trabalho n??1: Movimento de proj??cteis
Trabalho n??2: Viscosidade de um l??quido
Trabalho n??3: Conserva????o da energia mec??nica
Trabalho n??4: P??ndulos acoplados.', 'Os conceitos dos t??picos curriculares ser??o apresentados nas aulas Te??ricas. No sentido de desenvolver as compet??ncias te??ricas e as capacidades de resolu????o de problemas ser??o fornecidos conjuntos de problemas para cada t??pico do programa e resolvidos alguns problemas-tipo nas aulas Te??rico-pr??ticas.

As aulas pr??ticas laboratoriais s??o dedicadas a trabalho de laborat??rio com 4 trabalhos experimentais de mec??nica e subdividem-se em turmas tipicamente com 15 alunos, sendo os trabalhos experimentais realizados em grupo (3 alunos por grupo).

O laborat??rio est?? equipado com computadores de modo a promover a utiliza????o de ferramentas computacionais na aquisi????o, tratamento e an??lise dos dados experimentais. Os alunos podem igualmente levar o seu computador port??til e/ou m??quina de calcular gr??fica. Na componente laboratorial o desempenho do aluno ?? avaliado de forma cumulativa atrav??s de um teste individual sobre todos os quatro trabalhos pr??ticos, e de tr??s minirrelat??rios incidindo sobre  trabalhos diferentes.',
'-J. B. Marion e S. Thornton, Classical Dynamics of Particles and Systems, 4?? ed., Saunders College Publishing (1995). - R.A. Serway, Physics for Scientists and Engineers with Modern Physics, 2000, Saunders College Publishing.',
'Bibliografia recomendada
- Material did??ctico (resumos te??ricos, problemas, etc..) em elearning.ua.pt
- R.A. Serway, Physics for Scientists and Engineers with Modern Physics, 2000, Saunders College Publishing.
- J. B. Marion e S. Thornton, Classical Dynamics of Particles and Systems, 4?? ed., Saunders College Publishing (1995).
- Walter Greiner, Classical Mechanics, Point Particles and Relativity, Springer-Verlag, New York (2004).
- John R. Taylor, Classical Mechanics, University Science Books, California (2005).
- H. Goldstein, C. P. Poole e J. Safko, Classical Mechanics - Prentice Hall (2002).
- H. Goldstein, Classical Mechanics, Addison-Wesley Publishing (1980).
- W. Hauser, Introduction to the Principles of Mechanics, Addison-Wesley Publishing (1965).
- Murray R. Spiegel, Schaum''s Outline of Theoretical Mechanics.
- Feynman Lectures of Physics.
- Alonso - Finn, F??sica: um curso universit??rio, Vol. I -Mec??nica
- L. Landau e E. Lifshitz, Mec??nica, Editora MIR.
- Docentes da disciplina, Apontamentos de F??sica 1, Guia de Trabalhos pr??ticos, 2000/2001.
Outros:
- Jearl Walker, The Flying Circus of Physics, Wiley (2006).
- J. Dias de Deus e outros. Introdu????o ?? F??sica, 2000, Mc-Graw-Hill
- D. Halliday e R. Resnick, Fundamentos de F??sica, 1993, Livros T??cnicos e Cient??ficos Editora.', 'Portugu??s', 'N??o aplic??vel.', 'A avalia????o da disciplina ser?? feita segundo uma das duas modalidades descritas nas tabelas seguintes. A presen??a no 1?? teste implica a op????o pelo regime de avalia????o mista. A aprova????o ?? disciplina ?? concedida aos alunos que obtenham uma nota final superior ou igual a 10, de acordo com o Regulamento dos Estudos de Licenciatura (R.E.L.). Caso o aluno n??o obtenha aprova????o poder?? ainda realizar o Exame de Recurso, de acordo com o calend??rio escolar.
A - Avalia????o final
    Componente                                               Peso (%)
    Escrita [1]                                                     70
    Exame final, dura????o 2h30
    Pr??tica [3,4]                                                 30
    Teste Individual                  40
    1?? minirrelat??rio                 20
    2?? minirrelat??rio                 20
    3?? minirrelat??rio                 20
B - Avalia????o Discreta (*)
Componente                                               Peso (%)
Escrita [1]                                                     70
1?? teste, 15 de dezembro de 2021       35
Teste final, data do exame                  35
Pr??tica [3,4]                                                 30
Teste Individual                  40
1?? minirrelat??rio                 20
2?? minirrelat??rio                 20
3?? minirrelat??rio                 20
(*) m??todo de avalia????o por defeito', 'Pretende-se que os alunos adquiram as seguintes compet??ncias/conhecimentos:
    Conhecimento da mec??nica newtoniana e sua aplica????o a problemas f??sicos b??sicos como o oscilador harm??nico simples, o movimento planet??rio, o movimento circular, etc. Compreens??o das leis de conserva????o e suas aplica????es em mec??nica. Conhecimento da din??mica do corpo r??gido.
    Al??m da aquisi????o destes conhecimentos espec??ficos pretende-se que os estudantes desenvolvam as suas compet??ncias de resolu????o de problemas, requerendo a aplica????o de t??cnicas matem??ticas fundamentais e princ??pios b??sicos da F??sica. Espera-se que aprendam a produzir e apresentar uma solu????o bem estruturada, expondo com clareza o racioc??nio.
    Pretende-se que o aluno desenvolva a capacidade de trabalhar em laborat??rio, individualmente e em grupo, de planear uma experi??ncia, de descrever, analisar e criticar os dados experimentais, e retirar a informa????o relevante e interpret??-la ou extrapol??-la ?? luz das leis e princ??pios b??sicos da F??sica.
    Pretende-se tamb??m que o aluno desenvolva as suas compet??ncias de comunica????o escrita e oral de modo a elaborar relat??rios fluentes e bem estruturados.', 5, 1, 9, 42, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:3H/semana; PL:1H/semana', 'OT:1H/semana', 'A unidade curricular de Fundamentos de Qu??mica tem como objetivo providenciar aos estudantes dos primeiros ciclos em ci??ncias e em engenharias conhecimento fundamental e compet??ncias em qu??mica com aplica????o noutras ??reas. No final do curso, o estudante dever?? ser capaz de:
Reconhecer a import??ncia da qu??mica;
Descrever a liga????o qu??mica em mol??culas com diferentes geometrias utilizando um modelo de teoria apropriado;
Descrever e fazer c??lculos de equil??brio qu??mico;
Identificar ??cidos e bases, explicar e fazer c??lculos envolvendo pH;
Explicar matematicamente o comportamento de ??cidos e base fracas e de sais e a varia????o de pH numa titula????o;
Descrever o comportamento de solu????es tamp??o;
Explicar o comportamento de subst??ncias pouco sol??veis e fazer c??lculos envolvendo Ks;
Explicar os conceitos de entropia, energia livre de Gibbs, e relacion??-los com a espontaneidade das rea????es e com Ke e fazer c??lculos associados;
Descrever uma c??lula galv??nica o conceito de potencial padr??o de redu????o e da c??lula; calcular potenciais padr??o de rea????o e aplicar a Eq. de Nernst;
Aplicar os conceitos b??sicos da cin??tica das rea????es qu??micas.', 'Estrutura at??mica e propriedades peri??dicas dos elementos;
    Liga????o Qu??mica;
Liga????es covalentes e i??nicas;
Exce????es ?? regra do octeto;
Modelo RPECV;
Teoria do enlace de val??ncia;
Teoria das orbitais moleculares;
    Equil??brio qu??mico;
Constante de equil??brio;
Fatores que afetam o equil??brio;
    ??cidos e bases;
??cidos e bases de Br??nsted-Lowry;
Escala de pH;
??cidos e bases fracas;
    Equil??brios em meio aquoso;
Titula????es ??cido-base;
Solu????es tamp??o;
Produto de solubilidade;
Precipita????o seletiva;
    6. Termodin??mica;
Sistemas, fun????es de estado, e energia;
Entalpia das rea????es qu??micas;
Entropia;
Energia livre de Gibbs e equil??brio qu??mico;
    Eletroqu??mica;
Pilhas galvanicas;
Potenciais normais de redu????o;
Equa????o de Nernst;
Eletr??lise. Corros??o;
Cin??tica;
Lei de velocidade e ordem de rea????o;
Tempo de meia vida;
Equa????o de Arhenius.', 'O Programa de Fundamentos de Qu??mica encontra-se organizado de modo que os alunos do primeiro ano adquiram de forma estruturada os conte??dos e conhecimentos necess??rios, devidamente ilustrados com a resolu????o de exerc??cios tipo e exemplos de aplica????o.

Os conceitos s??o ainda ilustrados com a pratica laboratorial que permite em simult??neo dotar o alunos de compet??ncias em opera????es laboratoriais b??sicas.

Globalmente os objetivos da unidade curricular e os conte??dos program??ticos, est??o desenhados de forma a dotar os alunos do primeiro dos cursos de Ci??ncias e Engenharia da Universidade de Aveiro de uma forma????o s??lida e homog??nea, capacidade de an??lise e resolu????o de problemas concretos no que concerne aos princ??pios fundamentais da qu??mica, necess??rios para a prossecu????o dos seus estudos nas diferentes ??reas de forma????o.',
'Bibliografia base:
Chang, J. Overby ???Chemistry???, 13th edition, 2019 ISBN-13: 978-1259911156
R Chang, KA Goldsby, Qu??mica, Mc Graw Hill, 2012, 11?? Ed.
R Chang, Qu??mica, Mc Graw Hill, 1994, 5?? Ed.
Outras obras:
TL Brown et al., Chemistry, Pearson, 2010, 2?? Ed.
D Reger et al., Qu??mica: Princ??pios e Aplica????es, Funda????o Calouste Gulbenkian, 1997.
Sendo Fundamentos de Qu??mica uma UC curricular do 1?? ano, as metodologias de ensino adotadas implicam uma liga????o estreita entre os materiais de apoio e uma obra base.
Embora os docentes recomendem a utiliza????o de obras em Ingl??s desde o in??cio do ciclo de estudos constata-se que isto ainda representa um obst??culo para alguns alunos. A bibliografia base adotada, al??m de abordar adequadamente os conte??dos program??ticos definidos, permite fazer a liga????o estreita acima referida com as edi????es inglesa e portuguesa, permitindo ao alunos trabalhar com qualquer delas.',
null, 'Portugu??s', 'N.a.', 'A UC est?? organizada em tr??s per??odos semanais de contacto ( 2 x 1.5h TP +1hOT) e 2h PL a cada duas semanas.
As aulas s??o suportadas por material did??tico (MA), dispon??vel na plataforma de e-learning. Os MA est??o preparados em liga????o com a bibliografia base, para a qual o aluno ?? frequentemente remetido.
Nas TP, s??o abordados em detalhe os conceitos fundamentais de cada conte??do program??tico e ilustrados com a resolu????o/discuss??o detalhada de problemas tipo dispon??veis nos MA. Dos MA consta ainda quest??es propostas para estudo individual e posterior discuss??o na TP ou OT.
Na PL os alunos executam trabalhos que ilustram os conceitos abordados nas TP.
A UC funciona em ???Avalia????o Discreta???, com dois testes contando cada um 37.5% cada na nota final. A componente Laboratorial representa 25% da classifica????o final. Os alunos podem optar por Exame Final e t??m ainda acesso a uma ??poca de Recurso/Melhoria, mantendo-se nestes casos o peso de 25% para a componente laboratorial.',
'O programa de Fundamentos de Qu??mica engloba alguns dos t??picos presentes em livros de texto dedicados aos conceitos e leis fundamentais da qu??mica. A sele????o de t??picos foi determinada pelas necessidades de conhecimento em qu??mica dos alunos dos diversos cursos de Cie^ncias e Engenharia da Universidade de Aveiro. Os t??picos ser??o lecionados em maior ou menor detalhe, dependendo do n??vel de conhecimento adquirido pelos alunos nos 10.??, 11.?? e 12.?? anos do ensino secund??rio. Na abordagem das mat??rias ser?? dada particular ??nfase aos aspetos quantitativos, pelo que esta UC, com um programa extenso, requer como pr??-requisito forma????o em matem??tica b??sica. Os t??picos I e II, sobre estrutura e propriedades da mat??ria, est??o relacionados com os primeiros dois objetivos, enquanto que os t??picos de III a VIII, sobre qu??mica em solu????o, permitem alcan??ar os restantes objetivos de aprendizagem.
A unidade curricular permite ainda dotar os alunos de compet??ncias laboratoriais b??sicas, atrav??s da execu????o de trabalhos laboratoriais adequadamente articulados e ilustrativos dos conte??dos program??ticos abordados ao longo do semestre.', 5, 1, 10, 43, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 2H/semana; PL: 2H/semana', 'Conhecer os conceitos b??sicos de Cristalografia.
Conhecer a simetria.
Conhecer os sistemas cristalogr??ficos e as classes de simetria.
Conhecer o modo como os cristais se projectam em projec????o estereogr??fica.
Conhecer a sistem??tica mineral??gica.
Saber utilizar as principais t??cnicas de estudo dos minerais em microscopia de luz transmitida.', 'Te??rico-pr??ticas: Conceito de cristal. Simetria macrosc??pica: sistemas cristalogr??ficos; ??ndices de Miller; projec????o estereogr??fica. Simetria microsc??pica. Propriedades f??sicas dos minerais. Fundamentos de cristaloqu??mica. Classifica????o qu??mico-estrutural de minerais. Mineralogia sistem??tica: silicatos, elementos nativos, sulfuretos, carbonatos, fosfatos, sulfatos, ??xidos, halogenetos, outros.
Pr??ticas: T??cnicas de estudo de minerais por microscopia de luz transmitida.', 'Cristalografia: aulas te??rico-pr??ticas com apresenta????o da mat??ria, manuseamento de modelos cristalogr??ficos em madeira e pl??stico, para identifica????o da simetria, e exerc??cios sobre a projec????o estereogr??fica.
Mineralogia sistem??tica: aulas te??rico-pr??ticas sobre as bases da classifica????o dos minerais, a sua divis??o em diferentes categorias, a descri????o das classes e a apresenta????o das caracter??sticas das esp??cies minerais mais importantes.
Mineralogia ??ptica: aulas pr??ticas com utiliza????o individual de microsc??pio de luz transmitida para o estudo de l??minas delgadas.',
'Kerr, P.F (1977) - Optical Mineralogy. McGraw-Hill. 492 pp.
Klein, C. & Dutrow, B. (2008) - The Manual of Mineral Science (after J.D. Dana). John Wiley & Sons. 716 pp.
Kostov, I. (1968) ??? Mineralogy. Oliver & Boyd. 587 pp.
Nesse, W.D. (2011) - Introduction to Mineralogy. Oxford University Press. 496 pp.
Nesse, W.D. (2012) - Introduction to Optical Mineralogy. Oxford University Press. 384 pp.
Putnis, A. (1992) - An Introduction to Mineral Sciences. Cambridge University Press. 480 pp.', null, 'Portugu??s', 'Qu??mica; Geologia Geral', 'Dois testes te??rico-pr??ticos (60%) e um teste pr??tico (40%).', 'Conhecer os conceitos b??sicos de cristalografia; conhecer a simetria; conhecer os sistemas cristalogr??ficos e classes de simetria; conhecer o modo como os cristais se projectam em projec????o estereogr??fica. Conhecer a sistem??tica mineral??gica. Conhecer as propriedades ??pticas dos minerais e o modo de funcionamento do microsc??pio de luz transmitida.', 5, 1, 11, 44, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'T: 2H/semana; TP: 2H/semana', 'OT:1H/semana', '
    Sensibilizar os alunos para a compreens??o dos fen??menos psicol??gicos, com particular ??nfase nos aspetos biopsicossociais.
    Fornecer as compet??ncias e conhecimentos b??sicos relativos ??s principais ??reas tem??ticas da Psicologia.
    Dotar os alunos de compet??ncias necess??rias para complementar as demais unidades curriculares do 1?? ciclo de Psicologia.
    Estimular o desenvolvimento pessoal e a aquisi????o de compet??ncias relacionais.', 'Introdu????o:
- Defini????o e objeto de estudo da Psicologia;
- Temas atuais da Psicologia;
Fundamentos hist??ricos e epistemol??gicos da Psicologia:
- A hist??ria da Psicologia e o papel da Psicologia na Hist??ria;
- Epistemologia da Psicologia: Ci??ncia e Psicologia cient??fica;
- Temas, autores e escolas epistemol??gicas;
Linguagem e Pensamento:
- Comunica????o;
- Classificar e categorizar;
- Resolu????o de problemas;
- Tomada de decis??o;
Personalidade:
- Conceptualiza????o e avalia????o da personalidade;
- O desenvolvimento da personalidade;
- O debate pessoa-situa????o;
Stress e Sa??de:
- A experi??ncia de stress;
- Rea????o ao stress prolongado;
- Gest??o do stress;
- Estilos de vida saud??veis e promo????o da sa??de;
Psicopatologia:
- Conceito de psicopatologia;
- Classifica????o de perturba????es psicol??gicas;
- Modelos biol??gicos, cognitivos e ambientais da psicopatologia;
Psicoterapia:
- Terapias biom??dicas;
- Psicoterapia psicodin??mica;
- Psicoterapia comportamental;
- Psicoterapia cognitiva;', 'As aulas t??m um cariz te??rico-pr??tico. Pretende-se uma rela????o muito estreita da teoria com a pr??tica da investiga????o, atrav??s da exposi????o e discuss??o de casos pr??ticos, assim como a realiza????o de exerc??cios de aplica????o dos princ??pios te??ricos apresentados (e.g., replica????o de experi??ncias cl??ssicas relativas aos diferentes conte??dos tem??ticos abordados) e visionamento de v??deos. Os materiais de apoio ??s aulas ser??o disponibilizados atrav??s da plataforma de e-learning Moodle.',
'Eysenck, M. W., & Kaene, M. (2005) Cognitive Psychology: A Student???s Handbook. Hove: Psychology Press;
    Goodwin, C. J. (2009). Research Methods in Psychology: Methods and Design (6th ed). New York: Wiley;
    Gorman, P. (2004). Motivation and emotion. London: Routledge;
    Hergenhahn, B. R. (2009). An introduction to thehistory of psychology. Belmont, CA: Wadsworth;
    Nairne, J. (2013). Psychology (6th Ed). Belmont: Thomson / Wadsworth;
    Quinlan, P., & Dyson, B. (2008). Cognitivepsychology. Harlow: PearsonEducation;
    Reeve, J. (2005). Understanding motivation andemotion. Hoboken (NJ): John Wiley & Sons;
    Weiten, W. (2002). Introdu????o ?? psicologia : Temas evaria????es. S??o Paulo: Pioneira Thomson Learning;
Nota: Ser?? disponibilizada bibliografia adicional no final de cada aula, ao longo do semestre.', null, 'Portugu??s', 'N??o aplic??vel.', 'Em rela????o ?? avalia????o dos alunos, e conforme o Regulamento da UA, esta pode ser discreta ou final. A avalia????o discreta compreende: 1) Trabalho pr??tico que consiste na elabora????o de um relat??rio, a realizar em grupo (30%); 2) Apresenta????o e discuss??o de um artigo cient??fico relativo a uma das tem??ticas inclu??das no programa da Unidade Curricular (20%). 3) Realiza????o de uma prova escrita individual (50%). A avalia????o final consiste numa prova de avalia????o escrita sobre toda a mat??ria (T/P).',
'Compreender os fen??menos psicol??gicos, com particular ??nfase nos aspetos biopsicossociais;
Adquirir as compet??ncias e conhecimentos b??sicos relativos ??s principais ??reas tem??ticas da Psicologia;
Adquirir as compet??ncias necess??rias para complementar as demais unidades curriculares do 1?? ciclo de Psicologia;
Adquirir compet??ncias relacionais.', 5, 1, 12, 45, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'PL: 2H/semana', 'Espera-se com esta unidade curricular desenvolver a percep????o e o ouvido cr??tico do aluno relativamente ao objeto musical.
O ritmo, melodia e harmonia, em contextos de m??sica cl??ssica e pop s??o aptid??es que o estudante dever?? tamb??m aprofundar.', 'Os conte??dos dividem-se em quatro ??reas de saber fundamentais:
Ritmo:
             Estruturas r??micas simples;
             M??tricas bin??ria e tern??ria;
             S??ncopa e contratempo na Bossa-Nova;
Melodia:
             Modalismo;
             Os modos enquanto sistemas de ???org??nicos??? de alturas;
             Melodia em contexto tonal cl??ssico;
Harmonia:
             Harmonia cl??ssica: os acordes diat??nicos nos modos maior e menor;
             Acordes de 7?? da dominante e 7?? diminuta;
             Toniciza????o e modula????o;
             Audi????o t??mbrica;
             Cifra funcional.', 'As metodologias desenvolvem-se sobretudo com base em repert??rio espec??fico, ilustrativo de cada ??mbito enunciado nos conte??dos program??ticos. O trabalho ?? fundamentalmente ao n??vel emp??rico. Pressup??e a audi????o ativa em v??rios modelos. O processo implica ainda a tradu????o posterior para o dom??nio conceptual. Assim:
Ritmo:
Repert??rio fundamentalmente do Barroco e Cl??ssico; ainda, Pop e rock;
Melodia:
Repert??rio fundamentalmente da m??sica medieval e renascentista;
Pop e Rock;
Harmonia:
Repert??rio fundamentalmente Classicismo;
Pop/Rock.', 'A bibliografia consiste principalmente em repert??rio variado do Classicismo.', null, 'Portugu??s e Ingl??s', 'Admiss??o e inscri????o na Licenciatura em M??sica.', 'Avalia????o Final:
    50.00% P Tarefas pr??ticas;
    30.00% P Teste escrito;
    20.00% P Participa????o nas aulas.', 'A unidade curricular Forma????o Auditiva A tem como objetivo geral oferecer uma prepara????o especializada do ouvido, voltada para as necessidades espec??ficas da profiss??o musical, tanto no dom??nio da interpreta????o como no exerc??cio da doc??ncia, assim como contribuir para a sensibiliza????o diante de distintos estilos. Tamb??m, fornecer os elementos te??ricos e argumentos de racionaliza????o do discurso musical necess??rios para a eficiente compreens??o do fen??meno musical.', 5, 1, 13, 46, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, horas_contacto, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP: 1H/semana; PL: 3H/semana', 'OT:1H/semana', 'A UC tem dois objetivos gerais:
    Promover a inser????o dos estudantes da LEM no Departamento de Engenharia Mec??nica, fomentando o contacto com os v??rios docentes e dando a conhecer as principais ??reas de interven????o;
    Garantir que todos os estudantes consigam conhecer as ??reas de atividade da Engenharia Mec??nica, permitindo-lhes obter conhecimentos e sensibilidades base para promover um claro entendimento das mat??rias que receber??o a jusante no curso, percebendo a interliga????o e aplicabilidade das mesmas.
Em termos de objetivos de aprendizagem, pretende-se que os estudantes desenvolvam capacidades de:
    Abordar e decidir sobre estrat??gias de resolu????o de problemas de engenharia, em particular os de engenharia mec??nica, nomeadamente nas sub??reas gen??ricas que fazem parte do programa da disciplina;
    Raciocinar autonomamente sobre quest??es de engenharia, iniciando o desenvolvimento de esp??rito cr??tico integrado que se pretende numa forma????o em engenharia;
    Comunica????o e escrita cient??fica.
Adicionalmente, os objectivos secund??rios da disciplina de Introdu????o ?? Engenharia Mec??nica s??o desenvolver nos alunos a capacidade de abordar e decidir sobre estrat??gias de resolu????o de problemas de engenharia, em particular os de engenharia mec??nica. ?? ainda objectivo que os alunos tenham um primeiro contacto e ganhem sensibilidade ??s quest??es da ??tica e deontologia profissional e a t??cnicas gen??ricas de apresenta????o oral e escrita.',
'Sendo esta uma UC integradora de primeiro ano, os conte??dos podem resumir-se nos seguintes t??picos:
    A profiss??o do Engenheiro Mec??nico; algumas no????es de ??tica e deontologia profissional; o papel da Ordem dos Engenheiros; carreiras e aprendizagem para a vida;
    Resolu????o de problemas e t??cnicas de comunica????o; realizar um relat??rio escrito; preparar e fazer uma apresenta????o oral; t??cnicas de comunica????o;
    Esfor??os em estruturas e m??quinas;
    Introdu????o aos materiais e ao comportamento de materiais de engenharia; Tens??es e deforma????es;
    Movimento e transmiss??o de pot??ncia;
    Introdu????o ao projeto mec??nico;
    Conceitos b??sicos de mec??nica dos fluidos;
    Introdu????o ?? transmiss??o de calor e aos sistemas energ??ticos;
    Automa????o e sistemas flex??veis da produ????o;
    Rob??tica;
    Nano-materiais.', 'A UC desenvolve-se em aulas te??rico-pr??ticas de apresenta????o de mat??rias base, promovidas por diferentes docentes do departamento, em paralelo com atividades de aplica????o nas aulas pr??ticas. Nas aulas te??rico-pr??ticas ser??o discutidos os conte??dos te??ricos fundamentais, exemplificados com a resolu????o de exerc??cios pr??ticos de aplica????o da mat??ria. Nas aulas pr??ticas ser??o desenvolvidos pequenos trabalhos de grupo com apoio tutorial dos docentes envolvidos. Estes s??o de pequena dura????o (2-3 semanas) e focados em problemas simples, mas aplicados, de engenharia mec??nica. D??-se particular relevo a trabalhos de aplica????o industrial ou social que permitam sobretudo o contacto com nomenclaturas, pr??ticas e conceitos-chave por parte dos estudantes, num esfor??o de aprendizagem ativa e proporcionando uma vis??o geral sobre as ??reas de interven????o do curso, bem como a justifica????o do seu plano curricular.',
'"An Introduction to Mechanical Engineering", J. Wickert, Thomson Engineering, 2nd Ed (2005) ', 'Bibliografia recomendada
Bibliografia adoptada (obrigat??ria):
J. Wickert; An Introduction to Mechanical Engineering, Thomson Engineering, 2nd Ed., 2005.
Bibliografia adicional (facultativa):
[1] R. Rizza; Introduction to Mechanical Engineering; E-Source, Prentice Hall, 2001.
[2] B.M. Das, A. Kassimali, S. Sami; Engineering Mechanics - Statics; Irwin, 1994.
[3] F.P. Beer, E.R. Johnston; Mec??nica Vectorial para Engenheiros (vol. 2), 6a Ed.; McGraw-Hill, 2000.
[4] C. Moura Branco; Mec??nica dos Materiais; Funda????o Calouste Gulbenkian, 1985.
[5] V.L. Streeter, E.B. Wylie, K.W. Bedford; Fluid Mechanics; McGraw-Hill Book Company, 1998.
[6] Y. ??engel, M.A. Boles; Termodin??mica; McGraw-Hill, Lisboa, 1998.', 'Portugu??s', 'N??o s??o necess??rios conhecimentos de base para frequentar a disciplina de Introdu????o ?? Engenharia Mec??nica.', 'Avalia????o cont??nua:
    100.00% TP Avalia????o por m??dulos (testes+relat??rios);
Avalia????o Final:
    100.00% TP Exame final por m??dulos (testes+relat??rios).', 'Capacidade de abordar e decidir sobre estrat??gias de resolu????o de problemas de engenharia, em particular os de engenharia mec??nica, nas ??reas gen??ricas que fazem parte do programa da disciplina. Capacidade de raciocinar autonomamente sobre quest??es de engenharia. Desenvolver capacidade m??nima para apresentar e comunicar oralmente e por escrito.
Conhecimento das v??rias ??reas da Engenharia Mec??nica, despertando o interesse e curiosidade.', 5, 1, 14, 47, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'TP:1H/semana', 'A unidade curricular de Introdu????o ?? Engenharia Civil tem como objetivo fundamental que os estudantes conhe??am o ??mbito de aplica????o desta Engenharia.
Tem-se assim como objetivos:
- Identificar e analisar a import??ncia e impactos da Engenharia Civil, a n??vel social, econ??mico e ambiental;
- Resolver, em ambiente de equipa, um problema social concreto, atrav??s de solu????es de Engenharia Civil.', 'Hist??ria e evolu????o da Engenharia Civil;
O contributo da Engenharia Civil para os desafios cient??ficos e societais atuais, tendo por base os 17 Objetivos de Desenvolvimento Sustent??vel das Na????es Unidas para 2030', 'Esta unidade curricular centra-se na realiza????o de um trabalho baseado em situa????es pr??ximas do mundo real. Os projetos t??m uma componente de trabalho obrigat??ria em equipa que pode ser concretizada de duas formas:
a) Os alunos formam equipas com 2 a 3 elementos.
b) Os alunos podem trabalhar em colabora????o com outros alunos de anos mais avan??ados do DECivil.
Os trabalhos s??o propostos e orientados por docentes da LEC e do MEC. A evolu????o dos trabalhos tamb??m ?? discutida nas aulas com os docentes da unidade curricular e as equipas devem preparar um plano de atividades semanal por cada elemento do grupo. Cada meta est?? associada a uma apresenta????o oral para discuss??o dos resultados atingidos.
A metodologia a aplicar centra-se no desenvolvimento de problem based learning.', 'H.R. Shercliff (2011). Guide to Report Writing. Department of Engineering, University of Cambridge. http://to.eng.cam.ac.uk/teaching/teachoff/study_skills/ReportWritingGuide/downloads/ReportWritingGuide_1st_edition_2011_Exposition.pdf. Accessed June 28, 2019;
Ana Carla Madeira (2007). Comunicar em ci??ncia. Escolar Editora. ISBN 9789725921654;
University of Chicago (2010). The Chicago Manual of style (16th edition);
http://www.chicagomanualofstyle.org/16/contents.html. Accessed June 28, 2019;
Hist??ria Breve da Engenharia Civil Pilar da Civiliza????o Ocidental. Ordem dos Engenheiros;
Guerra, Franklin (2010). Hist??ria da Engenharia em Portugal ??? 2??Ed., F. G. Editor, Porto. BPG 62 (469)(091) - G;
Bibliografia aconselhada pelos Professores.', null, 'Portugu??s', 'N.a', 'Esta unidade curricular centra-se na realiza????o de um trabalho baseado em situa????es pr??ximas do mundo real. Os projetos t??m uma componente de trabalho obrigat??ria em equipa que pode ser concretizada de duas formas:
 a) Os alunos formam equipas com 2 a 3 elementos;
 b) Os alunos podem trabalhar em colabora????o com outros alunos de anos mais avan??ados do DECivil.', 'Ao pretender-se que o estudante analise e encontre, em ambiente de equipa, poss??veis solu????es, para um problema societal concreto, tem-se por objetivo que o fa??am aplicando solu????es de Engenharia civil e que aprofundem o seu conhecimento quanto ao ??mbito da respetiva aplica????o, em ambiente colaborativo, desenvolvendo as suas capacidades de trabalho em grupo, de pesquisa e de comunica????o.', 5, 1, 15, 48, '2021-09-01');
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid, utilizadoresid, data_alteracao) VALUES (0, 'Semestral', 'PL: 3H/semana', 'A UC Laborat??rios de Biomedicina 1 tem como objetivo geral proporcionar ao estudante uma aprendizagem de diferentes ferramentas de qu??mica e bioqu??mica fundamentais para a forma????o da Licenciatura em Ci??ncias Biom??dicas e que ser??o basilares para a realiza????o de trabalhos pr??ticos dos Laborat??rios de Biomedicina 2, 3, 4 e 5.
No final desta UC o aluno dever??:
    1. Aplicar regras de seguran??a e biosseguran??a de acordo com o trabalho laboratorial a desenvolver.
    2. Analisar um protocolo laboratorial.
    3. Interpretar e discutir os resultados laboratoriais obtidos.
    4. Preparar relat??rios das atividades laboratoriais realizadas.
    5. Realizar opera????es unit??rias da pr??tica laboratorial introdut??ria nas ??reas da Qu??mica e Bioqu??mica aplicadas ??s ci??ncias da sa??de.
    6. Aplicar metodologias de an??lise quantitativas e qualitativas de esp??cies qu??micas e biomol??culas importantes para o funcionamento do corpo humano.', 'A. Regras de seguran??a em laborat??rios de qu??mica e na manipula????o de amostras biol??gicas.
B. T??cnicas de medi????o de volumes. Prepara????o de solu????es, dilui????es e c??lculo de concentra????es.
C. Curva de titula????o de um amino??cido. Determina????o do ponto isoel??ctrico de uma prote??na.
D. An??lise e quantifica????o de a??ucares. Determina????o de glucose no sangue.
E. Extra????o e quantifica????o do conte??do proteico de amostras biol??gicas e an??lise por SDS-PAGE.
F. Velocidade de uma rea????o - cin??tica enzim??tica da amilose.
G. Separa????o da albumina e da hemoglobina por cromatografia de troca i??nica. Espectros de absor????o de oxihemoglobina e da metahemoglobina.
H. Extra????o de l??pidos de uma amostra biol??gica e an??lise por cromatografia em camada fina.
I. Extra????o, purifica????o, quantifica????o e detec????o de ??cidos nucleicos.
J. Determina????o da vitamina C em alimentos.
K. Determina????o de c??lcio e f??sforo na urina.', 'A aprendizagem desta UC baseia-se em aulas pr??ticas de laborat??rio sempre precedidas duma contextualiza????o. Pressup??e-se que os estudantes se preparem autonomamente para cada aula pr??tica de modo a saberem exatamente o que v??o fazer no laborat??rio e saibam explicar o procedimento e a teoria por detr??s deste. Ap??s a conclus??o e entrega do relat??rio o professor ter?? 1 semana para dar feedback aos estudantes e estes ter??o a oportunidade de atempadamente esclarecerem d??vidas acerca dos relat??rios realizados. No meio e no final do semestre haver?? uma aula dedicada ?? discuss??o dos trabalhos realizados.',
'McMurry, M. E. Castellion, D. S. Ballantine, Fundamentals of General, Organic, and Biological Chemistry, Pearson Prentice Hall, London, 2007.
G. Smith, Principles of General, Organic, & Biological Chemistry, McGraw-Hill, New York, 2012.
McMurry, T. Begley, The Organic Chemistry of Biological Pathways, Roberts & Company, Greenwood Village, 2005.
M. Dewick, Essentials of Organic Chemistry, John Wiley & Sons, Ltd, London, 2006.
H. Jeffery, J. Bassett, J. Mendham, R. C. Denney, VOGEL, An??lise Qu??mica Quantitativa, 5?? ed., Editora Guanabara Koogan S.A., Rio de Janeiro, 1992, cap.10.
Guia da disciplina a realizar pelos docentes.', null, 'Portugu??s', 'Existem 5 UC de Laborat??rios de Biomedicina ??? LabBM - (1 a 5, semestrais) sendo o objetivo global a aplica????o pr??tica dos conhecimentos te??ricos e o desenvolvimento de compet??ncias ao n??vel do trabalho em ambiente de laborat??rio. Esta componente de aprendizagem ?? um pilar na forma????o dos licenciados em Ci??ncias Biom??dicas. Destas 5 UC, 2 (1 e 2) s??o lecionadas no 1?? ano da licenciatura e as outras 2 (3 e 4) no 2?? ano e por fim os LabBM5 no 3?? ano, 1?? semestre.
Foram estruturados 6 objetivos de aprendizagem (OA), relacionados com os conte??dos program??ticos da seguinte forma:
OA1 - conte??dos A.
OA2 a OA6 - conte??dos B a K.
Os objetivos da UC referem-se de modo integrado aos conte??dos program??ticos propostos.', 'A avalia????o ?? cont??nua e inclui igual percentagem para cada um dos relat??rios que resultar de cada aula pr??tica (10 trabalhos pr??ticos).
O teste de avalia????o escrito (que incluir?? quest??es sobre os trabalhos 2 a 10) ter?? um peso de 50%, 40% corresponder??o ?? avalia????o dos relat??rios das atividades laboratoriais (cada relat??rio contribuir?? para 4% da classifica????o final) e os restantes 10% corresponder??o ao desempenho nas aulas pr??ticas que inclui assiduidade, pontualidade e empenho na realiza????o dos trabalhos.
A avalia????o ocorre em 3 momentos: recurso/melhoria, ??poca especial e final com estrutura semelhante ao da ??poca normal.',
'A metodologia de ensino da UC est?? adaptada ?? escolaridade (3PL).

Existir??o 10 aulas pr??ticas que incluir??o para al??m do procedimento pr??tico a sua contextualiza????o. Os estudantes ter??o acesso aos procedimentos antes da aula e assim podem preparar a aula convenientemente. No fim de cada aula os estudantes realizam um relat??rio, cujo formato ser?? previamente acordado com os professores, onde descrevem os resultados obtidos e os discutem individualmente. Prev??-se que se realizem 10 trabalhos pr??ticos e consequentemente 10 relat??rios. Todos ter??o o mesmo peso e correspondem a 80% da nota final. Na ??ltima aula ser?? realizado um teste escrito baseado nos conte??dos das aulas pr??ticas (20% da nota final).

O objetivo global da UC ?? que o estudante apreenda diferentes ferramentas de qu??mica e bioqu??mica fundamentais para as ci??ncias da sa??de. Na primeira aula ser??o apresentadas regras de seguran??a e bio-seguran??a e as regras para a realiza????o dos relat??rios e funcionamento da disciplina. Nos 10 trabalhos laboratoriais propostos os estudantes realizar??o experi??ncias que envolvam opera????es unit??rias da pr??tica laboratorial das ??reas da Qu??mica e Bioqu??mica aplicadas ??s ci??ncias da sa??de e que apliquem metodologias de an??lise quantitativas e qualitativas de esp??cies qu??micas e biomol??culas importantes para o funcionamento do corpo humano (amino??cidos, prote??nas, a????cares, vitaminas, l??pidos, minerais). Os trabalhos pr??ticos realizados e respetivos relat??rios ser??o discutidos em dois momentos do semestre.', 5, 1, 16, 49, '2021-09-01');

insert into ac(id, designacao, sigla) VALUES (0, 'Sem AC', 'SAC');

LOAD DATA LOCAL INFILE '/drs.csv'
INTO TABLE utilizadores
character set UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '/ucs.csv'
INTO TABLE uc
CHARACTER SET UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '/dpucs.csv'
INTO TABLE dpuc
CHARACTER SET UTF8
FIELDS TERMINATED BY '|'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
/*
select * from utilizadores
select * from uc
select * from dpuc*/