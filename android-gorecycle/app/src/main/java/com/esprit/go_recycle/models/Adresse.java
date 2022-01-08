package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Adresse {

    @SerializedName("id_adresse")
    @Expose
    private int id_adresse;
    @SerializedName("rue")
    @Expose
    private String rue;

    @SerializedName("region")
    @Expose
    private String region;
    @SerializedName("ville")
    @Expose
    private String ville;
    @SerializedName("longitude")
    @Expose
    private double longitude;
    @SerializedName("latitude")
    @Expose
    private double latitude;
    @SerializedName("data")
    private List<Adresse> mData;



    public List<Adresse> getmData() {
        return mData;
    }

    public void setmData(List<Adresse> mData) {
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
