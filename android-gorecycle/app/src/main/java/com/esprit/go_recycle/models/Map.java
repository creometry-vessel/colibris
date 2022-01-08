package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Map {


        @SerializedName("id_adresse")
        @Expose
        private int id_adresse;
    @SerializedName("id_donneur")
    @Expose
    private int id_donneur;
        @SerializedName("rue")
        @Expose
        private String rue;
    @SerializedName("nom")
    @Expose
    private String nom;
    @SerializedName("prenom")
    @Expose
    private String prenom;
    @SerializedName("id_donnation")
    @Expose
    private String id_donnation;
    @SerializedName("nomp")
    @Expose
    private String nomp;
    @SerializedName("region")
    @Expose
    private String region;
    @SerializedName("quantite")
    @Expose
    private String quantite;

    @SerializedName("ville")
    @Expose
    private String ville;
    @SerializedName("longitude")
    @Expose
    private double longitude;
    @SerializedName("latitude")
    @Expose
    private double latitude;

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNomp() {
        return nomp;
    }

    public void setNomp(String nomp) {
        this.nomp = nomp;
    }

    public String getId_donnation() {
        return id_donnation;
    }

    public void setId_donnation(String id_donnation) {
        this.id_donnation = id_donnation;
    }

    public String getQuantite() {
        return quantite;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public int getId_donneur() {
        return id_donneur;
    }

    public void setId_donneur(int id_donneur) {
        this.id_donneur = id_donneur;
    }



    @SerializedName("data")
        private List<com.esprit.go_recycle.models.Adresse> mData;



        public List<com.esprit.go_recycle.models.Adresse> getmData() {
            return mData;
        }

        public void setmData(List<com.esprit.go_recycle.models.Adresse> mData) {
            this.mData = mData;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public int getId_adresse() {
            return id_adresse;
        }

        public void setId_adresse(int id_adresse) {
            this.id_adresse = id_adresse;
        }

        public String getRue() {
            return rue;
        }

        public void setRue(String rue) {
            this.rue = rue;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }

        public String getVille() {
            return ville;
        }

        public void setVille(String ville) {
            this.ville = ville;
        }

        @Override
        public String toString() {
            return "Adresse{" +
                    "id_adresse=" + id_adresse +
                    ", rue='" + rue + '\'' +
                    ", region='" + region + '\'' +
                    ", ville='" + ville + '\'' +
                    '}';
        }
    }


