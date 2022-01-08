package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Produit {



    @SerializedName("id_produit")
    @Expose
    private String id_produit;

    @SerializedName("nomp")
    @Expose
    private String nomp;

    @SerializedName("description")
    @Expose
    private String description;

    @SerializedName("image")
    @Expose
    private String image;

    public String getId_produit() {
        return id_produit;
    }

    public void setId_produit(String id_produit) {
        this.id_produit = id_produit;
    }

    public String getNom() {
        return nomp;
    }

    public void setNom(String nom) {
        this.nomp = nomp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Produit{" +
                "id_produit='" + id_produit + '\'' +
                ", nom='" + nomp + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
