package com.esprit.go_recycle.models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Listlocation {
    @SerializedName("data")
    private List<Adresse> mData;

    public Listlocation(List<Adresse> mData) {
        this.mData = mData;
    }

    public Listlocation() {
    }

    public List<Adresse> getmData() {
        return mData;
    }

    public void setmData(List<Adresse> mData) {
        this.mData = mData;
    }
}
