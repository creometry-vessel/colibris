package com.esprit.go_recycle.dao;

import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.solde;

import java.util.Date;
import java.util.List;

import androidx.annotation.NonNull;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface IDonnation {
    @GET("donnation/")
    Call<List<Evenement>> getdonnations();
    @GET("donation/ajoutDonation/{id_produit}/{id_donneur}/{quantite}")
    Call<Donnation> adddonnation(@Path("id_produit") int id_produit, @Path("id_donneur") int id_donneur,
                                 @Path("quantite") int quantite);
    @GET("donation/mydonation/{id_donneur}/")
    Call<List<Donnation>> getmydonnation(@Path("id_donneur") int id_donneur);
   @GET("donation/updatescore/{nouveau_score}/{ancien_score}/{id_donneur}")
   Call<solde> updatescore(@Path("nouveau_score") int nouveau_score,
                        @Path("ancien_score") int ancien_score,@Path("id_donneur") int id_donneur);

    @GET("donation/getscore/{id_donneur}/")
    Call<solde> getscore(@Path("id_donneur") int id_donneur);
    @GET("donation/Updqte/")
    Call<solde> getscorede(@Query("id_donneur") int id_donneur,@Query("nouveau_score") int nouveau_score);
    @GET("donation/unedonation/{id_donnation}/")
    Call<Donnation> getselcteddonn(@Path("id_donnation") int id_donnation);

    @GET("donation/deletedonnation/{id_donnation}/")
    Call<Donnation> suppunedonnation(@Path("id_donnation") int id_donnation);

    void onSuccess(@NonNull String value);

    void onError(@NonNull Throwable throwable);
}
