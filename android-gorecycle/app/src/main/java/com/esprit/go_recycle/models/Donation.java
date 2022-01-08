package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Donation {
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
    @SerializedName("nom")
    @Expose
    private String nom;
    @SerializedName("prenom")
    @Expose
    private String prenom;
    @SerializedName("num_tel")
    @Expose
    private String num_tel;
    @SerializedName("rue")
    @Expose
    private String rue;

    @SerializedName("ville")
    @Expose
    private String ville;
    @SerializedName("region")
    @Expose
    private String region;

    public String getRue() {
        return rue;
    }

    public void setRue(String rue) {
        this.rue = rue;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public int getId_donnation() {
        return id_donnation;
    }

    public void setId_donnation(int id_donnation) {
        this.id_donnation = id_donnation;
    }

    public int getId_produit() {
        return id_produit;
    }

    public void setId_produit(int id_produit) {
        this.id_produit = id_produit;
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

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getDate_collecte() {
        return date_collecte;
    }

    public void setDate_collecte(String date_collecte) {
        this.date_collecte = date_collecte;
    }

    public String getNomp() {
        return nomp;
    }

    public void setNomp(String nomp) {
        this.nomp = nomp;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNum_tel() {
        return num_tel;
    }

    public void setNum_tel(String num_tel) {
        this.num_tel = num_tel;
    }
}
