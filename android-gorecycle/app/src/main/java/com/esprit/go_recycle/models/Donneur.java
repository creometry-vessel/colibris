package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Donneur {


    @SerializedName("id_donneur")
    @Expose
    private String id_donneur;

    @SerializedName("nom")
    @Expose
    private String nom;

    @SerializedName("prenom")
    @Expose
    private String prenom;

    @SerializedName("num_tel")
    @Expose
    private String num_tel;

    @SerializedName("id_adresse")
    @Expose
    private String id_adresse;

    @SerializedName("qr_code")
    @Expose
    private String qr_code;

    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("authentification")
    @Expose
    private String authentification;

    @SerializedName("password")
    @Expose
    private String password;


    public String getId() {
        return id_donneur;
    }

    public void setId(String id) {
        this.id_donneur = id_donneur;
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

    public String getId_adress() {
        return id_adresse;
    }

    public void setId_adress(String id_adress) {
        this.id_adresse = id_adress;
    }

    public String getQr_code() {
        return qr_code;
    }

    public void setQr_code(String qr_code) {
        this.qr_code = qr_code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthentification() {
        return authentification;
    }

    public void setAuthentification(String authentification) {
        this.authentification = authentification;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Donneur{" +
                "id='" + id_donneur + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", num_tel='" + num_tel + '\'' +
                ", id_adress='" + id_adresse + '\'' +
                ", qr_code='" + qr_code + '\'' +
                ", email='" + email + '\'' +
                ", authentification='" + authentification + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
