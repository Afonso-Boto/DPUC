use dpuc;

/*select * from utilizadores;
select * from curso;
select * from curso_uc;
select * from periodo_letivo;
select * from estado;
select * from unidade_organica;
select * from utilizadores_unidade_organica;
select * from uc;
select * from dpuc;
select * from utilizadores_dpuc;

insert into utilizadores(nome, nmec, email, password, tipo_utilizadorid) values ('SGA', 1, 'sga@ua.pt', '123', 0);

delete from utilizadores_unidade_organica where 1=1;
delete from utilizadores_dpuc where 1=1;
delete from utilizadores where 1=1;
delete from unidade_organica where 1=1;
delete from uc where 1=1;
delete from dpuc where 1=1;
delete from curso_UC where 1=1;
delete from curso where 1=1;

#Insert unidades orgânicas
insert into unidade_organica (id, nome, sigla) VALUES (2, 'Departamento de Línguas e Culturas', 'DLC');
insert into unidade_organica (id, nome, sigla) VALUES (4, 'Departamento de Eletrónica, Telecomunicações e Informática', 'DETI');
insert into unidade_organica (id, nome, sigla) VALUES (7, 'Departamento de Ambiente e Ordenamento', 'DAO');
insert into unidade_organica (id, nome, sigla) VALUES (8, 'Departamento de Biologia', 'DBio');
insert into unidade_organica (id, nome, sigla) VALUES (9, 'Departamento de Engenharia de Materiais e Cerâmica', 'DEMaC');
insert into unidade_organica (id, nome, sigla) VALUES (10, 'Departamento de Economia, Gestão e Engenharia Industrial', 'DEGEIT');
insert into unidade_organica (id, nome, sigla) VALUES (11, 'Departamento de Matemática', 'DMat');
insert into unidade_organica (id, nome, sigla) VALUES (12, 'Departamento de Ciências Sociais, Políticas e do Território', 'DCSPT');
insert into unidade_organica (id, nome, sigla) VALUES (13, 'Departamento de Física', 'DFis');
insert into unidade_organica (id, nome, sigla) VALUES (15, 'Departamento de Química', 'DQ');
insert into unidade_organica (id, nome, sigla) VALUES (16, 'Departamento de Geociências', 'DGeo');
insert into unidade_organica (id, nome, sigla) VALUES (18, 'Departamento de Educação e Psicologia', 'DEP');
insert into unidade_organica (id, nome, sigla) VALUES (21, 'Departamento de Comunicação e Arte', 'DeCA');
insert into unidade_organica (id, nome, sigla) VALUES (22, 'Departamento de Engenharia Mecânica', 'DEM');
insert into unidade_organica (id, nome, sigla) VALUES (28, 'Departamento de Engenharia Civil', 'DECivil');
insert into unidade_organica (id, nome, sigla) VALUES (30, 'Departamento de Ciências Médicas', 'DCM');

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
insert into utilizadores (nome, nmec, email, password, tipo_utilizadorid) VALUES ('António Nuno Rosmaninho Rolo', 10311482, 'rosmaninho@ua.pt', '123', 2);*/
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

#Insert utilizadores unidade orgânica
/*insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (8, 2);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (9, 4);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (10, 7);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (11, 8);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (12, 9);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (13, 10);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (14, 11);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (15, 12);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (16, 13);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (17, 15);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (18, 16);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (19, 18);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (20, 21);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (21, 22);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (22, 28);
insert into utilizadores_unidade_organica (utilizadoresid, unidade_organicaid) values (23, 30);

#Insert cursos
insert into curso (id, nome, unidade_organicaid) VALUES (35, 'Licenciatura em Línguas e Estudos Editoriais', 2);
insert into curso (id, nome, unidade_organicaid) VALUES (383, 'Licenciatura em Engenharia Informática', 4);
insert into curso (id, nome, unidade_organicaid) VALUES (8318, 'Licenciatura em Engenharia do Ambiente', 7);
insert into curso (id, nome, unidade_organicaid) VALUES (15, 'Licenciatura em Biologia e Geologia', 8);
insert into curso (id, nome, unidade_organicaid) VALUES (483, 'Licenciatura em Engenharia de Materiais', 9);
insert into curso (id, nome, unidade_organicaid) VALUES (21, 'Licenciatura em Economia', 10);
insert into curso (id, nome, unidade_organicaid) VALUES (38, 'Licenciatura em Matemática', 11);
insert into curso (id, nome, unidade_organicaid) VALUES (54, 'Licenciatura em Administração Pública', 12);
insert into curso (id, nome, unidade_organicaid) VALUES (33, 'Licenciatura em Física', 13);
insert into curso (id, nome, unidade_organicaid) VALUES (43, 'Licenciatura em Química', 15);
insert into curso (id, nome, unidade_organicaid) VALUES (418, 'Licenciatura em Geologia', 16);
insert into curso (id, nome, unidade_organicaid) VALUES (42, 'Licenciatura em Psicologia', 18);
insert into curso (id, nome, unidade_organicaid) VALUES (40, 'Licenciatura em Música', 21);
insert into curso (id, nome, unidade_organicaid) VALUES (482, 'Licenciatura em Engenharia Mecânica', 22);
insert into curso (id, nome, unidade_organicaid) VALUES (491, 'Licenciatura em Engenharia Civil', 28);
insert into curso (id, nome, unidade_organicaid) VALUES (18, 'Licenciatura em Ciências Biomédicas', 30);*/

#Insert unidades curriculares
#insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (44535, 'Cultura Portugues Contemporânea', 'EC', 6, 2);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (40379, 'Fundamentos de Programação', 'I', 6, 4);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (42709, 'Álgebra Linear e Geometria Analítica', 'M', 6, 7);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (40352, 'Biologia Celular', 'BIO', 6, 8);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (40787, 'Introdução à Engenharia de Materiais', 'CEM', 6, 9);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (45702, 'Contabilidade Geral', 'C', 6, 10);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (42706, 'Análise Matemática I', 'M', 8, 11);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (45824, 'Introdução Ao Direito', 'CJ', 4, 12);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (47169, 'Mecânica Clássica', 'F', 6, 13);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (41937, 'Fundamentos de Química', 'Q', 6, 15);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (42240, 'Mineralogia', 'GEO', 6, 16);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (47141, 'Introdução à Psicologia', 'PSI', 6, 18);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (46713, 'Formação Auditiva A', 'MU', 4, 21);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (46493, 'Introdução à Engenharia Mecânica', 'EM', 6, 22);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (42038, 'Introdução à Engenharia Civil', 'EC', 2, 28);
insert into uc (codigo, designacao, sigla_ac, ects, uoid) VALUES (41569, 'Laboratórios de Biomedicina 1', 'CBM', 4, 30);

#Insert cursos_UC
#insert into curso_UC (curso_id, UCid) VALUES (35, 1);
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
/*insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES (0, 'Semestral', 'TP:3H/semana', 'I – A descoberta de Portugal na transição para o século XX

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
                  'Português', 'Nenhum', 'Nos termos do Regulamento de Estudos da Universidade de Aveiro (n.º 214 /2012), a avaliação é discreta e constituída por dois testes a realizar durante o período lectivo.', 'Os alunos devem cumprir os objectivos.', 5, 1, 1);*/
/*insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();
insert into dpuc (criacao_edicao, duracao, carga_horaria, objetivos, conteudos,
                  metodologias, bibliografia, observacoes, linguas, requisitos, funcionamento,
                  aprendizagem, estadoid, periodo_letivoid,
                  UCid) VALUES ();

#Insert utilizadores dpuc
#insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (40, 1);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (41, 2);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (42, 3);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (43, 4);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (44, 5);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (45, 6);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (46, 7);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (47, 8);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (48, 9);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (49, 10);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (50, 11);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (51, 12);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (52, 13);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (53, 14);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (54, 15);
insert into utilizadores_dpuc (utilizadoresid, dpucid) VALUES (55, 16);*/