drop database dpuc;
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
                                  id    int NOT NULL,
                                  nome  text,
                                  sigla text,
                                  utilizadoresid int,
                                  PRIMARY KEY (id),
                                  foreign key (utilizadoresid) references utilizadores(id));

create table ac(
                   id int not null auto_increment,
                   designacao text,
                   sigla text,
                   primary key (id)
);


CREATE TABLE curso (
                       id                 int NOT NULL AUTO_INCREMENT,
                       nome               text,
                       unidade_organicaid int NOT NULL,
                       utilizadoresid int NOT NULL,
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

create table uc(
                   id int not null auto_increment,
                   codigo text,
                   designacao text,
                   sigla_ac text,
                   ects int,
                   uoid int,
                   acid int,
                   primary key (id),
                   foreign key (acid) references ac(id)
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
                      utilizadoresid                  int not null,
                      PRIMARY KEY (id),
                      foreign key (estadoid) references estado(id),
                      foreign key (periodo_letivoid) references periodo_letivo(id),
                      foreign key (UCid) references uc(id),
                      foreign key (utilizadoresid) references utilizadores(id)
);

CREATE TABLE curso_UC (
                          curso_id int NOT NULL,
                          UCid  int NOT NULL,
                          PRIMARY KEY (curso_id,
                                       UCid),
                          foreign key (curso_id) references curso(id),
                          foreign key (UCid) references uc(id));
