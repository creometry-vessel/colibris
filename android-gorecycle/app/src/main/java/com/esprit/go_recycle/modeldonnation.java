package com.esprit.go_recycle;

public class modeldonnation {
    String nom,tel,prdt,date,adresse,code,temps;

    public modeldonnation(String nom, String tel, String prdt, String date, String adresse, String code, String temps) {
        this.nom = nom;
        this.tel = tel;
        this.prdt = prdt;
        this.date = date;
        this.adresse = adresse;
        this.code = code;
        this.temps = temps;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPrdt() {
        return prdt;
    }

    public void setPrdt(String prdt) {
        this.prdt = prdt;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTemps() {
        return temps;
    }

    public void setTemps(String temps) {
        this.temps = temps;
    }
}
