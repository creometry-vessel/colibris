package com.esprit.go_recycle.dao;

import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donation;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Listlocation;
import com.esprit.go_recycle.models.Map;
import com.esprit.go_recycle.models.Ramasseur;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface IRamasseur {
    @GET("ramasseur/selectMapadresse/")
    Call<List<Map>> getmapcord();
    @GET("ramasseur/selectMapdonnation/{id_ramasseur}")
    Call<List<Map>> getmapdonnation(@Path("id_ramasseur") int id_ramasseur);
    @GET("ramasseur/yellowdetails/{id_ramasseur}")
    Call<List<Map>> getyellow(@Path("id_ramasseur") int id_ramasseur);
    @GET("ramasseur/selectdetails/{id_adresse}")
    Call<List<Map>> getdonnationfromadresse(@Path("id_adresse") int id_adresse);
    @GET("ramasseur/selectonedetails/{id_donneur}")
    Call<Donation> getoneselecteddonnation(@Path("id_donneur") int id_donneur);
    @GET("ramasseur/Update_donnation/{date_collecte}/{etat}/{id_ramasseur}/{id_donneur}")
    Call<Donnation>addtomycollection(@Path("date_collecte") String date_collecte,@Path("etat") String etat,@Path("id_ramasseur") int id_ramasseur,@Path("id_donneur") int id_donneur);
    @GET("ramasseur/planing/{date_collecte}/{id_ramasseur}")
    Call<List<Donation>> getdonnationcalender(@Path("date_collecte")String date_collecte,@Path("id_ramasseur") int id_ramasseur);
    @GET("ramasseur/profilramasseur/{id_ramasseur}")
    Call<Ramasseur> getramasseurprofil(@Path("id_ramasseur") int id_ramasseur);

    @GET("ramasseur/updateramaaseur/{nom}/{prenom}/{num_tel}/{id_ramasseur}")
    Call<Ramasseur> updateramaaseur(@Path("nom") String nom, @Path("prenom") String prenom, @Path("num_tel") String num_tel, @Path("id_ramasseur") int id_ramasseur) ;

    @GET("ramasseur/send/{email}")
    Call<Ramasseur> sendemail(@Path("email") String email) ;

    @GET("ramasseur/planingcolored/{id_ramasseur}")
    Call<List<Donnation>> datecollecte(@Path("id_ramasseur") String id_ramasseur);

    @GET("ramasseur/updaterampassword/{password}/{email}")
    Call<Ramasseur> resetpass(@Path("password") String password,@Path("email") String email) ;

    @GET("ramasseur/DeleteDonationRamasseur/{id_donneur}/{date_collecte}")
    Call<Donnation> delete(@Path("id_donneur") int id_donneur,@Path("date_collecte") String date_collecte) ;

}
