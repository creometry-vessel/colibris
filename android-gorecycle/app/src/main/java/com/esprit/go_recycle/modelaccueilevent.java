package com.esprit.go_recycle;

public class modelaccueilevent {
    String nomevenement,adressevent,creatorevent,datevent;

    public modelaccueilevent(String nomevenement, String adressevent, String creatorevent, String datevent) {
        this.nomevenement = nomevenement;
        this.adressevent = adressevent;
        this.creatorevent = creatorevent;
        this.datevent = datevent;
    }

    public String getNomevenement() {
        return nomevenement;
    }

    public void setNomevenement(String nomevenement) {
        this.nomevenement = nomevenement;
    }

    public String getAdressevent() {
        return adressevent;
    }

    public void setAdressevent(String adressevent) {
        this.adressevent = adressevent;
    }

    public String getCreatorevent() {
        return creatorevent;
    }

    public void setCreatorevent(String creatorevent) {
        this.creatorevent = creatorevent;
    }

    public String getDatevent() {
        return datevent;
    }

    public void setDatevent(String datevent) {
        this.datevent = datevent;
    }
}
