package com.esprit.go_recycle;

public class modeldetail {
String nomproduit,qteProduit,codedonnation,datelivre;

    public modeldetail() {
    }

    public modeldetail(String nomproduit, String qteProduit, String codedonnation, String datelivre) {
        this.nomproduit = nomproduit;
        this.qteProduit = qteProduit;
        this.codedonnation = codedonnation;
        this.datelivre = datelivre;
    }

    public String getNomproduit() {
        return nomproduit;
    }

    public void setNomproduit(String nomproduit) {
        this.nomproduit = nomproduit;
    }

    public String getQteProduit() {
        return qteProduit;
    }

    public void setQteProduit(String qteProduit) {
        this.qteProduit = qteProduit;
    }

    public String getCodedonnation() {
        return codedonnation;
    }

    public void setCodedonnation(String codedonnation) {
        this.codedonnation = codedonnation;
    }

    public String getDatelivre() {
        return datelivre;
    }

    public void setDatelivre(String datelivre) {
        this.datelivre = datelivre;
    }
}
