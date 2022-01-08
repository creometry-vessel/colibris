package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class solde {



    @SerializedName("id_solde")
    @Expose
    private int id_solde;

    @SerializedName("id_donneur")
    @Expose
    private int id_donneur;

    @SerializedName("id_sponsor")
    @Expose
    private int id_sponsor;

    @SerializedName("ancien_score")
    @Expose
    private int ancien_score;

    @SerializedName("nouveau_score")
    @Expose
    private int nouveau_score;
    @SerializedName("date")
    @Expose
    private String date;
    @SerializedName("nom")
    @Expose
    private String nom;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public String toString() {
        return "solde{" +
                "id_solde=" + id_solde +
                ", id_donneur=" + id_donneur +
                ", id_sponsor=" + id_sponsor +
                ", ancien_score=" + ancien_score +
                ", nouveau_score=" + nouveau_score +
                ", date=" + date +
                '}';
    }

    public int getId_solde() {
        return id_solde;
    }

    public void setId_solde(int id_solde) {
        this.id_solde = id_solde;
    }

    public int getId_donneur() {
        return id_donneur;
    }

    public void setId_donneur(int id_donneur) {
        this.id_donneur = id_donneur;
    }

    public int getId_sponsor() {
        return id_sponsor;
    }

    public void setId_sponsor(int id_sponsor) {
        this.id_sponsor = id_sponsor;
    }

    public int getAncien_score() {
        return ancien_score;
    }

    public void setAncien_score(int ancien_score) {
        this.ancien_score = ancien_score;
    }

    public int getNouveau_score() {
        return nouveau_score;
    }

    public void setNouveau_score(int nouveau_score) {
        this.nouveau_score = nouveau_score;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
