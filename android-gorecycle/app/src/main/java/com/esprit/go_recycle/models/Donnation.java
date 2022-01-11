package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Donnation {
    @SerializedName("id_donnation")
    @Expose
    private int id_donnation;
    @SerializedName("id_produit")
    @Expose
    private int id_produit;
    @SerializedName("id_donneur")
    @Expose
    private int id_donneur;
    @SerializedName("id_ramasseur")
    @Expose
    private int id_ramasseur;

    @SerializedName("temps")
    @Expose
    private String temps;

    @SerializedName("quantite")
    @Expose
    private int quantite;

    @SerializedName("date_remise")
    @Expose
    private String date_remise;
    @SerializedName("etat")
    @Expose
    private String etat;
    @SerializedName("date_collecte")
    @Expose
    private String date_collecte;

    @SerializedName("nomp")
    @Expose
    private String nomp;
    @SerializedName("nomprenom")
    @Expose
    private String nomprenom;
    @SerializedName("num_tel")
    @Expose
    private String num_tel;

    public String getNomprenom() {
        return nomprenom;
    }

    public void setNomprenom(String nomprenom) {
        this.nomprenom = nomprenom;
    }

    public String getNum_tel() {
        return num_tel;
    }

    public void setNum_tel(String num_tel) {
        this.num_tel = num_tel;
    }

    public String getNom() {
        return nomp;
    }

    public void setNom(String nomp) {
        this.nomp = nomp;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public int getId_produit() {
        return id_produit;
    }

    public void setId_produit(int id_produit) {
        this.id_produit = id_produit;
    }

    public int getId_donnation() {
        return id_donnation;
    }

    public void setId_donnation(int id_donnation) {
        this.id_donnation = id_donnation;
    }

    public int getId_donneur() {
        return id_donneur;
    }

    public void setId_donneur(int id_donneur) {
        this.id_donneur = id_donneur;
    }

    public int getId_ramasseur() {
        return id_ramasseur;
    }

    public void setId_ramasseur(int id_ramasseur) {
        this.id_ramasseur = id_ramasseur;
    }

    public String getTemps() {
        return temps;
    }

    public void setTemps(String temps) {
        this.temps = temps;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public String getDate_remise() {
        return date_remise;
    }

    public void setDate_remise(String date_remise) {
        this.date_remise = date_remise;
    }

    public String getDate_collecte() {
        return date_collecte;
    }

    public void setDate_collecte(String date_collecte) {
        this.date_collecte = date_collecte;
    }
}
