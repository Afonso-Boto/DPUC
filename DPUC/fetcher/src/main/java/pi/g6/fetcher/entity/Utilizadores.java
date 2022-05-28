package pi.g6.fetcher.entity;


public class Utilizadores {
    private Integer id;
    private String nome;
    private int nmec;
    private String email;
    private String password;
    private int tipo_utilizadorid;

    public Utilizadores() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getNmec() {
        return nmec;
    }

    public void setNmec(int nmec) {
        this.nmec = nmec;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTipo_utilizadorid() {
        return tipo_utilizadorid;
    }

    public void setTipo_utilizadorid(int tipo_utilizadorid) {
        this.tipo_utilizadorid = tipo_utilizadorid;
    }
}
