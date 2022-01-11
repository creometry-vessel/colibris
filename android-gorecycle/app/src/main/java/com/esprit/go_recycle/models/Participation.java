package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Participation {

    @SerializedName("id_participation")
    @Expose
    private int id_participation;
    @SerializedName("id_donneur")
    @Expose
    private int id_donneur;
    @SerializedName("id_evenement")
    @Expose
    private int id_evenement;

    @SerializedName("status")
    @Expose
    private String status;

    public int getId_participation() {
        return id_participation;
    }

    public void setId_participation(int id_participation) {
        this.id_participation = id_participation;
    }

    public int getId_evenement() {
        return id_evenement;
    }

    public void setId_evenement(int id_evenement) {
        this.id_evenement = id_evenement;
    }

    public int getId_donneur() {
        return id_donneur;
    }

    public void setId_donneur(int id_donneur) {
        this.id_donneur = id_donneur;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Participation{" +
                "id_participation=" + id_participation +
                ", id_evenement=" + id_evenement +
                ", id_donneur=" + id_donneur +
                ", status='" + status + '\'' +
                '}';
    }
}
