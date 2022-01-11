package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.sql.Blob;

public class Sponsor {
    @SerializedName("id_sponsor")
    @Expose
    private int id_sponsor;
    @SerializedName("nom")
    @Expose
    private String nom;
    @SerializedName("image")
    @Expose
    private String image;
    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("num_tel")
    @Expose
    private String num_tel;


    @SerializedName("password")
    @Expose
    private String password;

    public String getNum_tel() {
        return num_tel;
    }

    public void setNum_tel(String num_tel) {
        this.num_tel = num_tel;
    }

    public int getId_sponsor() {
        return id_sponsor;
    }

    public void setId_sponsor(int id_sponsor) {
        this.id_sponsor = id_sponsor;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    @Override
    public String toString() {
        return "Sponsor{" +
                "id_sponsor=" + id_sponsor +
                ", nom='" + nom + '\'' +
                ", image='" + image + '\'' +
                ", email='" + email + '\'' +
                ", num_tel='" + num_tel + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
