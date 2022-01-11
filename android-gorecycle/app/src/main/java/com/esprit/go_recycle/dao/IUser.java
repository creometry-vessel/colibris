package com.esprit.go_recycle.dao;

import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Ramasseur;
import com.esprit.go_recycle.models.Sponsor;
import com.esprit.go_recycle.models.Users;
import com.esprit.go_recycle.models.solde;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface IUser {



    @GET("/logindonneur/{email}/{password}")
    Call<Donneur>  login(@Path("email") String email, @Path("password") String password) ;
    @GET("/loginramasseur/{email}/{password}")
    Call<Ramasseur>  loginr(@Path("email") String email, @Path("password") String password) ;
    @GET("/loginsponsor/{email}/{password}")
    Call<Sponsor>  logins(@Path("email") String email, @Path("password") String password) ;
    @GET("/checkmail/{email}")
    Call<Donneur>  Checkemail(@Path("email") String email) ;
    @GET("/checktel/{num_tel}")
    Call<Donneur>  CheckTel(@Path("num_tel") String num_tel) ;
    @GET("/getdernieridadresse")
    Call<Adresse>  Getdernieradresse() ;
    @GET("/addadresse/{rue}/{region}/{ville}/{longitude}/{latitude}")
    Call<Adresse> addadresse(@Path("rue") String rue, @Path("region") String region, @Path("ville") String ville,@Path("longitude") double longitude,@Path("latitude") double latitude) ;


    @GET("/getprofil/{id_donneur}")
    Call<Donneur>  getprofil(@Path("id_donneur")  int id_donneur) ;
    @GET("/getmyadresse/{id_donneur}")
    Call<Adresse>  getmyadresse(@Path("id_donneur")  int id_donneur) ;

    @GET("/addDonneur/{nom}/{prenom}/{password}/{num_tel}/{id_adresse}/{email}")
    Call<Donneur>  addDonneur(@Path("nom") String nom, @Path("prenom") String prenom, @Path("password") String password, @Path("num_tel") String num_tel, @Path("id_adresse") int id_adresse,@Path("email") String email) ;


    @GET("/addRamasseur/{nom}/{prenom}/{password}/{num_tel}/{email}")
    Call<Ramasseur>  addRamasseur(@Path("nom") String nom, @Path("prenom") String prenom, @Path("password") String password, @Path("num_tel") String num_tel, @Path("email") String email) ;


    @GET("/adduser")
    Call<Users> add(@Query("firstName") String firstName, @Query("adress") String adress, @Query("tel") String tel, @Query("password") String password);



    @GET("/updateadresse/{rue}/{region}/{ville}/{longitude}/{latitude}/{id_adresse}")
    Call<Adresse> updateadresse(@Path("rue") String rue, @Path("region") String region, @Path("ville") String ville,@Path("longitude") double longitude,@Path("latitude") double latitude, @Path("id_adresse") int id_adresse) ;


    @GET("/updatedonneur/{nom}/{prenom}/{num_tel}/{id_donneur}")
    Call<Donneur> updateuser(@Path("nom") String nom, @Path("prenom") String prenom, @Path("num_tel") String num_tel, @Path("id_donneur") int id_donneur) ;

    @GET("/send/{email}")
    Call<Donneur> sendemail(@Path("email") String email) ;

    @GET("/updatepassword/{password}/{email}")
    Call<Donneur> resetpass(@Path("password") String password,@Path("email") String email) ;
    @GET("/transe/")
    Call<solde> trans(@Query("id_donneur") int id_donneur, @Query("nouveau_score") int nouveau_score,@Query("id_sponsor") int id_sponsor);

    @GET("evenement/listsponsor/")
    Call<List<Sponsor>> getlistsponsor();
}

