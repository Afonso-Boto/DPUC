create database if not exists dpuc;

use dpuc;

drop table if exists dpuc, controlo, curso, tipo_utilizador, utilizador, unidade_organica, periodo_letivo, estado;

create table unidade_organica (
    cod_int INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    sigla VARCHAR(255) NOT NULL
);

create table curso (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE,
    id_uo INT NOT NULL,
    FOREIGN KEY (id_uo) REFERENCES unidade_organica(cod_int)
);

create table tipo_utilizador (
    tipo VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE
);

CREATE TABLE utilizador (
    cod_int INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    tipo VARCHAR(50),
    id_uo INT,
    FOREIGN KEY (id_uo) REFERENCES unidade_organica(cod_int),
    FOREIGN KEY (tipo) REFERENCES tipo_utilizador(tipo)
);

create table controlo (
    utilizador int,
    criacao_edicao bit,
    designacao bit,
    sigla_ac bit,
    duracao bit,
    responsavel bit,
    carga_horaria bit,
    horas_contacto bit,
    docentes bit,
    docentes_horas bit,
    horas_trabalho bit,
    ects bit,
    objetivos bit,
    conteudos bit,
    coerencia_conteudos bit,
    metodologias bit,
    coerencia_metodologias bit,
    bibliografia bit,
    observações bit,
    id_uo bit,
    cursos bit,
    regime_faltas bit,
    linguas bit,
    modalidade bit,
    requisitos bit,
    ficheiros bit,
    data_alteracao bit,
    pagina_publica bit,
    funcionamento bit,
    aprendizagem bit,
    grau bit,
    avaliacao bit,
    periodo bit,
    estado bit
);

CREATE TABLE periodo_letivo(
    periodo VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE estado(
  codigo VARCHAR(3) PRIMARY KEY NOT NULL,
  nome VARCHAR(20) NOT NULL,
  descricao VARCHAR(255)
);

CREATE TABLE dpuc (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    criacao_edicao BIT,
    designacao TEXT(1000),
    sigla_ac VARCHAR(100),
    duracao VARCHAR(100),
    responsavel INT,
    carga_horaria VARCHAR(100),
    horas_contacto VARCHAR(100),
    docentes VARCHAR(100),
    docentes_horas VARCHAR(100),
    horas_trabalho VARCHAR(100),
    ects TEXT(1000),
    objetivos TEXT(1000),
    conteudos TEXT(1000),
    coerencia_conteudos TEXT(3000),
    metodologias TEXT(1000),
    coerencia_metodologias TEXT(3000),
    bibliografia TEXT(1000),
    observações TEXT(1000),
    id_uo INT,
    cursos VARCHAR(255),
    regime_faltas VARCHAR(100),
    linguas VARCHAR(20),
    modalidade VARCHAR(20),
    requisitos TEXT(300),
    ficheiros MEDIUMBLOB,
    data_alteracao VARCHAR(10),
    pagina_publica TEXT(500),
    funcionamento TEXT(300),
    aprendizagem TEXT(1000),
    grau VARCHAR(20),
    avaliacao VARCHAR(255),
    periodo VARCHAR(15),
    estado VARCHAR(3),
    FOREIGN KEY (id_uo) REFERENCES unidade_organica(cod_int),
    FOREIGN KEY (responsavel) REFERENCES utilizador(cod_int),
    FOREIGN KEY (periodo) REFERENCES periodo_letivo(periodo),
    FOREIGN KEY (estado) REFERENCES estado(codigo)
);

insert into unidade_organica(nome, sigla) values ('Departamento de Matemática', 'DEMAT');

select * from unidade_organica;

insert into tipo_utilizador(tipo) values ('SGA');

insert into tipo_utilizador(tipo) values ('Docente');

insert into tipo_utilizador(tipo) values ('Diretor de Curso');


insert into utilizador(nome_completo, email, pass, tipo) VALUES ('Fulano de Tal', 'fulano@email.com', 'password', 'SGA');

insert into utilizador(nome_completo, email, pass, tipo, id_uo) VALUES ('John Doe', 'johndoe@email.com', 'password', 'Diretor de Curso', 1);

insert into utilizador(nome_completo, email, pass, tipo, id_uo) VALUES ('Lorem Ipsum', 'lorempisum@email.com', 'password', 'Docente', 1);

select * from utilizador;

insert into curso(nome, id_uo) values ('Licenciatura em Matemática', 1);

select * from curso;

insert into periodo_letivo(periodo) value ('2021-2022/2');

select * from periodo_letivo;

insert into estado(codigo, nome, descricao) VALUES ('C1', 'Em criação', 'Inicialização de uma nova UC');

select * from estado;

insert into dpuc(criacao_edicao, designacao, sigla_ac, duracao, responsavel, carga_horaria, horas_contacto,
                 ects, objetivos, conteudos, id_uo, cursos, estado)
                 values (0, 'Cálculo I', 'MAT', 'Semestral', 3, '3 horas TP, 3 horas P', '6 horas por semana + 1 hora OT', '6',
                 'Não lembro das coisas de cálculo', 'Integral, etc, etc', 1, '[1, 2]', 'C1');

/*Como selecionar os dpucs por curso*/
select * from dpuc where cursos like '%1%';

insert into controlo(utilizador, designacao, sigla_ac, duracao, responsavel, carga_horaria, horas_contacto,
                     docentes, docentes_horas, horas_trabalho, ects, objetivos, conteudos, coerencia_conteudos, metodologias,
                     coerencia_metodologias, bibliografia, observações, id_uo, cursos, regime_faltas, linguas, modalidade,
                     requisitos, ficheiros, pagina_publica, funcionamento, aprendizagem, grau, avaliacao,
                     periodo, estado) VALUES (1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                                              0, 0, 0);

select * from controlo;