package com.esprit.go_recycle.classes;

import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IProduit;
import com.esprit.go_recycle.models.Evenement;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class APIClient {

    private static Retrofit retrofit = null;

    static Gson gson=new GsonBuilder()
            .setLenient()
            .create();
    public static Retrofit getClient()
    {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.1.3:3006/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        return retrofit;

    }
    public static IEvenement getEvenementService(){
        IEvenement ev = getClient().create(IEvenement.class);
        return ev;
    }
    public static IDonnation getdonnationService(){
        IDonnation dt = getClient().create(IDonnation.class);
        return dt;
    }
    public static IProduit getProduitdonnation(){
        IProduit dt = getClient().create(IProduit.class);
        return dt;
    }



}