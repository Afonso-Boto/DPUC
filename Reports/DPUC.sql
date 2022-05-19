drop database dpuc;
create database dpuc;
use dpuc;

CREATE TABLE unidade_organica (
  id    int NOT NULL,
  nome  text, 
  sigla text, 
  PRIMARY KEY (id));

CREATE TABLE tipo_utilizador (
  id     int NOT NULL,
  codigo text,
  PRIMARY KEY (id));

CREATE TABLE utilizadores (
  id                int NOT NULL AUTO_INCREMENT, 
  nome              text,
  email             text, 
  password          text, 
  tipo_utilizadorid int NOT NULL, 
  PRIMARY KEY (id),
  foreign key (tipo_utilizadorid) references tipo_utilizador(id));


CREATE TABLE curso (
  id                 int NOT NULL AUTO_INCREMENT,
  nome               text, 
  unidade_organicaid int NOT NULL, 
  PRIMARY KEY (id),
  foreign key (unidade_organicaid) references unidade_organica(id));

CREATE TABLE estado (
  id        int NOT NULL,
  nome      text, 
  descricao text, 
  PRIMARY KEY (id));

CREATE TABLE periodo_letivo (
  id      int NOT NULL AUTO_INCREMENT,
  periodo text, 
  PRIMARY KEY (id));

CREATE TABLE dpuc (
  id                    int NOT NULL AUTO_INCREMENT,
  criacao_edicao        tinyint(1), 
  codigo                text,
  designacao            text, 
  sigla_ac              text, 
  duracao               text, 
  carga_horaria         text, 
  horas_contacto        int,
  horas_trabalho        int, 
  ects                  int,
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
  requisitos            int, 
  ficheiros             longblob, 
  data_alteracao        datetime NULL, 
  pagina_publica        text, 
  funcionamento         text, 
  aprendizagem          text, 
  estadoid              int NOT NULL, 
  periodo_letivoid      int NOT NULL, 
  PRIMARY KEY (id),
  foreign key (estadoid) references estado(id),
  foreign key (periodo_letivoid) references periodo_letivo(id));

CREATE TABLE curso_dpuc (
  curso_id int NOT NULL,
  dpuc_id  int(20) NOT NULL,
  PRIMARY KEY (curso_id,
  dpuc_id),
  foreign key (curso_id) references curso(id),
  foreign key (dpuc_id) references dpuc(id));

CREATE TABLE controlo (
  id                    int AUTO_INCREMENT,
  codigo                tinyint(1), 
  designacao            tinyint(1), 
  sigla_ac              tinyint(1), 
  duracao               tinyint(1), 
  carga_horaria         tinyint(1), 
  horas_contacto        tinyint(1), 
  horas_trabalho        tinyint(1), 
  ects                  tinyint(1), 
  objetivos             tinyint(1), 
  conteudos             tinyint(1), 
  coerencia_conteudos   tinyint(1), 
  metodologias          tinyint(1), 
  coerencia_metodologia tinyint(1), 
  bibliografia          tinyint(1), 
  observacoes           tinyint(1), 
  regime_faltas         tinyint(1), 
  linguas               tinyint(1), 
  modalidade            tinyint(1), 
  requisitos            tinyint(1), 
  ficheiros             tinyint(1), 
  pagina_publica        tinyint(1),
  funcionamento         tinyint(1), 
  aprendizagem          tinyint(1), 
  tipo_utilizadorid     int NOT NULL,
  PRIMARY KEY (id),
  foreign key (tipo_utilizadorid) references tipo_utilizador(id)
);


insert into unidade_organica(id, nome, sigla) values(1, 'Unidade Organica 1', 'UO1');

insert into curso(nome, unidade_organicaid) values('Engenharia Informatica', 1);

insert into estado(id, nome, descricao) values (1, 'C1', 'Em criacão');
insert into estado(id, nome, descricao) values (2, 'C2', 'Em edicao');
insert into estado(id, nome, descricao) values (3, 'C3', 'Fechado');
insert into estado(id, nome, descricao) values (4, 'C4', 'Em aprovacao');
insert into estado(id, nome, descricao) values (5, 'C5', 'Aprovado');
insert into estado(id, nome, descricao) values (6, 'C6', 'Desativado');

insert into periodo_letivo(periodo) values ('1º Semestre');
insert into periodo_letivo(periodo) values ('2º Semestre');

insert into tipo_utilizador(id, codigo) values (0, 'SGA');
insert into tipo_utilizador(id, codigo) values (1, 'DUO');
insert into tipo_utilizador(id, codigo) values (2, 'DR');
insert into tipo_utilizador(id, codigo) values (3, 'DC');
insert into tipo_utilizador(id, codigo) values (4, 'D');

insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (1, 'SGA', 'sga@ua.pt', '123', 0);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (2, 'DUO','duo@ua.pt', '123', 1);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (3, 'DR', 'dr@ua.pt', '123', 2);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (4, 'DC', 'dc@ua.pt', '123', 3);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (5, 'D', 'd@ua.pt', '123', 4);

insert into controlo(codigo, designacao, sigla_ac, duracao, carga_horaria, horas_contacto, horas_trabalho, ects, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, pagina_publica, funcionamento, aprendizagem, tipo_utilizadorid)
values (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0);