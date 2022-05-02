CREATE TABLE unidade_organica (
  id    int(10) NOT NULL,
  nome  text, 
  sigla text, 
  PRIMARY KEY (id));
CREATE TABLE utilizadores (
  id                int(10) NOT NULL, 
  nome              int(10), 
  email             text, 
  password          text, 
  tipo_utilizadorid int(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE curso (
  id                 int(10) NOT NULL,
  nome               text, 
  unidade_organicaid int(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE estado (
  id        int(10) NOT NULL,
  nome      text, 
  descricao text, 
  PRIMARY KEY (id));
CREATE TABLE periodo_letivo (
  id      int(10) NOT NULL,
  periodo text, 
  PRIMARY KEY (id));
CREATE TABLE dpuc (
  id                    int(20) NOT NULL,
  criacao_edicao        tinyint(1), 
  codigo                varchar(20), 
  designacao            text, 
  sigla_ac              text, 
  duracao               text, 
  carga_horaria         text, 
  horas_contacto        text, 
  horas_trabalho        int(10), 
  ects                  int(2), 
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
  requisitos            int(10), 
  ficheiros             longblob, 
  data_alteracao        datetime NULL, 
  pagina_publica        text, 
  funcionamento         text, 
  aprendizagem          text, 
  estadoid              int(10) NOT NULL, 
  periodo_letivoid      int(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE curso_dpuc (
  cursoid int(10) NOT NULL, 
  dpucid  int(20) NOT NULL, 
  PRIMARY KEY (cursoid, 
  dpucid));
CREATE TABLE controlo (
  id                    int(10),
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
  tipo_utilizadorid     int(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tipo_utilizador (
  id     int(10) NOT NULL,
  codigo text, 
  PRIMARY KEY (id));

ALTER TABLE curso ADD CONSTRAINT FKcurso389482 FOREIGN KEY (unidade_organicaid) REFERENCES unidade_organica (id);
ALTER TABLE curso_dpuc ADD CONSTRAINT FKcurso_dpuc520279 FOREIGN KEY (cursoid) REFERENCES curso (id);
ALTER TABLE curso_dpuc ADD CONSTRAINT FKcurso_dpuc432220 FOREIGN KEY (dpucid) REFERENCES dpuc (id);
ALTER TABLE dpuc ADD CONSTRAINT FKdpuc973992 FOREIGN KEY (estadoid) REFERENCES estado (id);
ALTER TABLE dpuc ADD CONSTRAINT FKdpuc311657 FOREIGN KEY (periodo_letivoid) REFERENCES periodo_letivo (id);
ALTER TABLE utilizadores ADD CONSTRAINT FKutilizador624564 FOREIGN KEY (tipo_utilizadorid) REFERENCES tipo_utilizador (id);
ALTER TABLE controlo ADD CONSTRAINT FKcontrolo81812 FOREIGN KEY (tipo_utilizadorid) REFERENCES tipo_utilizador (id);


insert into unidade_organica(id, nome, sigla) values(1, 'Unidade Organica 1', 'UO1');

insert into curso(id, nome, unidade_organicaid) values(1, 'Engenharia Informatica', 1);

insert into estado(id, nome, descricao) values (1, 'C1', 'Em criacão');
insert into estado(id, nome, descricao) values (2, 'C2', 'Em edicao');
insert into estado(id, nome, descricao) values (3, 'C3', 'Fechado');
insert into estado(id, nome, descricao) values (4, 'C4', 'Em aprovacao');
insert into estado(id, nome, descricao) values (5, 'C5', 'Aprovado');
insert into estado(id, nome, descricao) values (6, 'C6', 'Desativado');

insert into periodo_letivo(id, periodo) values (1, '1º Semestre');
insert into periodo_letivo(id, periodo) values (2, '2º Semestre');

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

insert into controlo(id, codigo, designacao, sigla_ac, duracao, carga_horaria, horas_contacto, horas_trabalho, ects, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, pagina_publica, funcionamento, aprendizagem, tipo_utilizadorid)
values (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0);