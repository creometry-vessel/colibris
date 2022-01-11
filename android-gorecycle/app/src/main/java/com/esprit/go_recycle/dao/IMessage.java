package com.esprit.go_recycle.dao;

import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Message;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface IMessage {
    @GET("Chat/GetId/{id_donnation}")
    Call<List<Message>> getmeesage(@Path("id_donnation")int id_donnation);
    @GET("Chat/addchat/{text}/{id_sender}/{id_donnation}")
    Call<Message> addMessage(@Path("text") String text, @Path("id_sender") int id_sender,
                                 @Path("id_donnation") int id_donnation);


}
