package com.esprit.go_recycle.dao;

import com.esprit.go_recycle.models.Ramasseur;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface IImage {
    @Multipart
    @POST("/image/upload/")
    Call<ResponseBody> postImage(@Part MultipartBody.Part image, @Part("upload") RequestBody name);

    @GET("image/Updateimage/{image}/{id_ramasseur}")
    Call<Ramasseur> updateimage(@Path("image") String image, @Path("id_ramasseur") int id_ramasseur) ;
    @GET("image/selctimage/{id_ramasseur}")
    Call<Ramasseur> selctimage(@Path("id_ramasseur") int id_ramasseur) ;


}
