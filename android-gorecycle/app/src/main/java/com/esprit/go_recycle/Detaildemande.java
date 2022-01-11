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
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.solde;

import static android.view.View.GONE;

public class Detaildemande extends AppCompatActivity {
TextView nom,num,produitnamen,qte,date,status,temps;
Button Annumler,btnchat;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detaildemande);
        nom=findViewById(R.id.nomdetail);
        num=findViewById(R.id.numdetail);
        produitnamen=findViewById(R.id.produitname);
        qte=findViewById(R.id.detailqantite);
        date=findViewById(R.id.datedonnation);
        status=findViewById(R.id.status);
        temps=findViewById(R.id.tempsattente);
        Annumler=findViewById(R.id.btnannuler);
        btnchat=findViewById(R.id.btnchat);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        SharedPreferences pref = getSharedPreferences("y",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);



        final   String  data=getIntent().getStringExtra("code");
        btnchat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(getApplicationContext(), MessageActivity.class);
                intent.putExtra("iddonneur",string);
                intent.putExtra("donnation",data);
                startActivity(intent);

            }});

        Log.v("thedonnationid","isssss"+data);
        IDonnation IUser = APIClient.getClient().create(IDonnation.class);
        IUser.getselcteddonn(Integer.parseInt(data)).enqueue(new Callback<Donnation>() {
            @Override
            public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                nom.setText(response.body().getNomprenom());
                num.setText(response.body().getNum_tel());
                produitnamen.setText(response.body().getNom());
                qte.setText(Integer.toString(response.body().getQuantite()));
                date.setText(response.body().getDate_remise());
                status.setText(response.body().getEtat());
                temps.setText(response.body().getTemps());
                int i=(response.body().getQuantite());
                if (response.body().getEtat().equals("ENATTENTE")){

                    btnchat.setVisibility(Button.INVISIBLE);
                }
            }

            @Override
            public void onFailure(Call<Donnation> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());
            }
        });


        ////Btn Annuler
        Annumler.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.suppunedonnation(Integer.parseInt(data)).enqueue(new Callback<Donnation>() {
                    @Override
                    public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                        Log.v("Supprimer", "cette donnation est supprimer");
                        Intent intent = new Intent(getApplicationContext(), Listdonnation.class);
                        startActivity(intent);
                    }

                    @Override
                    public void onFailure(Call<Donnation> call, Throwable t) {
                        Log.e("failure", t.getLocalizedMessage());
                    }
                });


                IDonnation isolde = APIClient.getClient().create(IDonnation.class);
                isolde.getscorede(Integer.parseInt(string),(Integer.parseInt(qte.getText().toString())*10)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        Toast.makeText(getApplicationContext(), "Votre score a ete decremente :" , Toast.LENGTH_LONG).show();

                        Intent intent = new Intent(getApplicationContext(), Listdonnation.class);
                        intent.putExtra("data", "");
                        startActivity(intent);
                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                    }



                });



            }
        });

    }
}