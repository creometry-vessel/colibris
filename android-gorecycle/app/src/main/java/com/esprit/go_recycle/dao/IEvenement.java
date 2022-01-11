package com.esprit.go_recycle.dao;


import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Participation;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface IEvenement {
    @GET("evenement/notparticipeted/{id_donneur}")
    Call<List<Evenement>> getevents(@Path("id_donneur") int id_donneur);
    @GET("evenement/myevenemnt/{id_donneur}/")
    Call<List<Evenement>> getmy(@Path("id_donneur") int id_donneur);
    @GET("evenement/myeventcreation/{id_donneur}/")
    Call<List<Evenement>> getmycreation(@Path("id_donneur") int id_donneur);
    @GET("evenement/deleteparticipation/{id_evenement}/{id_donneur}")
    Call<Evenement>  deleteev(@Path("id_evenement") int id_evenement,@Path("id_donneur")int id_donneur);

    @GET("evenement/addevent/{nom}/{lieu}/{date}")
    Call<Evenement>  addevent(@Path("nom") String nom,@Path("lieu") String lieu,@Path("date") String date );
    @GET("evenement/addcretorparticipated/{id_evenement}/{id_donneur}/{status}")
    Call<Participation>addpart(@Path("id_evenement") int id_evenement, @Path("id_donneur") int id_donneur,@Path("status") String status);

    @GET("evenement/addparticipated/{id_evenement}/{id_donneur}/{status}")
    Call<Participation>iparticipated(@Path("id_evenement") int id_evenement, @Path("id_donneur") int id_donneur,@Path("status") String status);

    @GET("evenement/getdernierid")
    Call<Evenement>  getdernier();
    @GET("evenement/unevent/{id_evenement}/")
    Call<Evenement>getunevent(@Path("id_evenement") int id_evenement);

    @GET("evenement/deleteventwithemail/{id_evenement}/")
    Call<Evenement>deleteevent(@Path("id_evenement") int id_evenement);
    @GET("evenement/updateevent/{nom}/{lieu}/{date}/{id_evenement}")
    Call<Evenement>  updateevent(@Path("nom") String nom,@Path("lieu") String lieu,@Path("date") String date,@Path("id_evenement") int id_evenement);

}
