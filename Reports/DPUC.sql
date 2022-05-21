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
  nmec              int,
  email             text, 
  password          text,
  tipo_utilizadorid int NOT NULL, 
  PRIMARY KEY (id),
  foreign key (tipo_utilizadorid) references tipo_utilizador(id));

create table utilizadores_unidade_organica(
    utilizadoresid int NOT NULL,
  unidade_organicaid  int NOT NULL,
  PRIMARY KEY (utilizadoresid,
  unidade_organicaid),
  foreign key (utilizadoresid) references utilizadores(id),
  foreign key (unidade_organicaid) references unidade_organica(id)
);


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

create table uc(
    id int not null auto_increment,
    codigo text,
    designacao text,
    sigla_ac text,
    ects int,
    uoid int,
    primary key (id)
);

CREATE TABLE dpuc (
  id                    int NOT NULL AUTO_INCREMENT,
  criacao_edicao        tinyint(1), 
  duracao               text,
  carga_horaria         text, 
  horas_contacto        int,
  horas_trabalho        int, 
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
  data_alteracao        datetime NULL, 
  pagina_publica        text, 
  funcionamento         text, 
  aprendizagem          text, 
  estadoid              int NOT NULL, 
  periodo_letivoid      int NOT NULL,
  UCid                  int not null,
  PRIMARY KEY (id),
  foreign key (estadoid) references estado(id),
  foreign key (periodo_letivoid) references periodo_letivo(id),
  foreign key (UCid) references uc(id));

CREATE TABLE curso_UC (
  curso_id int NOT NULL,
  UCid  int NOT NULL,
  PRIMARY KEY (curso_id,
  UCid),
  foreign key (curso_id) references curso(id),
  foreign key (UCid) references uc(id));

create table utilizadores_dpuc(
    utilizadoresid int NOT NULL,
    dpucid  int NOT NULL,
    PRIMARY KEY (utilizadoresid,
        dpucid),
    foreign key (utilizadoresid) references utilizadores(id),
    foreign key (dpucid) references dpuc(id));


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
insert into utilizadores_unidade_organica(utilizadoresid, unidade_organicaid) values (2, 1);

insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (3, 'DR', 'dr@ua.pt', '123', 2);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (4, 'DC', 'dc@ua.pt', '123', 3);
insert into utilizadores(id, nome, email, password, tipo_utilizadorid) values (5, 'D', 'd@ua.pt', '123', 4);
