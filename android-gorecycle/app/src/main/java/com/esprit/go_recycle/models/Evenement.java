package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Evenement implements Serializable {


    @SerializedName("id_evenement")
    @Expose
    private String id_evenement;

    @SerializedName("nom")
    @Expose
    private String nom;

    @SerializedName("lieu")
    @Expose
    private String lieu;

    @SerializedName("date")
    @Expose
    private String date;


    public String getId_evenement() {
        return id_evenement;
    }

    public void setId_evenement(String id_evenement) {
        this.id_evenement = id_evenement;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    @Override
    public String toString() {
        return "Evenement{" +
                "id_evenement='" + id_evenement + '\'' +
                ", nom='" + nom + '\'' +
                ", lieu='" + lieu + '\'' +
                ", date='" + date + '\'' +
                '}';
    }


}