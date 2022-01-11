package com.esprit.go_recycle.dao;


import com.esprit.go_recycle.models.Produit;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface IProduit {
    @GET("addproduit/{nom}/{description}")
    Call<List<Produit>> addproduit(@Path("nom") String nom, @Path("description") String description);
    @GET("donation/getproduit/{nom}")
    Call<Produit> getproduitid(@Path("nom") String nom);

}
