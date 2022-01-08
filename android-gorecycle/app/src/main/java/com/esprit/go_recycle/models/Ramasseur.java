package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Ramasseur {



    @SerializedName("id_ramasseur")
    @Expose
    private String id;

    @SerializedName("nomprenom")
    @Expose
    private String nom;
    @SerializedName("image")
    @Expose
    private String image;

    @SerializedName("prenom")
    @Expose
    private String prenom;

    @SerializedName("num_tel")
    @Expose
    private String num_tel;


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
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", num_tel='" + num_tel + '\'' +

                ", email='" + email + '\'' +
                ", authentification='" + authentification + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
