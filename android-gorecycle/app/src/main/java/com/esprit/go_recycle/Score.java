package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.solde;

public class Score extends AppCompatActivity {
TextView ancien ,nouveau,date,sponsor;
Button Btnok;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_score);
        ancien=findViewById(R.id.AncienScore);
        nouveau=findViewById(R.id.nouveauScore);
        date=findViewById(R.id.Datemaj);
        sponsor=findViewById(R.id.sponsor);
        Btnok=findViewById(R.id.btnok);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        IDonnation IUser = APIClient.getClient().create(IDonnation.class);
        IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
            @Override
            public void onResponse(Call<solde> call, Response<solde> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                ancien.setText(Integer.toString(response.body().getAncien_score()));
                nouveau.setText(Integer.toString(response.body().getNouveau_score()));
                date.setText(response.body().getDate());
                sponsor.setText(response.body().getNom());

            }

            @Override
            public void onFailure(Call<solde> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());
            }
        });


        ////Btn Annuler
        Btnok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);
                startActivity(intent);

            }
        });




    }
}